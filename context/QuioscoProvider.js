import { useState, useEffect, createContext } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const QuioscoContext = createContext();
const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [ordenes, setOrdenes] = useState([]);

  const router = useRouter();

  // useEffects
  useEffect(() => {
    obtenerCategorias();
    setCategoriaActual(categorias[0]);
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);
  // Funciones
  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };
  const handleSetCategoria = (categoria) => {
    setCategoriaActual(categoria)
    router.push("/");
  }
  const handleSetProducto = prod => {
    setProducto(prod);
  }
  const handleSetModal = () => {
    setModal(!modal);
  }
  const handleSetPedido = ({categoriaId, ...prod}) => {
    if(pedido.some(productoState => productoState.id === prod.id)) {
      const pedidoActualizado = pedido.map(productoState => productoState.id == prod.id ? prod : productoState)
      setPedido(pedidoActualizado);
      toast.info("Modificado correctamente");
    }else {
      setPedido([...pedido, prod])
      toast.success("Agregado correctamente");
    }
  }

  const handleEditarProducto = (producto) => {
    setProducto(producto);
    setModal(!modal);
  }

  const handleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter(pedidoState => pedidoState.id !== id);
    setPedido(pedidoActualizado);
  }

  const resetearApp = () => {
    setCategoriaActual(categorias[0]);
    setProducto({});
    setPedido([]);
    setNombre("");

    setTimeout(() => {
      router.push("/");
    }, 1000);
  }

  


  
  return (
    <QuioscoContext.Provider value={{
      categorias,
      handleSetCategoria,
      categoriaActual,
      handleSetProducto,
      handleSetModal,
      modal,
      producto,
      handleSetPedido,
      pedido,
      handleEditarProducto,
      handleEliminarProducto,
      setNombre,
      nombre,
      resetearApp
      
    }}>{children}</QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
