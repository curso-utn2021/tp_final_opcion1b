import axios from "axios";
import React from "react";

export default function ModalPrestarLibro(props) {
  function sacarWarningDeVariableNoUsada(variable) {}

  React.useEffect(() => cargaDatosDeServer(), []);

  const [listaPersonas, setListaPersonas] = React.useState([]);
  const [idPersonaSeleccionado, setIdPersonaSeleccionado] = React.useState(1);

  const cargaDatosDeServer = async () => {
    try {
      var respuesta = await axios.get("http://localhost:3001/persona");

      setListaPersonas(respuesta.data);
    } catch (error) {
      alert(error);
    }
  };

  let opciones = [];

  //console.log(listaPersonas);

  listaPersonas.forEach((element, index) => {
    opciones.push(
      <option key={index} value={element.id}>
        {element.nombre}
      </option>
    );
  });

  let selector = (
    <select
      name="selectorNombres"
      onChange={(event) => {
        //alert(event.target.value);
        setIdPersonaSeleccionado(event.target.value);
      }}
    >
      {opciones}
    </select>
  );
  //console.log(selector);

  const onPrestar = async () => {
    //alert(idPersonaSeleccionado);
    try {
      var respuesta = await axios.put("http://localhost:3001/libro/prestar/" + props.idLibro, {
        persona_id: idPersonaSeleccionado,
      });
      sacarWarningDeVariableNoUsada(respuesta);
      props.ocultame();
      
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="modal">
      <div className="modalInterno">
        <h2>id de libro a prestar: {props.idLibro}</h2>
        <div>{selector}</div>
        <div>
          <button onClick={() => props.ocultame()}>Cerrar</button>
          <button onClick={() => onPrestar()}>Prestar</button>
        </div>
      </div>
    </div>
  );
}
