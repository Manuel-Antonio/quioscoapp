import Image from "next/image";

const Platillo = ({ platillo }) => {
  const { cantidad, imagen, nombre, precio } = platillo;

  return (
    <div className="border">
      <Image
        width={400}
        height={400}
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen producto ${nombre}`}
        className="w-full"
      />
      <div className="p-5">
        <h2 className="text-2xl font-black">{nombre}</h2>
        <p className="text-xl mt-2 text-indigo-500 font-black">
          <span className="font-bold">Cantidad: </span> {cantidad}
        </p>
      </div>
    </div>
  );
};

export default Platillo;
