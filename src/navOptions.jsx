import React from 'react';



class NavOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
    }
    componentDidMount() {

    }


    render() {
        debugger
        const options = JSON.parse(sessionStorage.getItem(this.props.opcion));
        const listItems = Object.entries(options).map(([text, value]) => (

            <a href={value.url} ><img src={value.icono} className="iconos" alt='icono' /></a>

        ));

        return (


            <div className=" navOption abs-center">
                <nav class="navbar navbar-expand-lg ">
                   
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">

                            {listItems}
                        </ul>
                    </div>
                </nav>
               
            </div>



        )
    }
}


export default NavOptions;


