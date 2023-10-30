
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
      // isHovered: false,
      token:'' 
    };

  }
  componentDidMount() {
    const tokenG = sessionStorage.getItem('token');
    if (tokenG !== this.state.token) {
      this.setState({ token: tokenG });
    }
  }

  renderThumbs(children) {


 
    return children.map((child, index) => (
      <div key={index}
        className="custom-thumb"

      >
        {index === 0 && <img src={thumbRegistroInOut} className="thumbsCarro" alt={`Thumb ${index}`} />}
        {index === 1 && <img src={thumbRegistroVehiculos} className="thumbsCarro" alt={`Thumb ${index}`} />}
        {index === 2 && <img src={thumbRegistroConductores} className="thumbsCarro" alt={`Thumb ${index}`} />}
        {index === 3 && <img src={thumbRegistroMantenimiento} className="thumbsCarro" alt={`Thumb ${index}`} />}
        {index === 4 && <img src={thumbRegistroUsuarios} className="thumbsCarro" alt={`Thumb ${index}`} />}
      </div>
    ));
  }

  render() {
  
    const options1 =  objetoOpciones('InOut');

    const options2 = objetoOpciones('Vehiculo');
 
    const options3 = objetoOpciones('Chofer');

    const options4 = objetoOpciones('Service');

    const options5 = objetoOpciones('Usuario');

    sessionStorage.setItem('option1', JSON.stringify(options1));
    sessionStorage.setItem('option2', JSON.stringify(options2));
    sessionStorage.setItem('option3', JSON.stringify(options3));
    sessionStorage.setItem('option4', JSON.stringify(options4));
    sessionStorage.setItem('option5', JSON.stringify(options5));

    function objetoOpciones(tabla){
    if (sessionStorage.getItem('permisos') === '1') {
      return {
        'Listar': {url:`http://localhost:3000/${tabla}`,icono:iconoListar,color:"beige"},
      };
    } else if (sessionStorage.getItem('permisos') === '2') {
     return {
        'Listar': {url:`http://localhost:3000/${tabla}`,icono:iconoListar,color:"beige"},
        'Agregar': {url:`http://localhost:3000/${tabla}Agregar `,icono:iconoAgregar,color: "rgb(244, 244, 101)"},
        'Modificar': {url:`http://localhost:3000/${tabla}Modificar`,icono:iconoModificar,color:"rgb(195, 224, 123)"},
        
      };
    } else if (sessionStorage.getItem('permisos') === '3') {
      return  {
        'Listar': {url:`http://localhost:3000/${tabla}`,icono:iconoListar,color:"beige"},
        'Agregar': {url:`http://localhost:3000/${tabla}Agregar `,icono:iconoAgregar,color: "rgb(244, 244, 101)"},
        'Modificar': {url:`http://localhost:3000/${tabla}Modificar`,icono:iconoModificar,color:"rgb(195, 224, 123)"},
        'Eliminar': {url:`http://localhost:3000/${tabla}Borrar`,icono:iconoEliminar,color: "rgb(224, 146, 123)"},
      };
    } else {
      return  null; // Otra condición si es necesario
    }
  
  }

    return (
      < >
        
       
        <div className='botom'>
          
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

          </div>

      </>
    );
  }
};
export default DemoCarousel;

