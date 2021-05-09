import axios from "axios";
import React from "react";

export default function ModalAltaCategoria(props) {
  function sacarWarningDeVariableNoUsada(variable) {}

  // variables de inputs controlados

  const [nombre, setNombre] = React.useState("");

  const onCrear = async () => {
    try {
      var respuesta = await axios.post("http://localhost:3001/categoria", {
        nombre: nombre,
      });
      sacarWarningDeVariableNoUsada(respuesta);
      props.ocultame();
      props.refrescame();
    } catch (error) {
        alert(error.response.data.Error);
    }
  };

  return (
    <div className="modal">
      <div className="modalInterno">
        <h2>Alta de categoria</h2>

        <div>
          Nombre de la categoría
          <input
            type="text"
            onChange={(event) => {
              setNombre(event.target.value);
            }}
          />
        </div>

        <div>
          <button onClick={() => props.ocultame()}>Cerrar</button>
          <button onClick={() => onCrear()}>Crear</button>
        </div>
      </div>
    </div>
  );
}
