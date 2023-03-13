import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AdminLayout = ({ children, pagina }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>QuioscoApp - {pagina}</title>
      </Head>
      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 flex flex-col items-center justify-center">
          <Image
            width={300}
            height={300}
            src={`/assets/img/logo.svg`}
            alt="Logotipo Quiosco"
          />
          <div className="flex flex-col w-full items-center mt-10">
            <button
              type="button"
              className="text-white font-bold uppercase transition-all hover:bg-indigo-800 bg-indigo-600 py-3 w-1/2 mt-5 shadow-md rounded-md"
              onClick={() => {
                router.push("/");
              }}
            >
              Principal
            </button>
            <button
              type="button"
              className={`${router.pathname == "/admin" ?"bg-amber-500 hover:bg-amber-700" : "bg-sky-500 hover:bg-sky-700" } text-white font-bold uppercase transition-all   py-3 px-6 mt-5 shadow-md rounded-md`}
              onClick={() => {
                router.push(`${router.pathname === "/admin" ?  "/admin/ordenes": "/admin"}`);
              }}
            >
              {router.pathname == "/admin" ? "Ordenes Aprobadas" : "Ordenes pendientes"}
            </button>
          </div>
        </aside>
        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10">{children}</div>
        </main>
      </div>
      <ToastContainer style={customStyles} />
    </>
  );
};

export default AdminLayout;
