import React from 'react';
import BarraNav from '../nav';
import RegistroVehiculo from '../RegistroVehiculo';
import NavOptions from '../navOptions';

function VehiculoModificar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroVehiculo extra='True' />
        <NavOptions opcion='option2'/>
        </>
    )
    
}
export default VehiculoModificar;