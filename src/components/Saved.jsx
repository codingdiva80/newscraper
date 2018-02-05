import React, { Component } from "react";

export default class Saved extends Component {

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
        fetch(this.newscraperAPI+"/savedarticles")
        .then(d => d.json())
        .then(data => {
            const savedArticles = data;
            console.log(savedArticles);
            this.setState({
                savedArticles
            });
        });
    }
    deleteArticle = (id, i) => {
        fetch(this.newscraperAPI+"/deletearticle/" + id)
        .then( ()=>{
            let articles = this.state.savedArticles;
            articles.shift(i-1);
            this.setState({
                savedArticles: articles
            });
        })
    }

    render() {
        return (
            <section className="saved-articles-section">
                <div className="container">
                    <div className=" saved-article-content">
                        <div className="saved-article-title"><span>Saved Articles</span></div>                
                        <div className="snippet">
                            { this.state.savedArticles.map((article, i) => { 
                                return <div key={i}>{article.title}
                                            <a className="link" onClick={()=>this.deleteArticle(article._id, i)}> Delete</a>
                                        </div>
                                }) 
                            }
                                <div className="saved-section-button-div"><button type="button" className="main-button back-button" 
                                onClick={()=>this.updateSavedArea("Search")}>Back to Search</button></div>
                        </div>
                    </div>
                </div>
            </section>   
        );
    }
}











