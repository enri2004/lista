import React, { useState } from "react";
import { Button } from 'reactstrap';

export default function DatosAlumnos() {
  const [asistio, setAsistio] = useState(false);
  const [noAsistio, setNoAsistio] = useState(false);
  const [justificada, setJustificada] = useState(false);

  return (
    <div>
      <div>
        <Button
          color="success"
          onClick={() => {
            setAsistio(true);
            setNoAsistio(false);
            setJustificada(false);
          }}
        >
          Asistió
        </Button>
        <Button
          color="danger"
          onClick={() => {
            setNoAsistio(true);
            setAsistio(false);
            setJustificada(false);
          }}
        >
          No Asistió
        </Button>
        <Button
          color="info"
          onClick={() => {
            setJustificada(true);
            setAsistio(false);
            setNoAsistio(false);
          }}
        >
          Justificada
        </Button>
      </div>
      <div>
        <span>{asistio ? "✔️" : ""}</span>
        <span>{noAsistio ? "❌" : ""}</span>
        <span>{justificada ? "✅" : ""}</span>
      </div>
    </div>
  );
}
