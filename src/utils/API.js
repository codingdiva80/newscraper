import axios from "axios";

// This method retrieves artciles from the server
export default {
	getArticles: function(query) {
    	return axios.get("/api/articles", { params: { q: query}});
  	}
};
