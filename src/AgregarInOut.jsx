import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';



export class AgregarInOutClass extends Component{
    constructor(props){
        super(props)
        this.state = {
            nombre:'Entrada',          /*nombre es en la tabla tipo_viaje como se llama a entrada o salida*/
            fecha:'',
            hora:'',
            origen:'Centro de Logistica',
            destino:'',
            carga:'',
            peso_total:'',
            id_chofer:'',
            id_vehiculo:'',
            InOutChofer:[],
            InOutVehiculo:[],
            registropas:''
        }
    }

    componentDidMount(){
        debugger
        // const { registrado } = this.props.registro;
        // console.log(this.props.registro.registro);
        const fechaActual = moment();
        const fechaFormateada = fechaActual.format("YYYY-MM-DD");
        const horaActual = fechaActual.format("HH:mm:ss");
        this.setState({
            fecha: fechaFormateada,
            hora: horaActual
        });
        if(this.props.registro.registro!==undefined){ //Si estamos modificando seteamos primero con las props.registro

            this.setState({
                nombre:this.props.registro.registro.nombre,
                //moment.utc(registro.fecha).format('MM/DD/YYYY')
                fecha: moment.utc(this.props.registro.registro.fecha).format('YYYY-MM-DD'),
                hora: this.props.registro.registro.hora,
                origen:this.props.registro.registro.origen,
                destino:this.props.registro.registro.destino,
                carga:this.props.registro.registro.carga,
                peso_total:this.props.registro.registro.peso_total,
                id_chofer:this.props.registro.registro.id_chofer,
                id_vehiculo:this.props.registro.registro.id_vehiculo,
            });
        }

        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }
        const url1 = "http://localhost:8080/api/inOut/agregar/chofer";
        fetch(url1,parametros)
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
                            InOutChofer: result.body
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

            const url2 = "http://localhost:8080/api/inOut/agregar/vehiculo";
            debugger
        fetch(url2,parametros)

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
                            InOutVehiculo: result.body
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
    // Si está  manejando la fecha se formatea antes de actualizar el estado
    if (name === 'fecha') {
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
            fecha: this.state.fecha,
            hora: this.state.hora,
            origen: this.state.origen,
            destino: this.state.destino,
            carga: this.state.carga,
            peso_total:this.state.peso_total,
            id_chofer:this.state.id_chofer,
            id_vehiculo:this.state.id_vehiculo,
            nombre:this.state.nombre,
            nickname:sessionStorage.getItem('nickname')
        }
        //paso el registro.id_tipo por si hay que actualizar o null si hay que crear en tabla tipo_viaje y viaje
        registro.id_tipo= this.props.registro.extra!==undefined ? this.props.registro.registro.id_tipo :null;
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
        const url = this.props.registro.extra!==undefined? `http://localhost:8080/api/inOut/${this.props.registro.registro.id_viaje}`: "http://localhost:8080/api/inOut"
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
                       // this.props.history.push('/InOut');
                       debugger
                       this.props.useNavigateEnvuelta('/InOut')

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
        const OptionChofer = this.state.InOutChofer.map((chofer, index) => {
            return (
                
                <>
                <option key={index} value={chofer.id_chofer}>{`${chofer.id_chofer} ${chofer.dni} ${chofer.apellido}  ${chofer.nombre}`}</option>
                </>
                )
            }
        )

        const OptionVehiculo = this.state.InOutVehiculo.map((vehiculo, index) => {
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
                    <h1>Registrar Ingreso o Egreso</h1>
                </div>
            </div>

            <div className='row'>
                <div className='col-2'>

                </div>
                <div className='col'>

                    <form onSubmit={this.handleSubmit}>
                        <br/>
                        <select className="form-select"
                            id="nombre"
                            aria-label="Default select example"
                            onChange={this.handleChange}
                            value={this.state.nombre}
                            name='nombre'
                        >
                            <option selected disabled>Ingreso o Egreso</option>
                            <option value="Entrada">Entrada</option>
                            <option value="Salida">Salida</option>
                        </select>
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
                                type="text"
                                className="form-control"
                                id="hora"
                                placeholder="12:00:00"
                                onChange={this.handleChange}
                                value={this.state.hora}
                                name='hora'
                            />
                            <label htmlFor="hora">Hora</label>
                        </div>
                        <br />

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="origen"
                                placeholder="origen"
                                onChange={this.handleChange}
                                value={this.state.origen}
                                name='origen'
                            />

                            <label htmlFor="origen">Origen</label>
                        </div>
                        <br />


                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="destino"
                                placeholder="destino"
                                onChange={this.handleChange}
                                value={this.state.destino}
                                name='destino'
                            />
                            <label for="destino">Destino</label>
                        </div>
                        <br />

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="carga"
                                placeholder="carga"
                                onChange={this.handleChange}
                                value={this.state.carga}
                                name='carga'
                            />
                            <label for="destino">Carga Transportada</label>
                        </div>
                        <br />

                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control"
                                id="peso_total"
                                placeholder="peso total"
                                onChange={this.handleChange}
                                value={this.state.peso_total}
                                name='peso_total'
                            />
                            <label for="destino">Peso Total</label>
                        </div>
                        <br />
                     
                        <select className="form-select"
                            aria-label="Default select example"
                            id="id_chofer"
                            onChange={this.handleChange}
                            value={this.state.id_chofer}
                            name='id_chofer'
                        >
                        <option selected disabled>ID Chofer</option>
                        {OptionChofer}
                        </select>
  
                    
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

export default AgregarInOut;



export function AgregarInOut(registro,extra) {
    debugger
    const parametros = useParams();
    
    const useNavigateP = useNavigate();
    
    return (
        <>
            <AgregarInOutClass registro={registro} useNavigateEnvuelta={useNavigateP} params={parametros}/>
        </>
    );
}