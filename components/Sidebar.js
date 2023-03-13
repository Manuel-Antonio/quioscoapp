import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import {useRouter} from "next/router";
import Categoria from "./Categoria";

const Sidebar = () => {
  const {categorias} = useQuiosco();
const router = useRouter();

  return (
    <>
        <Image
        width={200}
        height={200}
        src={`/assets/img/logo.svg`}
        alt="logotipo de Cafe"
        className="mt-10"
        />
        <nav className="mt-14">
          {categorias?.map(categoria => <Categoria key={categoria.id} categoria={categoria}/>)}
        </nav>
        <button 
        type="button"
        className="text-white uppercase font-bold bg-zinc-800 py-3  w-1/2 mt-5 shadow-md rounded-md"
        onClick={() => {
          router.push("/admin")
        }}
        >
          Administrador
        </button>
    </>
  )
}

export default Sidebar