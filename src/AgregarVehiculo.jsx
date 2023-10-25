import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';



export class AgregarVehiculoClass extends Component{
    constructor(props){
        super(props)
        this.state = {
            matricula:'',          /*nombre es en la tabla tipo_viaje como se llama a entrada o salida*/
            marca:'',
            modelo:'',
            ano:'',
            tara:'',
            caraga_maxima:'',
            id_vehiculo:'',
            Vehiculo:[],
            registropas:''
        }
    }

    componentDidMount(){
        debugger
        // const { registrado } = this.props.registro;
        // console.log(this.props.registro.registro);
        // const fechaActual = moment();
        // const fechaFormateada = fechaActual.format("YYYY-MM-DD");
        // this.setState({
        //     fecha: fechaFormateada
        // });
        if(this.props.registro.registro!==undefined){

            this.setState({
                matricula:this.props.registro.registro.matricula,
                marca: this.props.registro.registro.marca,
                modelo:this.props.registro.registro.modelo,
                ano:this.props.registro.registro.ano,
                tara:this.props.registro.registro.tara,
                carga_maxima:this.props.registro.registro.carga_maxima,
                id_chofer:this.props.registro.registro.id_chofer
                //fecha_nacimiento: moment.utc(this.props.registro.registro.fecha).format('YYYY-MM-DD'),
               
            });
        }
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
                        debugger
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
    // Si estás manejando la fecha, puedes formatearla antes de actualizar el estado
    // if (name === 'fecha') {
    //   const formattedDate = moment(value).format('YYYY-MM-DD');
    //   this.setState({ [name]: formattedDate });
    // } else {
      this.setState({ [name]: value });
    //}

        // this.setState({ [event.target.name]: event.target.value });
    } 
    
    
     
    handleSubmit = (event) => {
        event.preventDefault()
        debugger
        let registro = {
            matricula: this.state.matricula,
            marca: this.state.marca,
            modelo:this.state.modelo,
            ano: this.state.ano,   
            tara: this.state.tara, 
            carga_maxima: this.state.carga_maxima,       
            id_vehiculo:this.state.id_vehiculo
        }
        //Es Modificar o Agregar?
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
        const url = this.props.registro.extra!==undefined? `http://localhost:8080/api/vehiculo/${this.props.registro.registro.id_vehiculo}`: "http://localhost:8080/api/vehiculo"
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
                       this.props.useNavigateEnvuelta('/Vehiculo')

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
        // const OptionChofer = this.state.InOutChofer.map((chofer, index) => {
        //     return (
                
        //         <>
        //         <option key={index} value={chofer.id_chofer}>{`${chofer.id_chofer} ${chofer.dni} ${chofer.apellido}  ${chofer.nombre}`}</option>
        //         </>
        //         )
        //     }
        // )

        // const OptionVehiculo = this.state.InOutVehiculo.map((vehiculo, index) => {
        //     return (
                
        //         <>
        //         <option key={index} value={vehiculo.id_vehiculo}>{`${vehiculo.id_vehiculo} ${vehiculo.matricula}  ${vehiculo.marca}  ${vehiculo.modelo}`}</option>
        //         </>
        //         )
        //     }
        // )

  
        return(
            <>
            <div className='container'>
            <div className='row'>
                <div className='col'>
                {this.props.registro.extra===true ? <h1>Modificar Registro de Vehículo</h1>:<h1>Registrar Vehículo</h1>};
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
                                type="text"
                                className="form-control"
                                id="matricula"
                                placeholder="Matricula"
                                onChange={this.handleChange}
                                value={this.state.matricula}
                                name='matricula'
                            />
                            <label htmlFor="matricula">Matricula</label>
                        </div>

                        <br />

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="marca"
                                placeholder="Marca"
                                onChange={this.handleChange}
                                value={this.state.marca}
                                name='marca'
                            />
                            <label htmlFor="marca">Marca</label>
                        </div>

                        <br />

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="modelo"
                                placeholder="Modelo"
                                onChange={this.handleChange}
                                value={this.state.modelo}
                                name='modelo'
                            />
                            <label htmlFor="modelo">Modelo</label>
                        </div>

                        <br />

                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control"
                                id="ano"
                                placeholder="Año"
                                onChange={this.handleChange}
                                value={this.state.ano}
                                name='ano'
                            />
                            <label htmlFor="ano">Año</label>
                        </div>

                        <br />

                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control"
                                id="tara"
                                placeholder="Tara"
                                onChange={this.handleChange}
                                value={this.state.tara}
                                name='tara'
                            />
                            <label htmlFor="tara">Tara Kg</label>
                        </div>

                        <br />

                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control"
                                id="carga_maxima"
                                placeholder="carga_maxima"
                                onChange={this.handleChange}
                                value={this.state.carga_maxima}
                                name='carga_maxima'
                            />
                            <label htmlFor="carga_maxima">Capacidad Maxima Kg</label>
                        </div>
                        
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

export default AgregarVehiculo;



export function AgregarVehiculo(registro,extra) {
    debugger
    const parametros = useParams();
    
    const useNavigateP = useNavigate();
    
    return (
        <>
            <AgregarVehiculoClass registro={registro} useNavigateEnvuelta={useNavigateP} params={parametros}/>
        </>
    );
}