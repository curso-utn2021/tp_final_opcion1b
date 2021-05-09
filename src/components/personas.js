import PersonaCard from "./personaCard";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ModalAltaPersona from "./modalesAuxiliares/modalAltaPersona";

export default function Personas() {
  let personas = [];
  const [mostrarModalAltaPersona, setMostrarModalAltaPersona] = React.useState(false);
  const [listaPersonas, setlistaPersonas] = React.useState([{ nombre: "persona1" }, { nombre: "persona2" }]);
  const [mostrarLibros, setMostrarLibros] = React.useState(null);
  const [listaLibros, setListaLibros] = React.useState([]);

  const cargaDatosDeServer = async () => {
    var respuesta = await axios.get("http://localhost:3001/persona");

    setlistaPersonas(respuesta.data);
  };

  React.useEffect(() => cargaDatosDeServer(), []);

  const prestadosLibros = (id) => {
    setMostrarLibros(id);
  }

  listaPersonas.forEach((element, index) => {
    personas.push(
      <PersonaCard refrescame={() => cargaDatosDeServer()} nombre={element.nombre} apellido={element.apellido} personaId={element.id} email={element.email} alias={element.alias} key={index} onLibros={prestadosLibros}/>
    );
  });

  const onAlta = () => {
    setMostrarModalAltaPersona(true);
  };

  const ocultarModalAltaPersona = () => {
    setMostrarModalAltaPersona(false);
  };

  const cargarLibros = async () => {
    if(mostrarLibros != null){
      try {
        const respuesta = await axios.get("http://localhost:3001/libro");
        
        setListaLibros(respuesta.data);
      } catch(e) {
        console.log(e.message);
        console.log("No se encontraron libros para esta categoria.");
        setListaLibros([]);
      }
    }
  }

  React.useEffect(() => cargarLibros(), [mostrarLibros]);

  let ListadoLibros = () => (
    <div> 
    <h3>{(listaPersonas.find((elem) => elem.id === mostrarLibros)).nombre}</h3>
    <div>
    { listaLibros.filter((e)=> e.persona_id === mostrarLibros).length > 0 ?
      <>
      <table className="tablaLibros">
      <thead>
          <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
          </tr>
      </thead>
      <tbody>
      
          {listaLibros.map((elem)=> ( elem.persona_id === mostrarLibros ?
            <tr key={elem.id}>
              <td>{elem.id}</td>
              <td>{elem.nombre}</td>
              <td>{elem.descripcion}</td>
            </tr>
            : null
          ))}
          

      </tbody>
      </table>
      </>
      : <p>No tiene libros prestados de la biblioteca.</p>
    }
      </div>
    </div>)

  return (
    <div className="seccion">
      <div className="titulo">
        <h2>Personas (prestatarios)</h2>
      </div>
      <div className="coleccionCards"> {personas} </div>
      <div className="botonesDeSeccion">
        <button onClick={onAlta}> Alta</button>
      </div>
      <div className="botonesDeSeccion">
        { mostrarLibros ? <ListadoLibros /> : null }
      </div>
      <div className="links">
        Links de la sección personas (prestatarios):
        <div>
          <div>
            <Link to="/">Ir al inicio</Link>
          </div>
          <div>
            <Link to="/libros">Ir a estante de libros</Link>
          </div>
          <div>
            <Link to="/categorias">Ir a categorias</Link>
          </div>
        </div>
      </div>
      {mostrarModalAltaPersona && (
        <ModalAltaPersona ocultame={() => ocultarModalAltaPersona()} refrescame={() => cargaDatosDeServer()} />
      )}
    </div>
  );
}
