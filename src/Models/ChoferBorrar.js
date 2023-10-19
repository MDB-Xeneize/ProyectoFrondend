import React from 'react';
import BarraNav from '../nav';
import RegistroChofer from '../RegistroChofer';


function ChoferBorrar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroChofer borrar={true} />
        </>
    )
    
}
export default ChoferBorrar;