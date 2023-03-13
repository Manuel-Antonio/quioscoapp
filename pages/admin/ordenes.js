import AdminLayout from "@/layout/AdminLayout";
import axios from "axios";
import useSWR from "swr";
import OrdenAprobada from "@/components/OrdenAprobada";
import {toast} from "react-toastify"
export default function Ordenes() {
  const fetcher = () => axios("/api/aprobados").then((datos) => datos.data);
  const { data } = useSWR("/api/aprobados", fetcher, { refreshInterval: 100 });

  const handleEliminarTodo = async () => {
    try {
      await axios("/api/aprobados/0");
      toast.success("Ordenes eliminadas correctamente");
    } catch (error) {
      toast.error("Hubo un error al eliminar todas las ordenes");

    }
  }
  return (
    <AdminLayout pagina="Ordenes aprobadas">
      <h1 className="text-4xl font-black">Panel de Clientes</h1>
      <p className="text-xl mt-5">Ordenes Aprobadas</p>
      <button
        className="flex gap-2 bg-red-800 hover:bg-red-900 transition-all rounded-md text-white py-3 px-4 text-lg font-bold items-center w-full justify-center mt-5"
        onClick={handleEliminarTodo}
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
        Eliminar Todo
      </button>
      {data && data.length === 0 ? (
        <p className="mt-10">No hay ordenes aprobadas</p>
      ) : (
        <div className="mt-10 grid lg:grid-cols-2 xl:grid-cols-3 content-start 2xl:grid-cols-4 gap-5">
          {data?.map((orden) => (
            <OrdenAprobada key={orden.id} orden={orden} />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
