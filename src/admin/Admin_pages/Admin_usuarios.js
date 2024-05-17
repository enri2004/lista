import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal, ModalBody, FormGroup, ModalHeader } from 'reactstrap';
import Axios from "../../servers/Axios";




export default function TablaUsuarios(){

const [Data,setData]=useState([]);
 
useEffect(() => {
    const fetchData = async () => {//funcion donde se va a extraer los datos de la api
      try {
        const baseUrl = '/datos'; // Ruta correcta de la API
        const response = await Axios.get(baseUrl);//para buscar la informacion.
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
            <th  class="bg-primary p-2 text-white bg-opacity-75" >#</th>
            <th class="bg-primary p-2 text-white bg-opacity-75">nombre</th>
            <th   class="bg-primary p-2 text-white bg-opacity-75">fecha_nacimiento</th>
            <th  class="bg-primary p-2 text-white bg-opacity-75" >Edad</th>
            <th class="bg-primary p-2 text-white bg-opacity-75">institucion</th>
            <th class="bg-primary p-2 text-white bg-opacity-75">Materia</th>
            <th class="bg-primary p-2 text-white bg-opacity-75">semestre</th>
            <th class="bg-primary p-2 text-white bg-opacity-75" >sexo</th>
            <th class="bg-primary p-2 text-white bg-opacity-75">email</th>
            <th class="bg-primary p-2 text-white bg-opacity-75" >telefono</th>
            <th class="bg-primary p-2 text-white bg-opacity-75" >Lugar</th>
            
            </tr>
            </thead>
            <tbody>
                {Data.map((usuario, index)=>(
                  <tr key={usuario.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{usuario.apellido_paterno} {usuario.apellido_materno} {usuario.nombre}</td>
                    <td>{usuario.fecha_nacimiento}</td>
                    <td>{usuario.edad}</td>
                    <td>{usuario.institucion}</td>
                    <td>{usuario.materia}</td>
                    <td>{usuario.semestre}</td>
                    <td>{usuario.sexo}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.lugar}</td>
                  </tr>
                 
                ))}
            </tbody>
        </table>
        </Container>
        </>
    )    
}