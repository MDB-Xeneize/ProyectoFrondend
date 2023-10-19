import React from 'react';
import BarraNav from '../nav';
import RegistroVehiculo from '../RegistroVehiculo';


function VehiculoModificar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroVehiculo extra='True' />
        </>
    )
    
}
export default VehiculoModificar;