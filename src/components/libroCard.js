import axios from "axios";
import React from "react";
import ModalPrestarLibro from "./modalesAuxiliares/modalPrestarLibro";
import ModalEditarLibro from "./modalesAuxiliares/modalEditarLibro";

export default function LibroCard(props) {
  function sacarWarningDeVariableNoUsada(variable) {}

  const [mostrarModalPrestarLibro, setMostrarModalPrestarLibro] = React.useState(false);
  const [mostrarModalEditarLibro, setMostrarModalEditarLibro] = React.useState(false);

  const onPrestar = async () => {
    setMostrarModalPrestarLibro(true);
    
  };

  const onDevolver = async () => {
    try {
      var respuesta = await axios.put("http://localhost:3001/libro/devolver/" + props.id);
      sacarWarningDeVariableNoUsada(respuesta);
      props.refrescame();
    } catch (error) {
      alert(error.message);
    }
  };

  const onEditar = async () => {
    setMostrarModalEditarLibro(true);
  };

  const onBorrar = async () => {
    try {
      var respuesta = await axios.delete("http://localhost:3001/libro/" + props.id);
      props.refrescame();
      sacarWarningDeVariableNoUsada(respuesta);
    } catch (error) {
      alert(error.message);
    }
  };

  let ocultarModalPrestarLibro = () => {
    setMostrarModalPrestarLibro(false);
    props.refrescame();
  };

  let ocultarModalEditarLibro = () => {
    setMostrarModalEditarLibro(false);
    props.refrescame();
  };

  return (
    <div className="libroCard">
      <div> {props.nombre}</div>
      <div> Id libro {props.id}</div>

      <div> {props.descripcion}</div>
      <div> {props.categoria_id}</div>
      <div>{props.persona_id}</div>

      <div className="botoneraInCard">
        <button className="botonTransparentado" onClick={onPrestar}>
          Prestar
        </button>
        <button className="botonTransparentado" onClick={onDevolver}>
          Devolver
        </button>
        <button className="botonTransparentado" onClick={onEditar}>
          Editar
        </button>
        <button className="botonTransparentado" onClick={onBorrar}>
          Borrar
        </button>
      </div>

      {mostrarModalPrestarLibro && <ModalPrestarLibro ocultame={() => ocultarModalPrestarLibro()} idLibro={props.id} />}
      {mostrarModalEditarLibro && <ModalEditarLibro ocultame={() => ocultarModalEditarLibro()} idLibro={props.id} />}
    </div>
  );
}
