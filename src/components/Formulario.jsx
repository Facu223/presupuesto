import React, { useState } from "react";
import Error from "./Error";
import shortid from 'shortid';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {
  const [nombre, guardarNombre] = useState("");
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  //cuando el usuario agrega un gasto
  const agregarGasto = (e) => {
    e.preventDefault();

    //validacion
    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    //construccion de gasto
    const gasto = {
        nombre,
        cantidad,
        id:shortid.generate()
    }

    //retornar al padre
    guardarGasto(gasto);
    guardarCrearGasto(true);

    //resetear el formulario
    guardarNombre('');
    guardarCantidad(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega tus gastos aquí</h2>
      {error ? (
        <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto" />
      ) : null}

      <div className="campo">
        <label>Nombre Gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          value={nombre}
          onChange={(e) => guardarNombre(e.target.value)}
        />
      </div>
      <label>Cantidad Gasto</label>
      <div>
        <input
          value={cantidad}
          onChange={(e) => guardarCantidad(e.target.value)}
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
        />
      </div>

      <input
        type="submit"
        className="button-primary u-full-width"
        value="Agregar Gasto"
      />
    </form>
  );
};

export default Formulario;
