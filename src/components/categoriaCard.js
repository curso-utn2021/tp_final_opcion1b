import axios from "axios";
import React from "react";
import ModalEditarCategoria from "./modalesAuxiliares/modalEditarCategoria";

export default function CategoriaCard(props) {
  function sacarWarningDeVariableNoUsada(variable) {}

  const [mostrarModalEditarCategoria, setMostrarModalEditarCategoria] = React.useState(false);

  const onBorrar = async () => {
    try {
      var respuesta = await axios.delete("http://localhost:3001/categoria/" + props.categoriaId);
      props.refrescame();
      sacarWarningDeVariableNoUsada(respuesta);
    } catch (error) {
      alert(error.message);
    }
  };

  let ocultarModalEditarCategoria = () => {
    setMostrarModalEditarCategoria(false);
  };

  return (
    <div className="categoriaCard">
      <div> {props.nombre} </div>

      <div className="botoneraInCard">
        <button className="botonTransparentado" onClick={() => setMostrarModalEditarCategoria(true)}>
          Editar
        </button>
        <button className="botonTransparentado" onClick={onBorrar}>
          Borrar
        </button>
      </div>
      {mostrarModalEditarCategoria && <ModalEditarCategoria ocultame={() => ocultarModalEditarCategoria()} />}
    </div>
  );
}
