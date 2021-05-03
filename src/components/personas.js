import PersonaCard from "./personaCard";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ModalAltaPersona from "./modalesAuxiliares/modalAltaPersona";

export default function Personas() {
  let personas = [];
  const [mostrarModalAltaPersona, setMostrarModalAltaPersona] = React.useState(false);
  const [listaPersonas, setlistaPersonas] = React.useState([{ nombre: "persona1" }, { nombre: "persona2" }]);

  const cargaDatosDeServer = async () => {
    var respuesta = await axios.get("http://localhost:3001/persona");

    setlistaPersonas(respuesta.data);
  };

  React.useEffect(() => cargaDatosDeServer(), []);

  listaPersonas.forEach((element, index) => {
    personas.push(
      <PersonaCard refrescame={() => cargaDatosDeServer()} nombre={element.nombre} personaId={element.id} key={index} />
    );
  });

  const onAlta = () => {
    setMostrarModalAltaPersona(true);
  };

  const ocultarModalAltaPersona = () => {
    setMostrarModalAltaPersona(false);
  };

  return (
    <div className="seccion">
      <div className="titulo">
        <h2>Personas (prestatarios)</h2>
      </div>
      <div className="coleccionCards"> {personas} </div>
      <div className="botonesDeSeccion">
        <button onClick={onAlta}> Alta</button>
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
