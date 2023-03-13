import { useRouter } from "next/router";

const pasos = [
  { id: 1, nombre: "Menú", url: "/" },
  { id: 2, nombre: "Resumen", url: "/resumen" },
  { id: 3, nombre: "Datos y Total", url: "/total" },
];
const Progreso = () => {
  const router = useRouter();

  const calcularProgreso = () =>{
    if(router.pathname === "/") {
        return 5;
    }else if (router.pathname === "/resumen"){
        return 50;

    }else if (router.pathname === "/total"){
        return 100;
    }else {
        return 0;
    }
  }
  return (
    <div className="mb-5">
      <div className="flex justify-between">
        {pasos.map((paso) => (
          <button
            type="button"
            key={paso.id}
            className="text-2xl font-bold"
            onClick={() => {
              router.push(paso.url);
            }}
          >
            {paso.nombre}
          </button>
        ))}
      </div>
      <div className="bg-gray-300 h-2 mt-3 rounded-md">
        <div 
        className="bg-amber-500 h-2 rounded-md w-1/12"
        style={{width: `${calcularProgreso()}%`}}
        >
        </div>
      </div>
    </div>
  );
};

export default Progreso;
