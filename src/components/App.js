import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import * as search from '../model/search';

class App extends React.Component {
	state = {
		searchFocus: false,
		value: {name: '', id: null},
		data: {
			regions : [],
			states : [],
			counties : []
		}
	};

	async componentDidMount() {
		try {
			const res = await axios.get('https://api.myjson.com/bins/dbg52');
			// Loop through the data array and
			// 1) Create an array of all region objects
			// 2) Create an array of states objects
			// 3) Create an array of all county objects
			const data = {
				regions : [],
				states : [],
				counties : []
			};
			res.data.forEach(curr => {
				if (curr.level === 'region') {
					data.regions.push(curr);
				} else if(curr.level === 'state') {
					data.states.push(curr);
				} else if (curr.level === 'county') {
					data.counties.push(curr);
				}
			});
			this.setState({ data: data });
		} catch(err) {
			console.error(err)
		}
	}

	updateSearch(val) {
		// Update the state with the value recieved from the search input
		this.setState({value: {name: val, id: null} });
	}

	getResults() {
		// If the ajax call has succesfully returned data
		if (this.state.data.counties.length) {
			// If the user has entered a search input, use that otherwise use the full list of counties
			let res = search.searchData(this.state.value.name, this.state.data.counties);
			res = res !== null ? res : this.state.data.counties;
			// Return an updated data object that contains the counties as children of their states as children of their regions
			res = search.getParents( search.getParents(res, this.state.data.states), this.state.data.regions);
			return res;
		}
		// Otherwise return null
		return null;
	}

	onFocusChange(focus) {
		// Update whether the focus is currently in the dropdown box
		this.setState({ searchFocus: focus });
	}

	onItemSelect(obj) {
		// If a list item has been selected, set it to the value state
		this.setState({ value: obj });
	}

	render() {
		return (
			<div className="county-search-container">

				<SearchBar
					onSearchUpdate={(val) => this.updateSearch(val)}
					setFocus={(focus) => this.onFocusChange(focus)}
					value={this.state.value.name}
				/>

				<SearchList
					searchResults={this.getResults()}
					data={this.state.data}
					menuOpen={this.state.searchFocus}
					onItemSelect={obj => this.onItemSelect(obj)}
					scrollToElm={this.state.value}
				/>

			</div>
		);
	}
}

export default App;