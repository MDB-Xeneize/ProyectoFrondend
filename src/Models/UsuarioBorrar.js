import React from 'react';
import BarraNav from '../nav';
import RegistroUsuario from '../RegistroUsuario';
import NavOptions from '../navOptions';

function UsuarioBorrar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroUsuario borrar={true} />
        <NavOptions opcion='option5'/>
        </>
    )
    
}
export default UsuarioBorrar;