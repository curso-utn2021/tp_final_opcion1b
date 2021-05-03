import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="seccion">
      <div className="titulo">
        <h2>Inicio</h2>
      </div>

      <div className="links">
        <div>Links de la sección inicio</div>
        <div>
          <Link to="/libros">Ir al Estante de libros</Link>
        </div>
        <div>
          <Link to="/personas">Ir al ABM de personas (prestatarios)</Link>
        </div>
        <div>
          <Link to="/categorias">Ir al ABM de categorias</Link>
        </div>
      </div>
    </div>
  );
}
