import React from 'react';
import BarraNav from '../nav';
import AgregarChofer from '../AgregarChofer';
import NavOptions from '../navOptions';

function ChoferAgregar(datos){
    return(  
        <>
        <BarraNav/>
        <AgregarChofer dato={datos}/>
        <NavOptions opcion='option3'/>
        </>
        )
}
export default ChoferAgregar;