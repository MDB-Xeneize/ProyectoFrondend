import React from 'react';
import BarraNav from '../nav';
import RegistroVehiculo from '../RegistroVehiculo';


function VehiculoBorrar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroVehiculo borrar={true} />
        </>
    )
    
}
export default VehiculoBorrar;