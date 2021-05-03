import axios from "axios";
import React from "react";

export default function ModalEditarLibro(props) {
  function sacarWarningDeVariableNoUsada(variable) {}

  const [descripcion, setDescripcion] = React.useState("");

  const onEditar = async () => {
    try {
      var respuesta = await axios.put("http://localhost:3001/libro/" + props.idLibro, {
        descripcion: descripcion,
      });
      sacarWarningDeVariableNoUsada(respuesta);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="modal">
      <div className="modalInterno">
        <h2>id de libro a editar: {props.idLibro}</h2>
        <div>
          <h2>Sólo se puede editar la descripción</h2>
          <input
            type="text"
            onChange={(event) => {
              //alert(event.target.value);
              setDescripcion(event.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={() => props.ocultame()}>Cerrar</button>
          <button onClick={() => onEditar()}>Editar</button>
        </div>
      </div>
    </div>
  );
}