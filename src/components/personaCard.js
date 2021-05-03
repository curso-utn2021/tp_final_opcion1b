import React from "react";
import axios from "axios";
import ModalEditarPersona from "./modalesAuxiliares/modalEditarPersonas";

export default function PersonaCard(props) {
  function sacarWarningDeVariableNoUsada(variable) {}
  const [mostrarModalEditarPersona, setMostrarModalEditarPersona] = React.useState(false);

  const onEditar = async () => {
    setMostrarModalEditarPersona(true);
  };

  let ocultarModalEditarPersona = () => {
    setMostrarModalEditarPersona(false);
  };

  const onBorrar = async () => {
    try {
      var respuesta = await axios.delete("http://localhost:3001/persona/" + props.personaId);
      props.refrescame();
      sacarWarningDeVariableNoUsada(respuesta);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="personaCard">
      <div> {props.nombre} </div>
      <div> {props.personaId} </div>
      <div className="botoneraInCard">
        <button className="botonTransparentado" onClick={onEditar}>
          Editar
        </button>
        <button className="botonTransparentado" onClick={onBorrar}>
          Borrar
        </button>
      </div>

      {mostrarModalEditarPersona && (
        <ModalEditarPersona
          refrescame={props.refrescame}
          idPersona={props.personaId}
          ocultame={ocultarModalEditarPersona}
        />
      )}
    </div>
  );
}
