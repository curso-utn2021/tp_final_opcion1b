import React from "react";

export default function ModalEditarCategoria(props) {
  return (
    <div className="modal">
      <div className="modalInterno">
        <h2>Las categorías no se pueden editar</h2>

        <div>
          <button onClick={() => props.ocultame()}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
