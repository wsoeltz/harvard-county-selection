import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import * as search from '../model/search';

class App extends React.Component {
	state = {
		value: '',
		searchFocus: false,
		selected: {name: null, id: null},
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
			// This will make searching easier later
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
		this.setState({ value: val, selected: {name: null, id: null} });
	}

	getResults() {
		if (this.state.data.counties.length) {
			let res = search.searchData(this.state.value, this.state.data.counties);
			res = res !== null ? res : this.state.data.counties;
			res = search.getParents( search.getParents(res, this.state.data.states), this.state.data.regions);
			return res;
		}
		return null;
	}

	onFocusChange(focus) {
		this.setState({ searchFocus: focus });
	}

	onItemSelect(obj) {
		this.setState({ selected: obj });
	}

	render() {
		return (
			<div className="county-search-container">
				<SearchBar onSearchUpdate={(val) => this.updateSearch(val)} setFocus={(focus) => this.onFocusChange(focus)} value={this.state.selected.name} />
				<SearchList searchResults={this.getResults()} data={this.state.data} menuOpen={this.state.searchFocus} onItemSelect={obj => this.onItemSelect(obj)} scrollToElm={this.state.selected} />
			</div>
		);
	}
}

export default App;