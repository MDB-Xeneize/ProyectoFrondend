
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ImageCard from '../imageCard';
import BarraNav from '../nav';


import thumbRegistroInOut from '../images/thumbRegistroInOutX.png'
import thumbRegistroVehiculos from '../images/thumbRegistroCamion.png'
import thumbRegistroConductores from '../images/thumbRegistroChofer.png'
import thumbRegistroUsuarios from '../images/thumbRegistrousuarios.png'
import thumbRegistroMantenimiento from '../images/thumbRegistromantenimiento.png'

import imagenCardRegistroINOut from '../images/registroInOut.png'
import imagenCardRegistroVehiculo from '../images/registrocamion.png'
import imagenCardRegistroConductor from '../images/RegistroChofer.png'
import imagenCardRegistroUsuario from '../images/registrousuarios.png'
import imagenCardRegistroMantenimiento from '../images/registromantenimiento.png'

import iconoAgregar from '../images/iconoAgregar.png'
import iconoModificar from '../images/iconoModificar.png'
import iconoEliminar from '../images/iconoEliminar.png'
import iconoListar from '../images/iconoListar.png'

class DemoCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      token:'' 
    };

  }
  componentDidMount() {
    debugger
    const tokenG = sessionStorage.getItem('token');
    if (tokenG !== this.state.token) {
      this.setState({ token: tokenG });
    }
  }

  handleMouseOver(index) {
    // Cambia el estado para indicar que el mouse está sobre el thumb en el índice especificado.
    //this.setState({ hoveredThumbIndex: index });
  }

  handleMouseOut() {
    this.setState({ isHovered: true })
    // Cuando el mouse sale de cualquier thumb, restaura el estado para indicar que no hay ningún thumb con el mouse sobre él.
    //this.setState({ hoveredThumbIndex: null });
  }


  renderThumbs(children) {


    // En esta función, puedes personalizar los thumbs como desees
    // children es un arreglo de las diapositivas originales
    return children.map((child, index) => (
      <div key={index}
        className="custom-thumb thumbero"
      //onMouseOver={() => this.handleMouseOver(index)}
      // onMouseOut={() => this.handleMouseOut()} 
      >
        {/* Agrega aquí tus thumbs personalizados */}
        {index === 0 && <img src={thumbRegistroInOut} alt={`Thumb ${index}`} />}
        {index === 1 && <img src={thumbRegistroVehiculos} alt={`Thumb ${index}`} />}
        {index === 2 && <img src={thumbRegistroConductores} alt={`Thumb ${index}`} />}
        {index === 3 && <img src={thumbRegistroMantenimiento} alt={`Thumb ${index}`} />}
        {index === 4 && <img src={thumbRegistroUsuarios} alt={`Thumb ${index}`} />}
      </div>
    ));
  }




  render() {
  
    const options1 =  objetoOpciones('InOut');

    const options2 = objetoOpciones('Vehiculo');
 
    const options3 = objetoOpciones('Chofer');

    const options4 = objetoOpciones('Service');

    const options5 = objetoOpciones('Usuario');

    function objetoOpciones(tabla){
    if (sessionStorage.getItem('permisos') === '1') {
      return {
        'Listar': {url:`http://localhost:3000/${tabla}`,icono:iconoListar},
      };
    } else if (sessionStorage.getItem('permisos') === '2') {
     return {
        'Listar': {url:`http://localhost:3000/${tabla}`,icono:iconoListar},
        'Agregar': {url:`http://localhost:3000/${tabla}Agregar `,icono:iconoAgregar},
        'Modificar': {url:`http://localhost:3000/${tabla}Modificar`,icono:iconoModificar},
        
      };
    } else if (sessionStorage.getItem('permisos') === '3') {
      return  {
        'Listar': {url:`http://localhost:3000/${tabla}`,icono:iconoListar},
        'Agregar': {url:`http://localhost:3000/${tabla}Agregar `,icono:iconoAgregar},
        'Modificar': {url:`http://localhost:3000/${tabla}Modificar`,icono:iconoModificar},
        'Eliminar': {url:`http://localhost:3000/${tabla}Borrar`,icono:iconoEliminar},
      };
    } else {
      return  null; // Otra condición si es necesario
    }

  }

    return (
      < >

        <BarraNav />
          <Carousel renderThumbs={this.renderThumbs}>
            <div className='col'>
              <ImageCard 
                imagen={imagenCardRegistroINOut}
                titulo='Registro In Out'
                options={options1}
              />
            </div>

            <div className='col'>
              <ImageCard imagen={imagenCardRegistroVehiculo}
                titulo='Registro de Vehículos'
                options={options2}
              />
            </div>
            <div className='col'>
              <ImageCard imagen={imagenCardRegistroConductor}
                titulo='Registro de Conductores'
                options={options3}
              />
            </div>
            <div className='col'>
              <ImageCard imagen={imagenCardRegistroMantenimiento}
                titulo='Registro de Mantenimientos'
                options={options4}
              />
            </div>
            <div className='col'>
              <ImageCard imagen={imagenCardRegistroUsuario}
                titulo='Registro de Usuarios'
                options={options5}
              />
            </div>
          </Carousel>

       
      </>
    );
  }
};
export default DemoCarousel;

