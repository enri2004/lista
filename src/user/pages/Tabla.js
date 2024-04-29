import React from 'react';
import './Tabla.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter}from 'reactstrap'
import QRCode from 'qrcode.react';             


const data =[
  { id: 1, Nombre: "juan diego", Apellidos: "naruto", Matricula: "20000001", QR:""},
  { id: 2, Nombre: "pepe", Apellidos: "obe punchman", Matricula: "20000002", QR:""},
  { id: 3, Nombre: "pepe chato", Apellidos: " mushucu tensei", Matricula: "20000003", QR:""},
  { id: 4, Nombre: "pablito", Apellidos: "padres de familia", Matricula: "20000004", QR:""},
  { id: 5, Nombre: "ven", Apellidos: "dargonball", Matricula: "20000005", QR:""},
]




//////////////////// CLASE DE LOS COMPONENTES DE CADA UNO DE LOS REGISTROS////////////////////////////////////

class App extends React.Component{
    state={
      data: data,
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

generarQR = (value) => {
  const expirationDate = new Date(); // Obtiene la fecha y hora actuales
  expirationDate.setMinutes(expirationDate.getMinutes() + 30); // Añade 30 minutos al tiempo actual
  const qrValue = value + '|' + expirationDate.getTime(); // Combina el valor original con la marca de tiempo de expiración
  return <QRCode value={qrValue} />; // Genera el código QR con el nuevo valor que incluye la marca de tiempo de expiración
}
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
insertar=()=>{
  var valorNuevo={...this.state.form};
  valorNuevo.id=this.state.data.length+1;
  var lista=this.state.data;
  lista.push(valorNuevo);
  this.setState({data: lista, modalInsertar: false});

}

//para editar el nuevo valor

editar=(dato)=>{
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

}
//en esta funcion se podra eliminar los datos ingresado
eliminar=(dato)=>{
  var opcion=window.confirm("Desea Eliminar estos datos"+dato.id);
  if (opcion){
    var contador=0;
    var lista = this.state.data;
    lista.map((Registro)=>{
      if(Registro.id==dato.id){
        lista.splice(contador, 1);
      }
        contador++;
    });
    this.setState({data:lista});
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////RENDERISAR NUESTRA OPCION DE INSERTAR Y DE NUESTRA TABLA GENERAL. ////////////////////////////////////////////

    render(){
  return (
  <>
      <Container >
      <div style={{left:"10px", top:"50px", position:"absolute"}}>
      <Button color='success' onClick={()=>this.mostrarModalInsertar()} style={{position:"absoluta", left:"10px", top:"10px"}} >Registrar Nuevo Alumno/a</Button>
      </div>
        <div className='tabla-contenedor'>
      <Table className='table-bordered border-dark'>

        <thead><tr className='table-warning'><th className='bg-info'>Id</th>
        <th className='bg-warning'>Nombre</th>
        <th className='bg-warning'>Apellidos</th>
        <th className='bg-warning'>Matricula</th>
        <th className='bg-warning'>QR</th>
        <th className='bg-warning'>Acciones</th></tr></thead>
        <tbody>
          {this.state.data.map((elemento)=>(
            <tr className='table-primary'>
                <td className='bg-info'>{elemento.id}</td>
                <td>{elemento.Nombre}</td>
                <td>{elemento.Apellidos}</td>
                <td>{elemento.Matricula}</td>
                <td>{this.generarQR(elemento.Matricula)}</td>


                    
                <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Modificar</Button>{" "}
                <Button color="danger"onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
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

        <ModalBody>
          <FormGroup>
            <label>QR</label>
            <input class="form-control" name='Matricula' type='text'onChange={this.handleChannge}/> 
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color= 'primary' onClick={()=>this.insertar()}>Insertar</Button>
          <Button color= 'danger'onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
        </ModalFooter>

      </Modal>

      <Modal isOpen={this.state.modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id</label>
            <input class="form-control" readOnly type='text' value={this.state.form.id}/> 
          </FormGroup>
        </ModalBody>

        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <input class="form-control" name="Nombre" type='text' onChange={this.handleChannge} value={this.state.form.Nombre}/> 
          </FormGroup>
        </ModalBody>

        <ModalBody>
          <FormGroup>
            <label>Apellidos</label>
            <input class="form-control" name='Apellidos' type='text'onChange={this.handleChannge} value={this.state.form.Apellidos}/> 
          </FormGroup>
        </ModalBody>

        <ModalBody>
          <FormGroup>
            <label>Matricula</label>
            <input class="form-control" name='Matricula' type='text'onChange={this.handleChannge} value={this.state.form.Matricula}/> 
          </FormGroup>
        </ModalBody>

        <ModalBody>
          <FormGroup>
            <label>QR</label>
            <input class="form-control" name='Matricula' type='text'onChange={this.handleChannge} value={this.state.form.Matricula}/> 
          </FormGroup>
        </ModalBody>


        <ModalFooter>
          <Button color= 'primary'onClick={()=>this.editar(this.state.form)}>Editar</Button>
          <Button color= 'danger' onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
        </ModalFooter>

      </Modal>
    </>
   
  );
}
}

  export default App;
