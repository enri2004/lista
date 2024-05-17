import React, { useRef, useState } from 'react';
import '../css/Configuracion.css'; // Asegúrate de tener la ruta correcta hacia tu archivo CSS
import confi from '../img/confi.jpg';

function Configuracion() {
    const cambioImagen = useRef(null);
    const [imagen, setImagen] = useState("");
    const [seleccionarImagen, setSeleccionarImagen] = useState(null);

    const cambio = () => {
        cambioImagen.current.click();
    }

    const hadleImagenChage = (e) => {
        const files = e.target.files[0];
        console.log(files);
        setSeleccionarImagen(files);
        setImagen(URL.createObjectURL(files));
    }

    return (
        <div className="contenedor-configuracion">
            
            <div className='cuadro1' onClick={cambio}>
                <input type='file' ref={cambioImagen} onChange={hadleImagenChage} className='imagen' style={{ display: "none" }} />
                {imagen ? <img alt='' src={imagen} /> : <img className='imagen' src={confi} alt='confi' />}
            </div>
            <div className='cuadro2'>
                <h1>Idioma</h1>
                <div className='letra'>
                    <h4>español</h4>
                    <h4>ingles</h4>
                    <h4>japones</h4>
                    <h4>frances</h4>
                </div>
            </div>

            <div className='cuadro3'>
                <h1>personalizar</h1>
                <h4>color</h4>
                <h4>letra</h4>
            </div>

            <div className="cuadro4">
                <h1>Seguridad</h1>
                <h4>pivacidad</h4>
                <h4>norma y politica</h4>
                <h4>condiciones</h4>
            </div>

            <div className="cuadro5">
                <h1>soporte</h1>
                <a href='http://localhost:3001/Soporte'><h4>recuperar contraseña</h4></a>
                <h4>cambiar informacion</h4>
                <h4>obtener tu informacion</h4>
                <a href='http://localhost:3001/Soporte'><h4>quejas o sugerencia</h4></a>
            </div>
        </div>
    );
}

export default Configuracion;
