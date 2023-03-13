import Layout from "@/layout/Layout";
import useQuiosco from "@/hooks/useQuiosco";
import ResumenProducto from "@/components/ResumenProducto";
export default function Resumen() {
  const { pedido } = useQuiosco();
  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-xl mt-5">Administra productos de tu pedido</p>
      <div className="grid gap-3 mt-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {pedido.length === 0 ? <p className="text-xl mt-5">No tienes productos para administrar</p> :
        pedido.map((producto) => (
          <ResumenProducto key={producto.id} producto={producto} />
        ))
        }
      </div>
    </Layout>
  );
}
