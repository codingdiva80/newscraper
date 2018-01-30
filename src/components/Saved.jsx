import React, { Component } from "react";

class Saved extends Component {

    constructor(props) {
        super(props);
        this.newscraperAPI = (document.domain === "localhost") ?
			"http://localhost:3001" :
            "http://newscraperapi.codingdiva.com";
            
        this.state = {
            savedArticles: []
        }
    };

    updateSavedArea = (display) => {
        this.props.updateParent(display);
    }


    componentDidMount() {
        fetch(this.newscraperAPI+"/savedarticles").then(data => {
            console.log(data);
        });
        const savedArticles = [];
        this.setState({
            savedArticles
        });
    }

    render() {
        return (
            <section className="saved-articles-section">
                <div className="container">
                    <div className="row center-xs center-sm center-md center-lg middle-xs middle-sm middle-md middle-lg">
                        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7 saved-article-content">
                            <div className="snippet">
                                { this.state.savedArticles.map((article, i) => { 
                                    return <div key={i}>{article.title}</div>
                                    }) 
                                }
                                    <button type="button" className="main-button back-button" 
                                    onClick={()=>this.updateSavedArea("Search")}>Back to Search</button>
                            </div>
                        </div>
                    </div>
                </div> 
            </section>   
        );
    }
}

export default Saved;












