import React from "react";
import Fondo from "./perfil.jpg"; // Importa el GIF
import '../css/login_fondo.css';

export default function fondo() {
    return (
        <div className="contenedor_fondo">
            <img className="fondo"
            alt="Fondo"
            src={Fondo}
            
            />
        </div>
    );
}
