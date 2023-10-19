import React, { Component } from 'react';





class ImageCard extends Component {
  // // constructor(props){
  //   super(props)
  // };

  handleMouseOver(index) {
    // console.log('ok')// Cambia el estado para indicar que el mouse está sobre el thumb en el índice especificado.
    //this.setState({ hoveredThumbIndex: index });
  }

  handleMouseOut() {
    // this.setState({ isHovered: true })
    // Cuando el mouse sale de cualquier thumb, restaura el estado para indicar que no hay ningún thumb con el mouse sobre él.
    //this.setState({ hoveredThumbIndex: null });
  }

  render() {
    debugger
    const { imagen, titulo, options , alt } = this.props;
    const listItems = Object.entries(options).map(([text, link]) => (
    <a href={link} className="list-group-item list-group-item-action ">
      <i >
        {text} 
       
      </i>
    </a>
    ));
    
   return (


      <div className="container">
        <div className='row'>
          <div className="col-1 ">
          </div>

          <div className="col-4 ">
            <div className="card mb-5">
              <div className="card-body  menu">
                <img src={imagen} className="d-block w-100" alt={alt} />
                <h5 className="card-title"><i>{titulo}</i></h5>
                <p className="card-text"></p>

                <div className='franja'>

                </div>
              </div>
            </div>
          </div>

          <div className='col-2'>
          </div>

          <div className='col-4'>

            <ul class="list-group" >
              
            { listItems }

            </ul>
          </div>
        </div>
      </div>



    )
  }
}
export default ImageCard;