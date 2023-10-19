import React from 'react';
import BarraNav from '../nav';
import RegistroUsuario from '../RegistroUsuario';


function UsuarioBorrar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroUsuario borrar={true} />
        </>
    )
    
}
export default UsuarioBorrar;