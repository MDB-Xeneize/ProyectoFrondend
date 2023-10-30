import React from 'react';
import BarraNav from '../nav';
import RegistroVehiculo from '../RegistroVehiculo';
import NavOptions from '../navOptions';

function Vehículo(){
    
    return(
        <>
        <BarraNav/>
        <RegistroVehiculo/>
        <NavOptions opcion='option2'/>
        </>
    )
    
}
export default Vehículo;