import React from "react";
import { Divide as Hamburger } from 'hamburger-react';
import '../css/Desplazamiento.css';

export default function Desplazamiento({ isOpen, toggleMenu }) {
    return (
        <div className="contrnedor_Menu">
            <div className="Menu" onClick={toggleMenu}>
                <Hamburger color="red" toggled={isOpen} size="32" rounded />
            </div>
        </div>
    );
}
