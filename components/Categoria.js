import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";

const Categoria = ({categoria}) => {
  const {handleSetCategoria, categoriaActual} = useQuiosco();
    const {id, nombre, icono} = categoria;
  return (
    <div className={`${categoriaActual?.id == id ? "bg-amber-500" : ""} 
     flex gap-4 items-center border p-3 hover:bg-amber-500 w-full`}>
        <Image
        width={70}
        height={70} 
        src={`/assets/img/icono_${icono}.svg`}
        alt={` Imagen icono ${nombre}`}
        />
        <button 
        type="button" 
        className="text-2xl font-bold"
        onClick={() => handleSetCategoria(categoria)}
        >
            {nombre}
        </button>
    </div>
  )
}

export default Categoria