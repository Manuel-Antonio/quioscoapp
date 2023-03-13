import { formatearDinero} from "@/helpers";
import Platillo from "./Platillo";
import axios from "axios";
import {toast} from "react-toastify";

const Orden = ({ orden }) => {
  const { id, nombre, total, pedido } = orden;

  const completarPedido = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/ordenes/${id}`);
      toast.success("Pedido Completado (๑•̀ㅂ•́)و✧ ");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className=" mt-10 border-b last-of-type:border-0">
      <h2 className="text-3xl font-bold">Orden: {id}</h2>
      <h3 className="text-2xl ">Cliente: {nombre}</h3>
      <div className="p-5 pb-10">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center">
          {pedido.map((platillo) => (
            <Platillo key={platillo.id} platillo={platillo} />
          ))}
        </div>
        <div className="mt-10 p-5 border rounded-md shadow-md md:flex justify-between">
          <p className="text-3xl font-bold">
            Total de Pedido: {""}
            <span className="text-amber-500 font-black">
              {formatearDinero(total)}
            </span>
          </p>
          <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-700 transition-all py-3 px-5 uppercase font-bold text-white mt-5 md:mt-0"
            onClick={completarPedido}
          >
            Completar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orden;
