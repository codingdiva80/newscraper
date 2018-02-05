import React, { Component } from "react";
import Search from "./Search";
import SearchResults from "./SearchResults";
import Saved from "./Saved";


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "Search", 
            searchTerm: "",
            searchStartYear: "",
            searchEndYear: ""
        }
    }

    captureTerm = (term) => {
        this.setState({
            searchTerm: term
        });
    }

     captureStartYear = (year) => {
        this.setState({
            searchStartYear: year
        });
    } 

    captureEndYear = (year) => {
        this.setState({
            searchEndYear: year
        });
    } 

    updateDisplayArea = (displayState) => {
        this.setState({display: displayState});
    }

    getSearchScreen = () => {
        return(
            <Search 
            updateParent={this.updateDisplayArea} 
            captureChildTerm={this.captureTerm}
            captureStartYear={this.captureStartYear}
            captureEndYear={this.captureEndYear}
            />
        )
    }

    getScreen = () => {
        if(this.state.display === "Search"){
            return;
        }
        if(this.state.display === "Saved") {
            return(
                <Saved 
                updateParent={this.updateDisplayArea} 
                />
            );
        } else {
            return(
                <SearchResults 
                updateParent={this.updateDisplayArea} 
                searchTerm={this.state.searchTerm}
                searchStartYear={this.state.searchStartYear}
                searchEndYear={this.state.searchEndYear}
                />
            );
        }
    }
    render() {
        return (
            <div>
                <section id="showcase">
                    {this.getSearchScreen()}
                </section>
                <section id="search-saved-section">
                    {this.getScreen()}; 
                </section>
            </div>
        );
    }
}






