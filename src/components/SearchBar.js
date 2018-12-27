import React from 'react';

class SearchBar extends React.Component {
	// Value is set via parent component

	onSearchChange = e => {
		// On change of the search input,
		// 1) Send the value back to App.js and it will update the state to reflect the changes here
		const val = e.target.value;
		this.props.onSearchUpdate(val);
	}

	onClearVal = e => {
		// On pressing of the clear value button,
		// 1) Clear the value to an empty string
		// 2) Send the new empty value back to App.js
		// 3) App.js will update it's state to reflect the changes here
		// 4) Set the focus back to the input
		const val = '';
		const input = e.target.previousSibling;
		input.value = val;
		this.props.onSearchUpdate(val);
		input.focus();
	}

	focusChange = e => {
		// On change of focus, signal back to App.js so that it can handle functions with the list and value setting
		let isFocused = false;
		if (e.type === 'focus') {
			isFocused = true;
		}
		this.props.setFocus(isFocused);
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
					value={this.props.value}
					onChange={this.onSearchChange}
					onFocus={this.focusChange}
					onBlur={this.focusChange}
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