import React from 'react';
import foto1 from './images/basculaalemin.png'
import foto2 from './images/basculaalemout.png'
import foto3 from './images/basculasanjose.png'

function Carrusel() {
    return (
        
        
        <div className="container">
        <div className='row'>
            <div className='col-3'>

            </div>
            <div className='col-6'>
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={foto1} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={foto2} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={foto3} className="d-block w-100" alt="..." />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
    );
}



export default Carrusel;