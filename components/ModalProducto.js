import { useState, useEffect } from "react";
import Image from "next/image";

import useQuiosco from "@/hooks/useQuiosco";

import { formatearDinero } from "@/helpers";

const ModalProducto = () => {
  const { producto, handleSetModal, handleSetPedido, pedido} = useQuiosco();
  const { id, nombre, precio, imagen } = producto;
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  useEffect(() => {
    if (pedido.some((pedidoState) => pedidoState.id === id)) {
      const productoPedido = pedido.find(
        (pedidoState) => pedidoState.id === id
      );
      setCantidad(productoPedido.cantidad);
      setEdicion(true)
    }
  }, [pedido]);

  return (
    <div className="md:flex md:gap-10">
      <div className="md:w-1/4">
        <Image
          width={400}
          height={500}
          src={`/assets/img/${imagen}.jpg`}
          alt={`Imagen producto ${nombre}`}
          className="w-full"
        />
      </div>
      <div className="md:w-3/4 mt-10 md:mt-0">
        <div className="flex justify-end">
          <button onClick={handleSetModal}>
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h2 className="text-4xl font-bold mt-5">{nombre}</h2>
        <p className="text-5xl text-amber-500 font-black mt-5">
          {formatearDinero(precio)}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={() => {
              if (cantidad <= 1) return;
              setCantidad(cantidad - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <span className="text-4xl">{cantidad}</span>
          <button
            onClick={() => {
              if (cantidad >= 5) return;
              setCantidad(cantidad + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <button
          className={`${edicion ? "bg-amber-500 hover:bg-amber-700" : "bg-indigo-600 hover:bg-indigo-800"} transition-all py-3 px-5 mt-5 text-white uppercase font-bold`}
          onClick={() => {
            handleSetPedido({ ...producto, cantidad })
            handleSetModal();
        }}
        >
          {edicion ? "Guardar cambios" : "Añadir al Pedido"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
