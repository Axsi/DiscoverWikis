import React from 'react';
import Header from './header';
import PageList from './pagelist';

import './style/topwikis.css';

class Topwikis extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <Header />
            </React.Fragment>
        )
    }
}

export default Topwikis;