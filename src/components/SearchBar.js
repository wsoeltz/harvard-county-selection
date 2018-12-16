import React from 'react';

class SearchBar extends React.Component {
	state = { term: '' };

	onSearchChange = e => {
		const val = e.target.value;
		this.props.onSearchUpdate(val);
		this.setState({ term: val });
	}

	render() {
		return (
			<input type="text"
				value={this.state.term}
				onChange={this.onSearchChange}
			/>
		);
	}
}

export default SearchBar;