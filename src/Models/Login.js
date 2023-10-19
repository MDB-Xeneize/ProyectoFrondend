import React from 'react';
import BarraNav from '../nav';
import Logeo from '../form_log';

function Login() {

  const tokenG = sessionStorage.getItem('token');
  let sinmenu =false;
  let sinusuario = false;
  if (tokenG !== "" && tokenG !== null) {
    sinmenu=true;
    sinusuario=true;
  }
    return (
      <>

      
      <BarraNav sinmenu={sinmenu} sinusuario={sinusuario}/>

      <Logeo/>
      

     </>
   );
  }

export default Login;