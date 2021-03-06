import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import * as search from '../model/search';

class App extends React.Component {
	state = {
		searchFocus: false,
		value: {name: '', id: null},
		data: []
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
			// 4) Use the arrays to put together the final dataset that nests all of the child data within the parents.
			const dataset = search.getParents( search.getParents(data.counties, data.states), data.regions);

			this.setState({ data: dataset });
		} catch(err) {
			console.error(err)
		}
	}

	updateSearch(val) {
		// Update the state with the value recieved from the search input
		this.setState({value: {name: val, id: null} });
	}

	getData() {
		if (this.state.data.length) {
			// If the ajax call has succesfully returned data
			return this.state.data;
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

				{
					this.state.searchFocus &&
					<SearchList
						data={this.getData()}
						onItemSelect={obj => this.onItemSelect(obj)}
						value={this.state.value}
					/>
				}

			</div>
		);
	}
}

export default App;