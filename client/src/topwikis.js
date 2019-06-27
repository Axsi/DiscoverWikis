import React from 'react';
import Header from './header';
import PageList from './pagelist';

import './style/topwikis.css';

class Topwikis extends React.Component{
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
    }

    // handleClick(event){
    //     event.preventDefault();
    //     fetch('http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Craig%20Noone&format=json&origin=*',
    //         {
    //             method: 'GET',
    //             origin: '*'
    //         })
    //         .then(response=> response.json())
    //         .then(data=>{
    //             // console.log(data);
    //             console.log(JSON.stringify(data));
    //         })
    // }

    render(){
        return(
            <React.Fragment>
                <Header />
                <PageList />
                {/*<button className="test" onClick={this.handleClick}>Test me</button>*/}
            </React.Fragment>
        )
    }
}

export default Topwikis;