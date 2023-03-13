import Image from "next/image";
import { formatearFecha, formatearDinero } from "@/helpers";
import {toast} from "react-toastify";
import axios from "axios";

const OrdenAprobada = ({ orden }) => {
  const { id, nombre, total, pedido, fecha } = orden;

  const handleEliminarOrden = async () => {
    console.log("Eliminando ID: ", id)
    try {
        await axios.post(`/api/aprobados/${id}`);
        toast.success("Pedido Eliminado correctamente (๑•̀ㅂ•́)و✧ ");
      } catch (error) {
        toast.error("Hubo un error al eliminar");
      }
  }
  return (
    <div className="bg-gray-100 p-5 rounded-md shadow-md">
      <h2 className="text-3xl font-black md:text-2xl">Cliente: {nombre}</h2>
      <p>{formatearFecha(fecha)}</p>
      <p className="font-bold">
        Pago total:{" "}
        <span className="text-amber-500 text-xl font-black">
          {formatearDinero(total)}
        </span>
      </p>
      <div className="mt-10">
        <div className="flex flex-col gap-3">
          {pedido.map((pedidoState) => (
            <div
              key={pedidoState.id}
              className="border-b last-of-type:border-0 border-gray-300 pb-3 flex items-center gap-3"
            >
              <Image
                width={50}
                height={50}
                src={`/assets/img/${pedidoState.imagen}.jpg`}
                alt={`Imagen platillo ${pedidoState.nombre}`}
              />
              <div>
                <h3 className="font-bold text-lg">{pedidoState.nombre}</h3>
                <p className="text-md">Cantidad: {pedidoState.cantidad}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="flex gap-2 bg-red-600 hover:bg-red-800 transition-all rounded-md text-white py-3 px-4 text-lg font-bold items-center w-full justify-center mt-5"
          onClick={handleEliminarOrden}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default OrdenAprobada;
