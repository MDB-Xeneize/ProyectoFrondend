import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class LinkAccess extends React.Component {
    render() {
        return(
        <div className="container">
            <div className='row'>

                <div className='col-4 abs-center'>
                    <button className="btn btn-primary opacity-50"><div  ><h2><i>Ingresar</i></h2></div></button>
                </div>
            </div>

        </div>
        )
    }
}
export default LinkAccess;