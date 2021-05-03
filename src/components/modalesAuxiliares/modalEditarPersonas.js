import axios from "axios";
import React from "react";

export default function ModalEditarPersona(props) {
  function sacarWarningDeVariableNoUsada(variable) {}

  /*  recibe: {nombre: string, apellido: string, alias: string, email: string} 
  el email no se puede modificar. 
   */

  // Variables de inputs controlados
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [alias, setAlias] = React.useState("");

  const onEditar = async () => {
    try {
      var respuesta = await axios.put("http://localhost:3001/persona/" + props.idPersona, {
        nombre: nombre,
        apellido: apellido,
        alias: alias,
      });
      props.refrescame();
      sacarWarningDeVariableNoUsada(respuesta);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="modal">
      <div className="modalInterno">
        <div>
          <h2>id de persona a editar: {props.idPersona}</h2>
        </div>

        <div>
          <h2>El email no se puede editar</h2>
        </div>

        <div>
          Nombre:
          <input
            type="text"
            onChange={(event) => {
              setNombre(event.target.value);
            }}
          />
        </div>

        <div>
          Apellido:
          <input
            type="text"
            onChange={(event) => {
              setApellido(event.target.value);
            }}
          />
        </div>

        <div>
          Alias:
          <input
            type="text"
            onChange={(event) => {
              setAlias(event.target.value);
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
