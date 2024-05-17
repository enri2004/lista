import React, { useState } from 'react';
import { Button } from "antd";
import '../css_admin/Matricula.css';
import Axios from '../../servers/Axios';

export default function Matricula() {

    const [formData, setFormData] = useState({
        usuario:'',
        contraseña:'',
        apellidos: '',
        nombre: '',
        institucion: '',
        materia: '',
        semestre: '',
        sexo: '',
        email: '',
        telefono: '',
        fecha_nacimiento: '',
        edad: '',
        lugar: '',
        roles:'',
        contraseña1:'',
        Id_maestro:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Axios.post('/saveData', {...formData });

        console.log('Datos enviados correctamente');
        e.target.reset();

    } catch (error) {
        console.error('Error al enviar los datos', error);
        // Mostrar mensaje de error al usuario
    }
    };

    
    
    
   
   
    return (
        <div>
            {<form className="contenedor" id='Formulario' onSubmit={handleSubmit}>
                <h1 >INGRESAR DATOS DE LOS USUARIOS</h1>
                
                    <div className ='input'>
                    <input type="text"  required=" " name="apellido"  onChange={handleChange} />
                    <span className='span_apellido'>apellidos</span>
                    <i className='i'></i>
                    </div>
                
                    <div className='input_Nombre'>
                    <input type="text" required=" " name="nombre"  onChange={handleChange} />    
                    <span className="span_nombre">Nombre</span>
                    <i  className="i_nombre"></i>
                    </div>

                    <div className='input_instituto'>
                    <input type="text" required=" " name="institucion" onChange={handleChange} />
                    <span className='span_instituto'>Institucion</span>
                    <i className="i_instituto"></i>
                    </div>

                    <div className='input_edad'>
                    <input type="number" min={1} max={100} required=" "  name="edad" onChange={handleChange} />
                    <span className='span_edad'>Edad</span>
                    <i className='i_edad'></i>
                    </div>
                    <div className='input_sexo'>
                    <input type="text" required=" "  name="sexo" onChange={handleChange} />
                    <span className='span_sexo'>Sexo</span>
                    <i className='i_sexo'></i>
                    </div>
                    <div className='input_telef'>
                    <input type="tel"  required=" " name="telefono"  onChange={handleChange} />
                    <span className='span_telef'>Telefono</span>
                    <i className='i_telef'></i>
                    </div>                
                    <div className='input_data'>
                    <input type="date" required=" " name="fecha_nacimiento" className="form_date" />
                    <span className="span_data">fecha nacimiento</span>
                    <i className="i_data"></i>
                    </div>
                    <div className='input_email'>
                    <input type="email" required=" " name="email" onChange={handleChange} />
                    <span className='span_email'>email</span>
                    <i className='i_email'></i>
                    </div>
                    <div className='input_lugar'>
                    <input type="text" required=" " name="lugar" onChange={handleChange} />
                    <span className='span_lugar'>lugar</span>
                    <i className='i_lugar'></i>
                    </div>
                     
                    <div className='input_materia'>
                    <input type="text" required=" " name="materia" onChange={handleChange} />
                    <span className='span_materia'>Materia</span>
                    <i className='i_materia'></i>
                    </div>
                    <div className='input_semestre'>
                    <input type="text" required=" " name="semestre" onChange={handleChange} />
                    <span className='span_semestre'>Semestre</span>
                    <i className='i_semestre'></i>
                    </div>
                    <div className='input_usuario'>
                    <input type="tex" required=" " name="usuario"onChange={handleChange} />
                    <span className='span_usuario'>Usuario</span>
                    <i className='i_usuario'></i>
                    </div>
                    <div className='input_contraseña1'>
                    <input type="tex" required=" "  name="contraseña1" onChange={handleChange} />
                    <span className='span_contraseña1'>Confirmar contraseña</span>
                    <i className='i_contraseña1'></i>
                    </div>
                    <div className='input_contraseña'>
                    <input type="tex" required=" "  name="contraseña" onChange={handleChange} />
                    <span className='span_contraseña'>Contraseña</span>
                    <i className='i_contraseña'></i>
                    </div>
                    <div className='input_Id_maestro'>
                    <input type="tex"   name="Id_maestro" onChange={handleChange} />
                    <span className='span_Id_maestro'>Id_maetro</span>
                    <i className='i_Id_maestro'></i>
                    </div>
                    

                <div className='input_rol'>
                        <div clas="select-container">
                        <label class="select-label" for="select-body"></label>
                        <div id="select-category-container" class="select-body">
                    <select name="roles" id="select-category" onChange={handleChange} >
                    <option value="Roles">Roles</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                    </select>
                    <div>
                        <div class='select-icon'>
                        <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                
                    <input type="hidden" name="qrValue" value={formData.qrValue} />

                <Button type="primary" htmlType="submit" className="boton1" >enviar</Button>
            </form>}
             
        </div>
    )
}