import useSWR from "swr";
import axios from "axios";
import AdminLayout from "@/layout/AdminLayout";
import Orden from "@/components/Orden";

export default function Admin() {
  const fetcher = () => axios("/api/ordenes").then((datos) => datos.data);
  const { data } = useSWR("/api/ordenes", fetcher, {refreshInterval: 100});

  return (
    <AdminLayout pagina="Administracion">
      <h1 className="text-4xl font-black">Administración de Ordenes</h1>
      <p className="text-xl mt-5">Administrar Ordenes Pendientes</p>
      {data && data.length === 0  ? (
        <p className="mt-10">No hay ordenes pendientes</p>
      ) : (
        <div className="mt-10">
            {data?.map((orden) => <Orden key={orden.id} orden={orden} />)}
        </div>
      )
        
      }
    </AdminLayout>
  );
}
