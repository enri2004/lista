import React, { useState } from "react";
import '../css/Asistencia.css'; // Importa el archivo CSS para estilizar los cuadros

export default function Asistencia({ onAsistenciaChange }) {
  const [asistio, setAsistio] = useState(false);
  const [noAsistio, setNoAsistio] = useState(false);
  const[justificada,setJustificada]=useState(false);

  const handleAsistioClick = () => {
    setAsistio(true);
    setNoAsistio(false);
    setJustificada(false);
    onAsistenciaChange("✔️"); // Llama a la función de devolución de llamada con la opción seleccionada
  };

  const handleNoAsistioClick = () => {
    setAsistio(false);
    setNoAsistio(true);
    setJustificada(false);
    onAsistenciaChange("❌"); // Llama a la función de devolución de llamada con la opción seleccionada
  };

  const handleJustificadaoClick = () => {
    setAsistio(false);
    setNoAsistio(false);
    setJustificada(true);
    onAsistenciaChange("✅"); // Llama a la función de devolución de llamada con la opción seleccionada
  };

  return (
    <div className="contenedor">
      <div className={`cuadro ${asistio ? 'activo' : ''}`} onClick={handleAsistioClick}>
        {asistio && "✔️"}
      </div>
      <div className={`cuadro ${noAsistio ? 'activo' : ''}`} onClick={handleNoAsistioClick}>
        {noAsistio && "❌"}
      </div>
      <div className={`cuadro ${justificada ? 'activo' : ''}`} onClick={handleJustificadaoClick}>
        {justificada && "✅"}
      </div>
    </div>
  );
}
