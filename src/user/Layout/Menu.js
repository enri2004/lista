import React, { useState } from "react";
import { Menu as AntMenu } from 'antd'; // es una libreria para crear menu
import Desplazamiento from "./Desplazamiento"; // importa el codigo de dezplazamiento
import '../css/Menu.css';
import { Link } from "react-router-dom"; // es el que importa las rutas 
import { FaDatabase } from "react-icons/fa";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { RiHomeOfficeFill } from "react-icons/ri";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import { GrConfigure } from "react-icons/gr";




export default function MenuPrincipal() {
    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!isOpen);
    };// para cuando se quiera cerrar el menu 



    return (
        <div>
            <Desplazamiento isOpen={isOpen} toggleMenu={toggleMenu} />
            <AntMenu className="menu_2" style={{ display: isOpen ? 'grid' : 'none', top: isOpen }}>
                <AntMenu.Item key="/Perfil" icon={<IoPerson />}><Link to="/Perfil/usuario">Perfil</Link></AntMenu.Item>
                <AntMenu.Item key="/Casa"icon={<RiHomeOfficeFill />}><Link to="/Casa">Casa</Link></AntMenu.Item>
                <AntMenu.Item key="/Lista_Alumnos" icon={<FaDatabase />}><Link to="/asistencia">Lista de Alumnos</Link></AntMenu.Item>
                <AntMenu.Item key="/Agregar_Datos" icon={<BsDatabaseFillAdd />} ><Link to="/Tabla">Agregar Datos</Link></AntMenu.Item>
                <AntMenu.Item key="/Datos_alumno" icon={<BsFillClipboard2DataFill />}><Link to="/Datos_alumnos">Datos de alumno</Link></AntMenu.Item>
                <AntMenu.Item key="/Configuracion" icon={<GrConfigure />}><Link to='/Configuarcaion'>Configuaracion</Link></AntMenu.Item>
                <AntMenu.Item key="/"><Link to="/">Cerrar Sesión</Link></AntMenu.Item>
            </AntMenu>
        </div>
    );
}
