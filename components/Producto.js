import {useState, useEffect} from "react";
import Image from "next/image";


import {formatearDinero} from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";

const Producto = ({producto}) => {
    const {handleSetProducto, handleSetModal, pedido} = useQuiosco();
    const {imagen, nombre, precio, id} = producto;
    const [edicion, setEdicion] = useState(false);

    useEffect(() => {
        if (pedido.some((pedidoState) => pedidoState.id === id)) {
          setEdicion(true)
        }
      }, [pedido]);

  return (
    <div className="border ">
        <Image
        width={400}
        height={400} 
        src={`/assets/img/${imagen}.jpg`} 
        alt={`Imagen de producto ${nombre}`}
        className="w-full"
        />
        <div className="p-5">
            <h3 className="text-3xl font-bold">{nombre}</h3>
            <p className="text-amber-500 font-black text-4xl mt-5">
                {formatearDinero(precio)}
            </p>
            <button 
            type="button"
            className={`${edicion ? "bg-amber-500 hover:bg-amber-700" : "bg-indigo-600 hover:bg-indigo-800"} p-3 font-bold transition-all text-white uppercase w-full mt-5`}
            onClick={() => {
                handleSetProducto(producto)
                handleSetModal();
            }}
            >
                {edicion ? "Modificar" : "Agregar"}
            </button>
        </div>
    </div>
  )
}

export default Producto