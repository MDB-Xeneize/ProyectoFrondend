import React from 'react';
import BarraNav from '../nav';
import RegistroInOut from '../RegistroInOut';


function InOutBorrar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroInOut borrar={true} />
        </>
    )
    
}
export default InOutBorrar;