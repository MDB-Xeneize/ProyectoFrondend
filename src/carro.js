import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ImageCard from './imageCard';
import Barra_nav from './nav';
import thumbRegistroInOut from './images/thumbRegistroInOut.png'
import thumbRegistroVehiculos from './images/thumbRegistroVehiculos.png'
import thumbRegistroConductores from './images/thumbRegistroConductores.png'
import imagenCardRegistroINOut from './images/registroInOut.png'
import imagenCardRegistroVehiculo from './images/vehiculos.png'
import imagenCardRegistroConductor from './images/conductores.png'



class DemoCarousel extends Component {

  constructor(props) {
  
    super(props);
    this.state = {
      isHovered: false, // Estado para rastrear si el mouse está sobre el thumb
    };

  }
  
  handleMouseOver(index) {
    console.log('ok')// Cambia el estado para indicar que el mouse está sobre el thumb en el índice especificado.
   //this.setState({ hoveredThumbIndex: index });
  }
  
  handleMouseOut(){
    this.setState({isHovered: true})
    // Cuando el mouse sale de cualquier thumb, restaura el estado para indicar que no hay ningún thumb con el mouse sobre él.
   //this.setState({ hoveredThumbIndex: null });
  }
  
 
  renderThumbs(children) {
    

    // En esta función, puedes personalizar los thumbs como desees
    // children es un arreglo de las diapositivas originales
    return children.map((child, index) => (
        <div key={index} 
        className="custom-thumb "
        //onMouseOver={() => this.handleMouseOver(index)}
        // onMouseOut={() => this.handleMouseOut()} 
        >
            {/* Agrega aquí tus thumbs personalizados */}
            {index === 0 && <img src={thumbRegistroInOut} alt={`Thumb ${index}`} />}
            {index === 1 && <img src={thumbRegistroVehiculos} alt={`Thumb ${index}`} />}
            {index === 2 && <img src={thumbRegistroConductores} alt={`Thumb ${index}`} />}
        </div>
    ));
}




    render() {
    
      return (
        <>
          <Barra_nav/>
          <Carousel  renderThumbs={this.renderThumbs}>
              <div>
                <ImageCard imagen={imagenCardRegistroINOut} titulo='Registro In Out' alt='card de registro in out' />                    
              </div>
              <div>
                <ImageCard imagen={imagenCardRegistroVehiculo} titulo='Registro de Vehículos' alt='card de registro de vehiculos' />
              </div>
              <div>
                <ImageCard imagen={imagenCardRegistroConductor} titulo='Registro de Conductores' alt='card de registro de conductores' />

              </div>
          </Carousel>
          </>
      );
    }
};
export default DemoCarousel;

