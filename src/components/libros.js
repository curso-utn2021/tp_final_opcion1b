import LibroCard from "./libroCard";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ModalAltaLibro from "./modalesAuxiliares/modalAltaLibro";

export default function Libros(props) {
  const [mostrarModalAltaLibro, setMostrarModalAltaLibro] = React.useState(false);

  const cargaDatosDeServer = async () => {
    console.log("ejecutando cargaDatosDeServer");

    try {
      var respuesta = await axios.get("http://localhost:3001/libro");

      setListado(respuesta.data);
    } catch (error) {
      console.log(error);
      alert(error);
    } // Fin de trycatch
  }; //Fin de función cargaDatosDeServer

  const [listado, setListado] = React.useState([{ nombre: "libro1" }, { nombre: "libro2" }]);

  let libros = [];

  listado.forEach(
    (element, index) => {
      libros.push(
        <LibroCard
          key={index}
          id={element.id}
          nombre={element.nombre}
          descripcion={element.descripcion}
          categoria_id={element.categoria_id}
          persona_id={element.persona_id}
          refrescame={() => cargaDatosDeServer()}
          history={props.history}
        />
      ); //Fin de libros.push
    } //fin de callback de foreach
  ); //Fin de forEach

  React.useEffect(() => cargaDatosDeServer(), []);

  const ocultarModalAltaLibro = () => {
    setMostrarModalAltaLibro(false);
  };

  const onAlta = () => {
    setMostrarModalAltaLibro(true);
  };

  return (
    <div className="seccion">
      <div className="titulo">
        <h2> Estante de la biblioteca </h2>
      </div>

      <div className="coleccionCards"> {libros} </div>
      <div className="botonesDeSeccion">
        <button onClick={onAlta}> Alta</button>
      </div>

      <div className="links">
        Links de la sección Estante:
        <div>
          <div>
            <Link to="/">Ir al inicio</Link>
          </div>
          <div>
            <Link to="/personas">Ir a personas (prestatarios)</Link>
          </div>
          <div>
            <Link to="/categorias">Ir a categorias</Link>
          </div>
        </div>
        {mostrarModalAltaLibro && (
          <ModalAltaLibro ocultame={() => ocultarModalAltaLibro()} refrescame={() => cargaDatosDeServer()} />
        )}
      </div>
    </div>
  );
}
