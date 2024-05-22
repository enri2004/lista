import React from 'react';
import '../css/Tabla.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter}from 'reactstrap'
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react';   
          
import Axios from '../../servers/Axios';

//const URL='https://api-rest-htj4.onrender.com/alumnos';
const URL='https://api-rest-htj4.onrender.com/alumnos'
//////////////////// CLASE DE LOS COMPONENTES DE CADA UNO DE LOS REGISTROS////////////////////////////////////

class App extends React.Component{
  state={
      data:[],
      filteredData: [],
      form:{
        id:'',
        Nombre:'',
        Apellidos:'',
        Matricula:'',
        QR:'',
      },
      modalInsertar: false,
      modalEditar: false,   

    
    }
    
    peticionGet = () => {
      Axios.get(URL).then(response => {
        this.setState({ data: response.data }, () => {
          this.filtrarAlumnos();
        });
      });
    }

componentDidMount(){
  this.peticionGet();
}


filtrarAlumnos = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.error('No se encontró ningún token de acceso en el almacenamiento local');
      return;
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    const response = await Axios.get("/Id_maestro", config);
    const id_maestro = response.data.id_maestro;

    const { data } = this.state;
    const filteredData = data.filter(alumno => alumno.Id_maestro === id_maestro);

    this.setState({ filteredData });
  } catch(error) {
    console.error("Error al filtrar los alumnos:", error);
  }
};

    /////////////SELECCION DE LOS DATOS A EVALUAR//////////////////////  
   
    handleChannge=e=>
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////  FUNCIONES DE LOS MODALS DE AGREGAR Y EDITAR /////////////////////////////////////


mostrarModalInsertar=()=>{
  this.setState({modalInsertar: true});
}

ocultarModalInsertar=()=>{
  this.setState({modalInsertar: false});
}

mostrarModalEditar=(Registro)=>{
  this.setState({modalEditar: true, form: Registro});
}

ocultarModalEditar=()=>{
  this.setState({modalEditar: false});
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////  FUNCIONES LOS BOTONES/////////////////////


//para guardar el nuevo valor que se agregara y actualizar lista
insertar= async()=>{
  var valorNuevo={...this.state.form};
  valorNuevo.id=this.state.data.length+1;
  var lista=this.state.data;
  lista.push(valorNuevo);
  this.setState({data: lista, modalInsertar: false});
  console.log(valorNuevo);
  try{
    //await axios.post("https://api-rest-htj4.onrender.com/api/registrar", valorNuevo);
    await Axios.post("/registrar/alumnos", valorNuevo);
    console.log("se enviaron los datos")
  }catch(error){
    console.error("no se pudo enviar")
  }
}
insertar = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.error('No se encontró ningún token de acceso en el almacenamiento local');
      return;
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    const response = await Axios.get("/obtener", config);
    
    if (response.data && response.data.Id_maestro) {
      const Id_maestro = response.data.Id_maestro;
      const alumnosDelMaestro = this.state.data.filter(alumno => alumno.Id_maestro === Id_maestro);
      const ultimoId = alumnosDelMaestro.length > 0 ? Math.max(...alumnosDelMaestro.map(alumno => parseInt(alumno.id))) : 0;

      const valorNuevo = {
        ...this.state.form,
        Id_maestro: Id_maestro,
        id: ultimoId + 1
      };

      const responseInsertar = await Axios.post('/registrar/alumnos', valorNuevo);
      const nuevoAlumno = responseInsertar.data;

      this.setState(prevState => ({
        data: [...prevState.data, nuevoAlumno],
        modalInsertar: false
      }), () => {
        console.log('Se ha insertado el nuevo alumno:', nuevoAlumno);
        Swal.fire({
          icon: 'success',
          title: 'se ha isertado  un alumno nuevo',
          text: 'El alumno ha sido registrado exitosamente'
        });
        this.filtrarAlumnos();
      });
        } else {
      console.error('No se obtuvieron datos del usuario o el Id_maestro es nulo');
    }
  } catch (error) {
    console.error('Error al insertar:', error);
  }
};



//para editar el nuevo valor

editar=async(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].Nombre=dato.Nombre;
        lista[contador].Apellidos=dato.Apellidos;
        lista[contador].Matricula=dato.Matricula;
        lista[contador].QR=dato.QR;
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false});

    try{
      const _id=dato._id;
      await Axios.patch(`/alumnos/editar/${_id}`,dato)
      Swal.fire({
        icon: 'success',
        title: 'Modificacion',
        text: 'los datos ha sido Modificado exitosamente'
      });
      this.filtrarAlumnos();
    }catch(error){
      console.error("no se puede entrar",error);
    }


}

