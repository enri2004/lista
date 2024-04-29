import React, { useState } from "react";
import { Menu as AntMenu } from 'antd';
import Desplazamiento from "./Admin_desplaZamiento";
import { Link } from "react-router-dom";
import '../css_admin/Admin_menu.css'




export default function MenuPrincipal() {
    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!isOpen);
    };
    return (

        <div>
            <Desplazamiento  isOpen={isOpen} toggleMenu={toggleMenu} />
            <AntMenu className="menu" style={{ display: isOpen ? 'grid' : 'none', top: isOpen }}>
                <AntMenu.Item key="/Perfil"><Link to="/Perfil">Perfil</Link></AntMenu.Item>
                <AntMenu.Item key="/Matricula"><Link to="/Matricula">Matriculas</Link></AntMenu.Item>
                <AntMenu.Item key="/Agregar_Datos">Lista_Alumnos</AntMenu.Item>
                <AntMenu.Item key="/usuarios"><Link to="/Admin Usuario">Usuario</Link></AntMenu.Item>
                <AntMenu.Item key="/"><Link to="/">Cerrar Sesión</Link></AntMenu.Item>ç
            </AntMenu>
            
        </div>
    );
}
