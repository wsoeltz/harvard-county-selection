import React from 'react';

class SearchBar extends React.Component {
	state = { term: '' };

	onSearchChange = e => {
		// On change of the search input,
		// 1) Send the value back to App.js
		// 2) Update the local state so as to keep the value consistent
		const val = e.target.value;
		this.props.onSearchUpdate(val);
		this.setState({ term: val });
	}

	onClearVal = e => {
		// On pressing of the clear value button,
		// 1) Clear the value to an empty string
		// 2) Send the new empty value back to App.js
		// 3) Update the local state so as to keep the value consistent & trigger a reload
		// 4) Set the focus back to the input
		const val = '';
		const input = e.target.previousSibling;
		input.value = val;
		this.props.onSearchUpdate(val);
		this.setState({ term: val });
		input.focus();
	}

	onSetFocus = e => {
		// On focus, signal back to App.js so that it can handle functions with the list
		this.props.setFocus(true);
	}

	onRemoveFocus = e => {
		// On loss of focus, signal back to App.js so that it can handle functions with the list
		// If there is a props.value that means the loss of focus is due to a list item being clicked
		// Update the current value of the input field to match the value of the list item
		const val = this.props.value === null ? this.state.term : this.props.value;
		this.setState({ term: val });
		this.props.setFocus(false);
	}

	render() {
		return (
			<div className="search-bar">
				<input
					id="search-input"
					placeholder="Please select a county"
					type="text"
					title="Please select a county"
					required={true}
					value={this.state.term}
					onChange={this.onSearchChange}
					onFocus={this.onSetFocus}
					onBlur={this.onRemoveFocus}
				/>
				<button
					className="clear-selection"
					onClick={this.onClearVal}
					title="Clear Selection">
					Clear Selection
				</button>
				<button className="show-list" title="Toggle Dropdown">Show list</button>
			</div>
		);
	}
}

export default SearchBar;