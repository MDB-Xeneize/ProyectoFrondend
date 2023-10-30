import React from 'react';
import BarraNav from '../nav';
import RegistroVehiculo from '../RegistroVehiculo';
import NavOptions from '../navOptions';

function VehiculoBorrar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroVehiculo borrar={true} />
        <NavOptions opcion='option2'/>
        </>
    )
    
}
export default VehiculoBorrar;