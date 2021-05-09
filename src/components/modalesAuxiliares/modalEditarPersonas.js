import axios from "axios";
import React from "react";

export default function ModalEditarPersona(props) {
  function sacarWarningDeVariableNoUsada(variable) {}

  /*  recibe: {nombre: string, apellido: string, alias: string, email: string} 
  el email no se puede modificar. 
   */

  // Variables de inputs controlados
  const [nombre, setNombre] = React.useState(props.nombre);
  const [apellido, setApellido] = React.useState(props.apellido);
  const [alias, setAlias] = React.useState(props.alias);

  const onEditar = async () => {
    try {
      
      var respuesta = await axios.put("http://localhost:3001/persona/" + props.idPersona, {
        nombre: nombre,
        apellido: apellido,
        alias: alias,
      });
      props.ocultame();
      props.refrescame();
      sacarWarningDeVariableNoUsada(respuesta);
    } catch (error) {
      alert(error.response.data.Error);
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
            type="text" value={nombre}
            onChange={(event) => {
              console.log(event.target.value);
              setNombre(event.target.value);
            }}
          />
        </div>

        <div>
          Apellido:
          <input
            type="text" value={apellido}
            onChange={(event) => {
              setApellido(event.target.value);
            }}
          />
        </div>

        <div>
          Alias:
          <input
            type="text" value={alias}
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
