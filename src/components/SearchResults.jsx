import React, { Component } from "react";

export default class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.divElement = null;
		this.currentButton = null;
		this.newscraperAPI = (document.domain === "localhost") ?
			"http://localhost:3001" :
			"http://newscraperapi.codingdiva.com";
			
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
			data = data.slice(0,10);
			this.setState({ searchResults: data}, ()=>{
				this.divElement.scrollIntoView()
			});
		});	
	}

	formatDate = (date) => {
		const dateObject = new Date(date);
		const year = dateObject.getFullYear();
		const month = dateObject.getMonth();
		const day = dateObject.getDate();
		return `${month}/${day}/${year}`;
	}
	saveArticle = (data, event) => {
		this.currentButton = event.target;
		this.currentButton.disabled = true;
		let objectList = [];
		const article = {
			title: data.snippet,
			date: this.formatDate(data.pub_date),
			url: data.web_url
		};
		fetch(this.newscraperAPI+"/save", {
			method: "post",
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify(article)
		}).then(res => {
			this.currentButton.textContent = "Saved";
		});

	}

	render() {
		return(
			<section className="search-result-section" ref={(el) => this.divElement = el}>
				<div className="search-result-content">
					<div className="search-term-div">Search Term: <span className="hero-text">{this.props.searchTerm}</span></div>
					<div className="snippet">
						{ this.state.searchResults.map((item, index)=>{
							return ( <div key={index}> {this.formatDate(item.pub_date)}: {item.snippet} 
								<a href={item.web_url} target="_blank" className="link"> More</a><span className="divider-slash"> / </span>
								<a className="save-href" onClick={(e)=>this.saveArticle(item, e)}>Save</a></div> );
						}) }
							<div className="search-result-button-div"><button type="button" className="main-button back-button" 
							onClick={()=>this.updateSearchArea("Search")}>Back to Search</button>
							<button type="button" className="main-button go-to-saved-button" onClick={()=>this.updateSearchArea("Saved")}>Saved Articles</button></div>
					</div>
				</div>
            </section>
		)
	}
}