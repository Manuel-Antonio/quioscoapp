import Layout from "@/layout/Layout";
import useQuiosco from "@/hooks/useQuiosco";
import {formatearDinero} from "@/helpers";
import axios from "axios";
import {toast} from "react-toastify"
export default function Total() {
  const {pedido, setNombre, nombre, resetearApp} = useQuiosco();

  const calcularTotal = () => {
    return pedido.reduce((total, pedidoState) => total + (pedidoState.cantidad * pedidoState.precio), 0)
  }

  const habilitarBtn = () => {
    return pedido?.length === 0 || nombre == "" || nombre.length < 3 ;
  }

  const handlerSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post("/api/ordenes", {
        pedido, 
        nombre, 
        total: calcularTotal(),
        fecha: Date.now().toString()}); 

        toast.success("✨ Pedido enviado correctamente. 🍔");
        resetearApp();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout pagina="Datos y Total">
      <h1 className="text-4xl font-black">Datos y Total</h1>
      <p className="text-xl mt-5">Confirma tu pedido y rellena el campo</p>
      <form 
      className="mt-10"
      onSubmit = {handlerSubmit}
      >
        <div>
          <label 
          htmlFor="nombre"
          className="uppercase text-xl font-black"
          >
            Nombre
          </label>
          <input
          id="nombre"
          type="text"
          value={nombre}
          className="bg-gray-200 block mt-2 p-3 w-full  lg:w-1/2 xl:w-1/3 rounded-md"
          onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <p className="mt-10 text-2xl font-bold">
          Total a pagar: <span className="text-4xl text-amber-500 font-black">{formatearDinero(calcularTotal())}</span>
        </p>
        <input
        type="submit"
        value="Confirmar pedido"
        className={`${habilitarBtn() ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-700 transition cursor-pointer" }   py-3 px-4 text-lg uppercase font-bold mt-5 rounded-md  text-white`}
        disabled={habilitarBtn()}
        />

      </form>
    </Layout>
  );
}
