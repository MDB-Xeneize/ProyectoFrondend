import React from 'react';
import BarraNav from '../nav';
import AgregarVehiculo from '../AgregarVehiculo';

function VehiculoAgregar(datos){
    debugger
    return(
        
        <>
        <BarraNav/>
        <AgregarVehiculo dato={datos}/>
        </>
        )
}
export default VehiculoAgregar;