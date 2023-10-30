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
        
        const options = JSON.parse(sessionStorage.getItem(this.props.opcion));
        const listItems = Object.entries(options).map(([text, value]) => (
            <>
            <a href={value.url} ><img src={value.icono} style={{ backgroundColor: value.color }} className="iconos" alt='icono' /></a>
            <div className='container gapIcon'></div>
            </>
        ));

        return (
            <>
          
                <div className="container navOption">
                    <nav class="navbar navbar-expand-lg-sm-md ">

                        <div id="navbarNav">
                            <ul class="navbar-nav">

                                {listItems}
                            </ul>
                        </div>
                    </nav>


                </div>

            </>

        )
    }
}


export default NavOptions;


