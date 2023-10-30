import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom';
import AgregarService from './AgregarService';




export class RegistroServiceClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Service: [],
            InfoAdicional: false,
            id_service_info: 0,
            registroSelect: null,
            redireccion: false,
            modales: false,
            seleccion: ''
        }

    }

    componentDidMount() {

        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }
        const url = "http://localhost:8080/api/mantenimiento";
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
                        this.setState({
                            Service: result.body
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


    renderInfo(registro, index) {
        if (this.state.redireccion) {
            if (this.state.registroSelect.id_mantenimiento === registro.id_mantenimiento) {
                return (
                    <>
                        <tr key={index}  >
                            <td>{registro.id_mantenimiento}</td>
                            <td>{moment.utc(registro.service_proximo).format('DD/MM/YYYY')}</td>
                            <td>{moment.utc(registro.fecha).format('DD/MM/YYYY')}</td>
                            <td>{registro.observaciones}</td>
                            <td>{registro.id_vehiculo}</td>
                            <td>
                                <Link to='' className='btn btn-primary' onClick={() => this.handleClickInfo(registro.id_mantenimiento, this.props.id_mantenimiento_info)}>
                                    <span class="material-symbols-outlined">+Info</span>
                                </Link>
                                {(this.props.extra === true) ?
                                    (<Link to='' className='btn btn-warning' onClick={() => this.handleClickModificar(registro)}>
                                        <span class="material-symbols-outlined">Modificar</span>
                                    </Link>) : null
                                }

                            </td>

                        </tr>

                        {this.state.InfoAdicional && this.state.id_mantenimiento_info === registro.id_mantenimiento ? (this.renderInfoAdicional(registro)) : (null)}
                    </>
                )
            }
            else {
                return (null)
            }
        }
        else {
            return (
                <>
                    <tr key={index}  >
                        <td>{registro.id_mantenimiento}</td>
                        <td>{moment.utc(registro.servive_proximo).format('DD/MM/YYYY')}</td>
                        <td>{moment.utc(registro.fecha).format('DD/MM/YYYY')}</td>
                        <td>{registro.observaciones}</td>
                        <td>{registro.id_vehiculo}</td>
                        <td>
                            {(this.props.borrar === undefined) ? <Link to='' className='btn btn-primary' onClick={() => this.handleClickInfo(registro.id_mantenimiento, this.props.id_mantenimiento_info)}>
                                <span className="material-symbols-outlined">+Info</span>
                            </Link> : null}
                            {(this.props.borrar === undefined || this.state.seleccion !== '') ? null :
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={() => this.handleClickSwitch(registro)} />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Eliminar</label>
                                </div>

                            }
                            {(this.props.extra === 'True') ?
                                (<Link to='' className='btn btn-warning' onClick={() => this.handleClickModificar(registro)}>
                                    <span class="material-symbols-outlined">Modificar</span>
                                </Link>) : null
                            }
                            {(this.props.borrar === true && this.state.seleccion === registro.id_mantenimiento) ?
                                (<Link to='' className='btn btn-danger' onClick={() => this.handleClickBorrar(registro)}>
                                    <span className="material-symbols-outlined">Eliminar</span>
                                </Link>) : null
                            }
                            {(this.props.borrar === true && this.state.seleccion === registro.id_mantenimiento) ?
                                (<Link to='' className='btn btn-success' onClick={() => this.handleClickSwitch(registro)}>
                                    <span className="material-symbols-outlined">Cancelar</span>
                                </Link>) : null
                            }

                        </td>
                    </tr>
                    {this.state.InfoAdicional && this.state.id_mantenimiento_info === registro.id_mantenimiento ? (this.renderInfoAdicional(registro)) : (null)}

                </>
            )
        }
    }

    renderInfoAdicional(registro) {
        //Renderiza solo Informacion Adicional dentro de la misma tabla
        return (
            <>

                <tr className='tablaAdicionalHead'>

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
                        Tara
                    </th>
                    <th colSpan={3}>
                        Capacidad Maxima
                    </th>
                </tr>

                <tr className='tablaAdicionalRow'>

                    <td>{registro.matricula}</td>
                    <td>{registro.marca}</td>
                    <td>{registro.modelo}</td>
                    <td>{registro.tara}</td>
                    <td colSpan={3}>{registro.carga_maxima}</td>
                </tr >
            </>

        );
    }

    handleClickInfo(id_mantenimiento) {

        //tenemos el id y mostramos o no opcion +info
        this.state.id_mantenimiento_info === id_mantenimiento ?
            this.setState((prevState) => ({

                id_mantenimiento_info: id_mantenimiento,
                InfoAdicional: !prevState.InfoAdicional,
            })) : this.setState((prevState) => ({

                id_mantenimiento_info: id_mantenimiento,
                InfoAdicional: true,
            }))

    }

    handleClickModificar(registro) {
        this.setState({ redireccion: true, registroSelect: registro });
        //Estado modificar o informar
    }


    handleClickSwitch(registro) {
        var seleccion = this.state.seleccion; // Copia el objeto seleccion del estado
        if (seleccion !== '' && seleccion === registro.id_mantenimiento) {
            // Si la clave ya existe en seleccion, la eliminamos
            seleccion = '';
        } else {
            // Si la clave no existe, la agregamos
            seleccion = registro.id_mantenimiento;
        }
        // Actualizamos el estado 
        this.setState({ seleccion });
    }

    handleClickBorrar(registro) {

        const seleccionJSON = JSON.stringify(this.state.seleccion)
        let parametros = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }
        const url = `http://localhost:8080/api/mantenimiento/${registro.id_mantenimiento};`  //${seleccionJSON}`;
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


    render() {


        const Fila = this.state.Service.map((registro, index) => {
            return (
                <>
                    {this.renderInfo(registro, index)}
                </>
            )

        });
        const Form = this.state.redireccion ? (<AgregarService registro={this.state.registroSelect} extra={true} />) : (null);
        // Renderizo la tabla y el formulario para modificar


        return (
            <>
                <div className='container bottom'>
                    <div className='row'>
                        <div className='col'>
                            {this.props.borrar === true ? <h3>Eliminar Service</h3> : <h3>Registro de Service</h3>};
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>

                            <table className="table table-striped table-hover">

                                <thead>
                                    <tr>
                                        <th>
                                            Id_Mantenimiento
                                        </th>
                                        <th>
                                            Proximo Service
                                        </th>
                                        <th>
                                            Ultimo Service
                                        </th>
                                        <th>
                                            Observaciones
                                        </th>
                                        <th colSpan={2}>
                                            Id_Vehiculo
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

export default RegistroService;


export function RegistroService({ extra, borrar }) {
    const parametros = useParams();

    const useNavigateP = useNavigate();

    return (
        <>
            <RegistroServiceClass extra={extra} borrar={borrar} useNavigateEnvuelto={useNavigateP} params={parametros} />
        </>
    );
}



