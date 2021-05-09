import axios from "axios";
import React from "react";

export default function ModalAltaPersona(props) {
  function sacarWarningDeVariableNoUsada(variable) {}

  // variables de inputs controlados

  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [email, setEmail] = React.useState("");

  const onCrear = async () => {
    try {
      var respuesta = await axios.post("http://localhost:3001/persona", {
        nombre: nombre,
        apellido: apellido,
        alias: alias,
        email: email,
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
        <h2>Alta de persona</h2>

        <div>
          Nombre de la persona
          <input
            type="text"
            onChange={(event) => {
              setNombre(event.target.value);
            }}
          />
        </div>

        <div>
          Apellido
          <input
            type="text"
            onChange={(event) => {
              setApellido(event.target.value);
            }}
          />
        </div>

        <div>
          Alias
          <input
            type="text"
            onChange={(event) => {
              setAlias(event.target.value);
            }}
          />
        </div>

        <div>
          E-mail
          <input
            type="text"
            onChange={(event) => {
              setEmail(event.target.value);
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
