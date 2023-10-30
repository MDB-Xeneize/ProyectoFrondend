import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import AgregarVehiculo from './AgregarVehiculo';




export class RegistroVehiculoClass extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            Vehiculo: [],
            InfoAdicional: false,
            id_vehiculo_info:0,
            registroSelect:null,
            redireccion:false,
            modales:false,
            seleccion:''
        }

    }

    componentDidMount() {
       
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }  
        const url = "http://localhost:8080/api/vehiculo";
        fetch(url,parametros)
            .then(res => {
                
                return res.json()
                    .then(body => {

                        return {
                            status: res.status,
                            ok: res.ok,
                            headers: res.headers,
                            body: body
                        };
                    })
            }).then(

                result => {
                    if (result.ok) {
                        this.setState({
                            Vehiculo: result.body
                        });
                    } else {
                        toast.error(result.body.message, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            ).catch(
                (error) => { console.log(error) }
            );
    }
    
    
    renderInfo(registro,index){
        if(this.state.redireccion){    
            if(this.state.registroSelect.id_vehiculo===registro.id_vehiculo){       
                return(
                    <>
                        <tr key={index}  >
                            <td>{registro.id_vehiculo}</td>
                            <td>{registro.matricula}</td>
                            <td>{registro.marca}</td> 
                            <td>{registro.modelo}</td>                    
                            <td>{registro.ano}</td>
                            <td>{registro.tara}</td>
                            <td>{registro.carga_maxima}</td>
                            <td>

                                {(this.props.extra===true)?
                                (<Link to='' className='btn btn-warning' onClick={() => this.handleClickModificar(registro)}>
                                    <span class="material-symbols-outlined">Modificar</span>
                                </Link>):null
                                }
                                
                            </td>
                        </tr>

 
                    </>      
                )
            }
            else{
                return(null)
            }
        }
        else{
            return(
                <>
                    <tr key={index}  >
                        <td>{registro.id_vehiculo}</td>
                        <td>{registro.matricula}</td>
                        <td>{registro.marca}</td> 
                        <td>{registro.modelo}</td>                    
                        <td>{registro.ano}</td>
                        <td>{registro.tara}</td>
                        <td>{registro.carga_maxima}</td>
                        <td>
                            {(this.props.borrar===undefined||this.state.seleccion!=='')?null: 
                                    <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"onClick={() => this.handleClickSwitch(registro)}/>
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Eliminar</label>
                                    </div>

                            }
                            {(this.props.extra==='True')?
                            (<Link to='' className='btn btn-warning' onClick={() => this.handleClickModificar(registro)}>
                                <span class="material-symbols-outlined">Modificar</span>
                            </Link>):null
                            }
                            {(this.props.borrar===true&&this.state.seleccion===registro.id_vehiculo)?
                            (<Link to='' className='btn btn-danger' onClick={() => this.handleClickBorrar(registro)}>
                                <span className="material-symbols-outlined">Eliminar</span>
                            </Link>):null
                            }
                             {(this.props.borrar===true&&this.state.seleccion===registro.id_vehiculo)?
                            (<Link to='' className='btn btn-success' onClick={() => this.handleClickSwitch(registro)}>
                                <span className="material-symbols-outlined">Cancelar</span>
                            </Link>):null
                            }
                            
                        </td>
                        {/* <td>                                                
                        </td> */}
                    </tr>                
                </>
            )
        }
    }
 

    handleClickModificar(registro){
       
        this.setState({redireccion:true , registroSelect: registro});
 //Estado modificar o informar
    }
    
    
    handleClickSwitch(registro){
       
        var seleccion = this.state.seleccion ; // Copia el objeto seleccion del estado

        if (seleccion!==''&& seleccion===registro.id_vehiculo) {
          // Si la clave ya existe en seleccion, la eliminamos
          seleccion='';
        } else {
          // Si la clave no existe, la agregamos
          seleccion = registro.id_vehiculo;
        }
      
        // Actualizamos el estado con la nueva selección
        this.setState({ seleccion });
    
    }

    handleClickBorrar(registro){
        
 

    let parametros = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': sessionStorage.getItem('token')
        }
    }  
 
   
 const url = `http://localhost:8080/api/vehiculo/${registro.id_vehiculo}`;
 fetch(url, parametros)
     .then(res => {
        
         return res.json()
             .then(body => {

                 return {
                     status: res.status,
                     ok: res.ok,
                     headers: res.headers,
                     body: body
                 };
             })
     }).then(

        result => {
            
            if (result.ok) {
                toast.success(result.body.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
               
                this.componentDidMount();
            }else {
                 toast.error(result.body.message, {
                     position: "bottom-center",
                     autoClose: 5000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                     theme: "light",
                 });
             }
             
         }
     ).catch(
         (error) => { console.log(error) }
     );
        
    }


    render(){
        
      
   
        const Fila = this.state.Vehiculo.map((registro, index) => {
            return (
                <>
                    {this.renderInfo(registro,index)}
                </>
            )

        });
        const Form = this.state.redireccion ? (<AgregarVehiculo registro={this.state.registroSelect} extra={true} />):(null) ;  
// Renderizo la tabla y el formulario para modificar
        

        return (
            <>
            <div className='container bottom'>
            <div className='row'>
                <div className='col'>
                    {this.props.borrar===true ? <h3>Eliminar Vehiculo</h3>:<h3>Registro de Vehiculo</h3>};
                </div>
            </div>
                <div className='row'>
                    <div className='col'>
                        
                            <table className="table table-striped table-hover">
                           
                                <thead>
                                    <tr>
                                        <th>
                                            Id_Vehiculo
                                        </th>
                                        <th>
                                            Matricula
                                        </th>
                                        <th>
                                            Marca
                                        </th>
                                        <th>
                                            Modelo
                                        </th>
                                        <th>
                                            Año
                                        </th>
                                        <th>
                                            Tara
                                        </th>
                                        <th colSpan={2}>
                                            Carga Maxima
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {Fila}

                                </tbody>
                                

                            </table>
                        
                        {Form}
                    </div>
                </div>

            </div>
            </>
        );
    }
}

export default RegistroVehiculo;


export function RegistroVehiculo({extra,borrar}) {
    const parametros = useParams();
    const useNavigateP = useNavigate();
    return (
        <>
            <RegistroVehiculoClass extra={extra} borrar={borrar} useNavigateEnvuelto={useNavigateP} params={parametros} />
        </>
    );
}


  
