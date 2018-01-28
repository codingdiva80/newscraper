import React, { Component } from 'react';
import Main from "./components/Main";
import API from "./utils/API";


class App extends Component {
	state = {
    	articles: [],
    	articleSearch: ""
  	};

  	handleInputChange = event => {
    	const { name, value } = event.target;
    	this.setState({
      		[name]: value
    	});
  	};

  	handleFormSubmit = event => {
    	event.preventDefault();
    	API.getArticles(this.state.articleSearch)
      	.then(res => this.setState({ articles: res.data }))
      	.catch(err => console.log(err));
  	};

    render() {
        return (
            <div className="App"> 
                <Main />
            </div>
        );
    }
}

export default App;
