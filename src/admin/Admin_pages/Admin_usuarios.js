import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal, ModalBody, FormGroup, ModalHeader } from 'reactstrap';
import axios from "axios";




export default function TablaUsuarios(){

const [Data,setData]=useState([]);
 
useEffect(() => {
    const fetchData = async () => {//funcion donde se va a extraer los datos de la api
      try {
        const baseUrl = 'https://api-rest-htj4.onrender.com/api/datos'; // Ruta correcta de la API
        const response = await axios.get(baseUrl);//para buscar la informacion.
        setData(response.data); //si encuentra informacion se guarda en setData
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);





    return(
        <>
        <Container>
        <table className="table" striped="true" bordered="true" hover="true">
            <thead>
            <tr>
            <th>#</th>
            <th>apellido_paterno</th>
            <th>apellido_materno</th>
            <th>nombre</th>
            <th>fecha_nacimiento</th>
            <th>Edad</th>
            <th>institucion</th>
            <th>Materia</th>
            <th>semestre</th>
            <th>sexo</th>
            <th>email</th>
            <th>telefono</th>
            <th>Lugar</th>
            <th>usuario</th>
            <th>contraseña</th>
            </tr>
            </thead>
            <tbody>
                {Data.map((usuario, index)=>(
                  <tr key={usuario.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{usuario.apellido_paterno}</td>
                    <td>{usuario.apellido_materno}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.fecha_nacimiento}</td>
                    <td>{usuario.edad}</td>
                    <td>{usuario.institucion}</td>
                    <td>{usuario.materia}</td>
                    <td>{usuario.semestre}</td>
                    <td>{usuario.sexo}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.lugar}</td>
                    <td>{usuario.usuario}</td>
                    <td>{usuario.contraseña}</td>
                  </tr>
                 
                ))}
            </tbody>
        </table>
        </Container>
        </>
    )    
}