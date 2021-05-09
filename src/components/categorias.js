import CategoriaCard from "./categoriaCard";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ModalAltaCategoria from "./modalesAuxiliares/modalAltaCategoria";

export default function Categorias() {
  let categorias = [];
  const [listaCategorias, setlistaCategorias] = React.useState([{ nombre: "categoria1" }, { nombre: "categoria2" }]);
  const [mostrarModalAltaCategoria, setMostrarModalAltaCategoria] = React.useState(false);
  const [mostrarLibros, setMostrarLibros] = React.useState(null);
  const [listaLibros, setListaLibros] = React.useState([]);

  const cargaDatosDeServer = async () => {
    try {
    var respuesta = await axios.get("http://localhost:3001/categoria");
    }
    catch(error){
      alert(error.response.data.Error);
    }
    setlistaCategorias(respuesta.data);
  };

  React.useEffect(() => cargaDatosDeServer(), []);

  const categoriaLibros = (id) => {
    
    setMostrarLibros(id);
  }

  listaCategorias.forEach((element, index) => {
    categorias.push(
      <CategoriaCard
        nombre={element.nombre}
        key={index}
        categoriaId={element.id}
        refrescame={() => cargaDatosDeServer()}
        onLibros={categoriaLibros}
      />
    );
  });

  const ocultarModalAltaCategoria = () => {
    setMostrarModalAltaCategoria(false);
  };

  const onAlta = () => {
    setMostrarModalAltaCategoria(true);
  };

  const cargarLibros = async () => {
    if(mostrarLibros){
      try {
        const respuesta = await axios.get("http://localhost:3001/libro");
        
        setListaLibros(respuesta.data);
      } catch(e) {
        console.log(e.message);
        console.log("No se encontraron libros para esta categoria.");
        setListaLibros([]);
      }
    }
  }

  React.useEffect(() => cargarLibros(), [mostrarLibros]);

  let ListadoLibros = () => (
    <div> 
    <h3>{(listaCategorias.find((elem) => elem.id === mostrarLibros)).nombre}</h3>
    <div>
    { listaLibros.filter((e)=> e.categoria_id === mostrarLibros).length > 0 ?
      <>
      <table className="tablaLibros">
      <thead>
          <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
          </tr>
      </thead>
      <tbody>
      
          {listaLibros.map((elem)=> ( elem.categoria_id === mostrarLibros ?
            <tr key={elem.id}>
              <td>{elem.id}</td>
              <td>{elem.nombre}</td>
              <td>{elem.descripcion}</td>
            </tr>
            : null
          ))}
          

      </tbody>
      </table>
      </>
      : <p>No hay libros con esta categoría</p>
    }
      </div>
    </div>)

  return (
    <div className="seccion">
      <div className="titulo">
        <h2> Categorías </h2>
      </div>
      <div className="coleccionCards"> {categorias} </div>
      <div className="botonesDeSeccion">
        <button onClick={onAlta}> Alta</button>
      </div>
      <div className="botonesDeSeccion">
        { mostrarLibros ? <ListadoLibros /> : null }
      </div>
      <div className="links">
        Links de la sección Categorías:
        <div>
          <div>
            <Link to="/">Ir al inicio</Link>
          </div>
          <div>
            <Link to="/libros">Ir a estante de libros</Link>
          </div>
          <div>
            <Link to="/personas">Ir a personas (prestatarios)</Link>
          </div>
        </div>
      </div>
      {mostrarModalAltaCategoria && (
        <ModalAltaCategoria ocultame={() => ocultarModalAltaCategoria()} refrescame={() => cargaDatosDeServer()} />
      )}
    </div>
  );
}
