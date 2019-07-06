import React from 'react';
import globe from './assets/icons8-around-the-globe-50.png'
import PageList from './pagelist';
import './style/header.css';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selected: '',
            pages:[],
            selectValue:'',
            searchInput:'',
            coords:{}
        };
        this.mostPopular = this.mostPopular.bind(this);
        this.randoms = this.randoms.bind(this);
        this.getPageArray = this.getPageArray.bind(this);
        this.selection = this.selection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.subjectOption = this.subjectOption.bind(this);
        this.getCoords = this.getCoords.bind(this);
        this.locationOption = this.locationOption.bind(this);
    }

    mostPopular(event){
        event.preventDefault();
        this.setState({selected: event.target.text});
        fetch('https://en.wikipedia.org//w/api.php?action=query&format=json&prop=extracts%7Cpageviews%' +
            '7Cinfo&generator=mostviewed&exchars=200&exintro=1&explaintext=1&pvipdays=3&inprop=url' +
            '&gpvimlimit=25&origin=*',
            {
                method: 'GET',
                origin:'*'
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(JSON.stringify(data.query.pages));
                this.setState({pages: this.getPageArray(data.query.pages)})
            })
            .catch(error=>{
                console.log(error);
            })
    }

    randoms(event){
        event.preventDefault();
        this.setState({selected: event.target.text});
        fetch('https://en.wikipedia.org//w/api.php?action=query&format=json&prop=extracts%7Cinfo' +
            '&generator=random&exchars=300&exintro=1&explaintext=1&inprop=url&grnnamespace=0&grnlimit=25' +
            '&origin=*',
            {
                method: 'GET',
                origin:'*'
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(JSON.stringify(data.query.pages));
                this.setState({pages: this.getPageArray(data.query.pages)});
                console.log(this.state.pages);
            })
            .catch(error=>{
                console.log(error);
            })
    }

    subjectOption(input){
        console.log("Inside subject");
        console.log(input);
        fetch('https://en.wikipedia.org//w/api.php?action=query&format=json&prop=extracts%7Cinfo' +
            '&generator=search&exchars=200&exintro=1&explaintext=1&inprop=url&gsrsearch=' + input + '&gsrnamespace=0' +
            '&gsrlimit=25&origin=*',
            {
                method: 'GET',
                origin:'*'
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(JSON.stringify(data.query.pages));
                this.setState({pages: this.getPageArray(data.query.pages)});
                console.log(this.state.pages);
            })
            .catch(error=>{
                console.log(error);
                alert("Error: Subject inputted could not be found.\n\n" +
                    "Entered input does not appear to be valid, please try searching another topic")
            })
    }

    getCoords(input){
        console.log("Inside getCoord");
        console.log(input);
        fetch('https://en.wikipedia.org//w/api.php?action=query&format=json&prop=coordinates&generator=search&' +
            'colimit=1&gsrsearch='+ input + '&gsrlimit=1&origin=*',
            {
                method: 'GET',
                origin:'*'
            })
            .then(response=>response.json())
            .then(data=>{
                let page = this.getPageArray(data.query.pages);
                this.locationOption(page);
            })
            .catch(error=> {
                console.log("There was an error with retrieving the coordinates of input");
                console.log(error);
                alert("Error: Coordinates could not be found for this input.\n\n" +
                    " Searching by location requires the input name to be specifically a place,\n" +
                    " such as the name of a building, for example 'The White House'")
            })
    }

    locationOption(page){
        console.log("inside locaiton");
        let lat = page[0].coordinates[0].lat;
        let lon = page[0].coordinates[0].lon;
        console.log(lat);
        console.log(lon);
        fetch('https://en.wikipedia.org//w/api.php?action=query&format=json&prop=extracts%7Cinfo&' +
            'generator=geosearch&exchars=200&exintro=1&explaintext=1&inprop=url&ggscoord='+ lat + '|' + lon + '&' +
            'ggsradius=2000&ggslimit=25&origin=*',
            {
                method: 'GET',
                origin:'*'
            })
            .then(response=>response.json())
            .then(data=>{
                this.setState({pages: this.getPageArray(data.query.pages)});
            })
    }

    selection(event){
        event.preventDefault();
        this.setState({selected: ''});
        // ((this.state.selectValue == 'Subject') ? this.subjectOption() : this.locationOption())
        if(this.state.selectValue == 'Subject'){
            this.subjectOption(this.state.searchInput);
        }else if(this.state.selectValue == 'Location'){
            this.getCoords(this.state.searchInput);
        }
    }

    getPageArray(obj){
        let arr = Object.keys(obj).map(function (p){
            return obj[p];
        });
        return arr;
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    render(){
        return(
            <div>
            <div className="Header-Container">
                <div className="TW-Header">
                    <div className="Name-Container">
                        <img src={globe} className="Logo"/>
                        <p className="Title">DiscoverWikis</p>
                    </div>
                    <div className="Selection-Container">
                        <ul className="Selection-List">
                            <li>
                                <a className={this.state.selected == 'Popular' ? "Selected": "Choice"}
                                   href="#" onClick={this.mostPopular}>Popular</a>
                            </li>
                            <li>
                                <span className="Divider">|</span>
                                <a className={this.state.selected == 'Random' ? "Selected": "Choice"}
                                   href="#" onClick={this.randoms}>Random</a>
                            </li>
                        </ul>
                    </div>
                    <div className="Search-Container">
                    <form className="Search-Form" onSubmit={this.selection}>
                        <label className="Type-Label" htmlFor="Search-Type">Search by:</label>
                        <select id="Search-Type" value={this.state.selectValue} name= "selectValue"
                                onChange={this.handleChange}>
                            <option value="" disabled selected>Select an Option</option>
                            <option value="Subject">Subject</option>
                            <option value="Location">Location</option>
                        </select>
                        <label className="Bar-Label" htmlFor="Search-Bar">For:</label>
                        <input id="Search-Bar" type="text" placeholder="input..." name="searchInput"
                               onChange={this.handleChange}/>
                        <input className="Search-Button" type="submit" value="search"/>
                    </form>
                    </div>
                </div>
            </div>
                <PageList pages={this.state.pages} />
            </div>
        )
    }
}
export default Header;