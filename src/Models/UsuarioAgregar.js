import React from 'react';
import BarraNav from '../nav';
import AgregarUsuario from '../AgregarUsuario';
import NavOptions from '../navOptions';

function UsuarioAgregar(datos){
    return(
        
        <>
        <BarraNav/>
        <AgregarUsuario dato={datos}/>
        <NavOptions opcion='option5'/>
        </>
        )
}
export default UsuarioAgregar;