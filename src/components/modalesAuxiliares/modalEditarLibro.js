import axios from "axios";
import React from "react";

export default function ModalEditarLibro(props) {
  function sacarWarningDeVariableNoUsada(variable) {}

  const [descripcion, setDescripcion] = React.useState(props.descripcion);

  const onEditar = async () => {
    try {
      var respuesta = await axios.put("http://localhost:3001/libro/" + props.idLibro, {
        descripcion: descripcion,
      });
      sacarWarningDeVariableNoUsada(respuesta);
      props.ocultame();
    } catch (error) {
      console.log(error);
      alert(error.response.data.Error);
    }
  };
  
  return (
    <div className="modal">
      <div className="modalInterno">
        <h2>id de libro a editar: {props.idLibro}</h2>
        <div>
          <h2>Sólo se puede editar la descripción</h2>
          <input
            type="text" value={descripcion}
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
