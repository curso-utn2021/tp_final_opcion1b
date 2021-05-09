import axios from "axios";
import React from "react";

export default function ModalAltaLibro(props) {
  function sacarWarningDeVariableNoUsada(variable) {}

  React.useEffect(() => cargaDatosDeServerPersonas(), []);
  React.useEffect(() => cargaDatosDeServerCategorias(), []);

  const [listaPersonas, setListaPersonas] = React.useState([]);
  const [listaCategorias, setListaCategorias] = React.useState([]);

  const [idPersonaSeleccionado, setIdPersonaSeleccionado] = React.useState(null);
  const [idCategoriaSeleccionado, setIdCategoriaSeleccionado] = React.useState(null);

  const [nombre, setNombre] = React.useState("");

  const [descripcion, setDescripcion] = React.useState("");

  const cargaDatosDeServerPersonas = async () => {
    try {
      var respuestaPersonas = await axios.get("http://localhost:3001/persona");

      setListaPersonas(respuestaPersonas.data);
    } catch (error) {
      alert(error.response.data.Error);
    }
  };

  const cargaDatosDeServerCategorias = async () => {
    try {
      var respuestaCategorias = await axios.get("http://localhost:3001/categoria");

      setListaCategorias(respuestaCategorias.data);
    } catch (error) {
      alert(error.response.data.Error);
    }
  };

  let opcionesPersona = [
    <option key="-1" value="null">
      No ha seleccionado persona prestataria
    </option>,
  ];

  listaPersonas.forEach((element, index) => {
    opcionesPersona.push(
      <option key={index} value={element.id}>
        {element.nombre}
      </option>
    );
  });

  let selectorPersona = (
    <select
      name="selectorNombres"
      onChange={(event) => {
        //alert(event.target.value);
        setIdPersonaSeleccionado(event.target.value);
      }}
    >
      {opcionesPersona}
    </select>
  );

  let opcionesCategoria = [
    <option key="-1" value="null">
      No ha seleccionado categoría
    </option>,
  ];

  listaCategorias.forEach((element, index) => {
    opcionesCategoria.push(
      <option key={index} value={element.id}>
        {element.nombre}
      </option>
    );
  });

  let selectorCategoria = (
    <select
      name="selectorCategoria"
      onChange={(event) => {
        //alert(event.target.value);
        setIdCategoriaSeleccionado(event.target.value);
      }}
    >
      {opcionesCategoria}
    </select>
  );

  const onCrear = async () => {
    //alert(idPersonaSeleccionado);
    try {
      var respuesta = await axios.post("http://localhost:3001/libro", {
        nombre: nombre,
        descripcion: descripcion,
        categoria_id: idCategoriaSeleccionado,
        persona_id: idPersonaSeleccionado,
      });
      sacarWarningDeVariableNoUsada(respuesta);
      props.ocultame();
      props.refrescame();
    } catch (error) {
      console.log(error.data);
      alert(error);
    }
  };

  return (
    <div className="modal">
      <div className="modalInterno">
        <h2>Alta de libro</h2>

        <div>
          Nombre del libro
          <input
            type="text"
            onChange={(event) => {
              setNombre(event.target.value);
            }}
          />
        </div>

        <div>
          Descripción del libro
          <input
            type="text"
            onChange={(event) => {
              setDescripcion(event.target.value);
            }}
          />
        </div>

        <div>Seleccione categoría {selectorCategoria}</div>

        <div>Seleccione persona a prestar {selectorPersona}</div>
        <div>
          <button onClick={() => props.ocultame()}>Cerrar</button>
          <button onClick={() => onCrear()}>Crear</button>
        </div>
      </div>
    </div>
  );
}
