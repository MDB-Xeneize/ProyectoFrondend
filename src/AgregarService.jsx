import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';



export class AgregarServiceClass extends Component{
    constructor(props){
        super(props)
        this.state = {
            service_proximo:'',          /*nombre es en la tabla mantenimiento*/
            fecha:'',
            observaciones:'',
            id_vehiculo:'',
            id_mantenimiento:'',
            ServicioVehiculo:[],
            registropas:''
        }
    }

    componentDidMount(){
        debugger
        // const { registrado } = this.props.registro;
        // console.log(this.props.registro.registro);
        const fechaActual = moment();
        const fechaFormateada = fechaActual.format("YYYY-MM-DD");
        this.setState({
            fecha: fechaFormateada
        });
        
        if(this.props.registro.registro!==undefined){       //Si estamos modificando setear estados con las props.registro

            this.setState({
                service_proximo:moment.utc(this.props.registro.registro.service_proximo).format('YYYY-MM-DD'),
                fecha: moment.utc(this.props.registro.registro.fecha).format('YYYY-MM-DD'),
                observaciones: this.props.registro.registro.observaciones,
                id_vehiculo:this.props.registro.registro.id_vehiculo,
                id_mantenimiento:this.props.registro.registro.id_mantenimiento
            });
        }
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }

            const url = "http://localhost:8080/api/inOut/agregar/vehiculo"; //se recicla codigo del back
            debugger
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
                    debugger
                    if (result.ok) {
                        this.setState({
                            ServicioVehiculo: result.body
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
        
    handleChange = (event) => {const { name, value } = event.target;
debugger
    // Si está manejando la fecha o service proximo
    if (name === 'fecha' || name === 'service_proximo') {
      const formattedDate = moment(value).format('YYYY-MM-DD');
      this.setState({ [name]: formattedDate });
    } else {
      this.setState({ [name]: value });
    }

    } 
    
    
     
    handleSubmit = (event) => {
        event.preventDefault()
    debugger
        let registro = {
            service_proximo:this.state.service_proximo,
            fecha: this.state.fecha,
            observaciones: this.state.observaciones,
            id_vehiculo:this.state.id_vehiculo,
            id_mantenimiento:this.state.id_mantenimiento
        }
        //paso el id_vehiculo porque hay que actualizar o crear en tabla vehiculo 
        //registro.id_vehiculo= this.props.registro.extra!==undefined ? this.props.registro.registro.id_vehiculo :null;
        //modificar o agregar
        let parametros=null;
        if(this.props.registro.extra!==undefined){
            parametros = {
                method: 'PUT',
                body: JSON.stringify(registro),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                }
            }

        }
        else{        
            parametros = {
            method: 'POST',
            body: JSON.stringify(registro),
            headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                }
            }
        }
        debugger
        const url = this.props.registro.extra!==undefined? `http://localhost:8080/api/mantenimiento/${this.props.registro.registro.id_mantenimiento}`: "http://localhost:8080/api/mantenimiento"
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
                        const notify = ()=> toast("pelarse");
                        
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
                     
                       debugger
                       this.props.useNavigateEnvuelta('/Service')

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


    render(){
    debugger
        const OptionVehiculo = this.state.ServicioVehiculo.map((vehiculo, index) => {
            return (
                
                <>
                <option key={index} value={vehiculo.id_vehiculo}>{`${vehiculo.id_vehiculo} ${vehiculo.matricula}  ${vehiculo.marca}  ${vehiculo.modelo}`}</option>
                </>
                )
            }
        )

  
        return(
            <>
            <div className='container'>
            <div className='row'>
                <div className='col'>
                {this.props.registro.extra===true ? <h1>Modificar Registro de Service</h1>:<h1>Registrar Service</h1>};
                </div>
            </div>

            <div className='row'>
                <div className='col-2'>

                </div>
                <div className='col'>

                    <form onSubmit={this.handleSubmit}>
                        <br/>
                        <div className="form-floating">
                            <input
                                type="date"
                                className="form-control"
                                id="service_proximo"
                                placeholder="DD-MM-AAAA"
                                onChange={this.handleChange}
                                value={this.state.service_proximo}
                                name='service_proximo'
                            />
                            <label htmlFor="service_proximo">Proximo Service</label>
                        </div>

                        <br />

                        <div className="form-floating">
                            <input
                                type="date"
                                className="form-control"
                                id="fecha"
                                placeholder="DD-MM-AAAA"
                                onChange={this.handleChange}
                                value={this.state.fecha}
                                name='fecha'
                            />
                            <label htmlFor="fecha">Fecha</label>
                        </div>

                        <br/>

                        <div className="form-floating">
                            <input
                                type="textarea"
                                className="form-control"
                                id="observaciones"
                                placeholder="Escriba en este campo"
                                onChange={this.handleChange}
                                value={this.state.observaciones}
                                name='observaciones'
                            />
                            <label htmlFor="observaciones">Observaciones</label>
                        </div>

                        <br />

                        <select className="form-select"
                            aria-label="Default select example"
                            id="id_vehiculo"
                            onChange={this.handleChange}
                            value={this.state.id_vehiculo}
                            name='id_vehiculo'
                        >
                        <option selected disabled>ID Vehiculo</option>
                        {OptionVehiculo}
                        </select>
              
                        <br />
                        
                        <input className='btn btn-primary'
                            type="submit"
                            value="Guardar"
                        />
                    </form>
                </div>
                <div className='col-2'>

                </div>
            </div>
        </div>

            </>
        )
    }
}

export default AgregarService;



export function AgregarService(registro,extra) {
    debugger
    const parametros = useParams();
    
    const useNavigateP = useNavigate();
    
    return (
        <>
            <AgregarServiceClass registro={registro} useNavigateEnvuelta={useNavigateP} params={parametros}/>
        </>
    );
}