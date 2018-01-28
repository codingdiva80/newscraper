import React, { Component } from "react";

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: []
		}
	}
	updateSearchArea = (display) => {
		this.props.updateParent(display);
	}

	componentDidMount(){
		this.conductSearch();
	}

	conductSearch = () => {
		let authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
		let query = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  			authKey + "&q=" + this.props.searchTerm +
  			"&begin_date=" + this.props.searchStartYear + "0101" + 
  			"&end_date=" + this.props.searchEndYear + "0101"; 

		let resultHtml = "";  		

		fetch(query).then(d => d.json()).then( d => {
			let data = d.response.docs;
			data = data.slice(0,5);
			this.setState({ searchResults: data});
		});	
	}

	formatDate = (date) => {
		const dateObject = new Date(date);
		const year = dateObject.getFullYear();
		const month = dateObject.getMonth();
		const day = dateObject.getDate();
		return `${month}/${day}/${year}`;
	}
	saveArticle = (data) => {

		let objectList = [];
		const article = {
			title: data.snippet,
			date: this.formatDate(data.pub_date),
			url: data.web_url
		};
		let localData = localStorage.getItem("articles");

		try {
			localData = JSON.parse(localData);
		}
		catch(e){
			localData = {};
		}
		objectList.push(article);
		objectList.push(localData);

		localStorage.setItem("articles", JSON.stringify(objectList));
		console.log(localStorage.getItem("articles").toString());
	}

	render() {
		return(
			<section className="search-result-section">
                <div className="container">
                    <div className="row center-xs center-sm center-md center-lg middle-xs middle-sm middle-md middle-lg">
                        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7 search-result-content">
                            <div className="search-term-div">Search Term: <span className="hero-text">{this.props.searchTerm}</span></div>
                            <div className="snippet">
                            	{ this.state.searchResults.map((item, index)=>{
                            		return ( <div key={index}> {this.formatDate(item.pub_date)}: {item.snippet} 
                            			<a href={item.web_url} target="_blank" className="link"> More </a>
                            			<button className="save-button" onClick={()=>this.saveArticle(item)}>Save</button></div> );
                            	}) }
                            		<button type="button" className="main-button back-button" 
                            		onClick={()=>this.updateSearchArea("Search")}>Back to Search</button>
                            		<button type="button" className="main-button go-to-saved-button" onClick={()=>this.updateSearchArea("Saved")}>Saved Articles</button>
                        	</div>
                        </div>
                    </div>
                </div> 
            </section>
		)
	}
}

export default SearchResults;