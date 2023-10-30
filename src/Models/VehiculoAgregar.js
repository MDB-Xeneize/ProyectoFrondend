import React from 'react';
import BarraNav from '../nav';
import AgregarVehiculo from '../AgregarVehiculo';
import NavOptions from '../navOptions';

function VehiculoAgregar(datos){
    return(
        
        <>
        <BarraNav/>
        <AgregarVehiculo dato={datos}/>
        <NavOptions opcion='option2'/>
        </>
        )
}
export default VehiculoAgregar;