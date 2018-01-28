import React, { Component } from "react";
import Saved from "./Saved";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        };
    }
    handleChange(event) {
        let newState = {};
        newState[event.target.id] = event.target.value;
        this.state(newState);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log("term searched " + this.state.term);
        this.props.setTerm(this.state.term);
        this.setState({ term: "" });
    }
    updateSearchArea = () => {
        this.props.updateParent("SearchResults");
    }
    displaySaved = () => {
        this.props.updateParent("Saved");
    }

    termHandler = (target) => {
        this.props.captureChildTerm(target.currentTarget.value);
    }

    startYearHandler = (target) => {
        this.props.captureStartYear(target.currentTarget.value);
    }

    endYearHandler = (target) => {
        this.props.captureEndYear(target.currentTarget.value);
    }

    render() {
        return (
            <section className="search-section">
                <div className="container">
                    <div className="row center-xs center-sm center-md center-lg middle-xs middle-sm middle-md middle-lg">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 search-content">
                            <form action="" method="">
                                <label>New York Times React App</label>
                                <input type="search" placeholder="Term" onKeyUp={this.termHandler} /><br />
                                <input type="search" placeholder="Start Year" onKeyUp={this.startYearHandler} /><br />               
                                <input type="search" placeholder="End Year" onKeyUp={this.endYearHandler}/>
                                <br />
                                <button type="button" className="main-button" onClick={this.updateSearchArea}>Search</button>
                                <button type="button" className="main-button" onClick={this.displaySaved}>Saved</button>
                            </form>
                        </div>
                    </div>
                </div> 
            </section>
        );
    }
}

export default Search;