eliminar = async (_id) => {
  // Confirmación con SweetAlert2
  const confirmacion = await Swal.fire({
    title: '¿Seguro que quieres eliminar?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar'
  });

  // Si el usuario confirma la eliminación
  if (confirmacion.isConfirmed) {
    try {
      await Axios.delete(`/alumnos/eliminar/${_id}`);
      // Eliminar el elemento de la lista en el estado
      this.setState(prevState => ({
        data: prevState.data.filter(item => item._id !== _id)
      }), () => {
        console.log("Se ha eliminado el elemento con id:", _id);
        // Después de eliminar el registro, mostrar un mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El registro ha sido eliminado exitosamente'
        });
        // Después de eliminar el registro, actualizamos los datos filtrados
        this.filtrarAlumnos();
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al eliminar'
      });
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////RENDERISAR NUESTRA OPCION DE INSERTAR Y DE NUESTRA TABLA GENERAL. ////////////////////////////////////////////

    render(){
  return (
  <>
      <Container >
        <div style={{ left: "10px", top: "50px", position: "absolute", width:"250px", height:"150px" }}>
          <Button color='success' onClick={() => this.mostrarModalInsertar()} style={{ position: "absolute", left: "10px", top: "10px" }}>Registrar Nuevo Alumno/a</Button>
        </div>
        
        <div className='tabla-contenedor'>
        
          <Table style={{position:'absolute', top:'100px'}} className='table-bordered border-light'>
          
          <thead><tr >
                <th class="bg-primary p-2 text-white bg-opacity-75">Id</th>
                <th class="bg-primary p-2 text-white bg-opacity-75">Nombre</th>
                <th class="bg-primary p-2 text-white bg-opacity-75">Apellidos</th>
                <th class="bg-primary p-2 text-white bg-opacity-75">Matricula</th>
                <th class="bg-primary p-2 text-white bg-opacity-75">QR</th>
                <th class="bg-primary p-2 text-white bg-opacity-75">Acciones</th>
              </tr>
              
            </thead>
            
            <tbody>
              {this.state.filteredData.map((elemento) => (
                <tr key={elemento.id}>
                  <td class="bg-primary p-2 text-dark bg-opacity-25">{elemento.id}</td>
                  <td class="bg-primary p-2 text-dark bg-opacity-10">{elemento.Nombre}</td>
                  <td class="bg-primary p-2 text-dark bg-opacity-10">{elemento.Apellidos}</td>
                  <td class="bg-primary p-2 text-dark bg-opacity-10">{elemento.Matricula}</td>
                  <td class="bg-primary p-2 text-dark bg-opacity-10"><QRCode value={elemento.Matricula} /></td>
                  <td class="bg-primary p-2 text-dark bg-opacity-10">
                    <Button color="primary" onClick={() => this.mostrarModalEditar(elemento)}>Modificar</Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(elemento._id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </Table>
         
        </div>

      </Container>

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Ingresar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id</label>
            <input class="form-cclassontrol" readOnly type='text' value={this.state.data.length+1}/> 
          </FormGroup>
        </ModalBody>

        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <input class="form-control" name="Nombre" type='text' onChange={this.handleChannge}/> 
          </FormGroup>
        </ModalBody>

        <ModalBody>
          <FormGroup>
            <label>Apellidos</label>
            <input class="form-control" name='Apellidos' type='text'onChange={this.handleChannge}/> 
          </FormGroup>
        </ModalBody>

        <ModalBody>
          <FormGroup>
            <label>Matricula</label>
            <input class="form-control" name='Matricula' type='text'onChange={this.handleChannge}/> 
          </FormGroup>
        </ModalBody>


        <ModalFooter>
          <Button color= 'primary' onClick={()=>this.insertar()}>Insertar</Button>
          <Button color= 'danger'onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
        </ModalFooter>

      </Modal>

      <Modal isOpen={this.state.modalEditar} >
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id</label>
            <input class="form-control" readOnly type='text' value={this.state.form.id}
            /> 
          </FormGroup>
        </ModalBody>

        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <input class="form-control" name="Nombre" type='text' onChange={this.handleChannge} value={this.state.form.Nombre}
            /> 
          </FormGroup>
        </ModalBody>
          
        <ModalBody>
          <FormGroup>
            <label>Apellidos</label>
            <input class="form-control" name='Apellidos' type='text'onChange={this.handleChannge} value={this.state.form.Apellidos}
            /> 
          </FormGroup>
        </ModalBody>


        <ModalBody>
          <FormGroup>
            <label>Matricula</label>
            <input class="form-control" name='Matricula' type='text'onChange={this.handleChannge} value={this.state.form.Matricula}
            /> 
          </FormGroup>
        </ModalBody>



        <ModalFooter>
          <Button color= 'primary' onClick={()=>this.editar(this.state.form)}>Editar</Button>
          <Button color= 'danger' onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
        </ModalFooter>

      </Modal>

    </>
   
  );
}
}

  export default App;
