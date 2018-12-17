import React from 'react';

class SearchBar extends React.Component {
	state = { term: '' };

	onSearchChange = e => {
		const val = e.target.value;
		this.props.onSearchUpdate(val);
		this.setState({ term: val });
	}

	onClearVal = e => {
		const val = '';
		const input = e.target.previousSibling;
		input.value = val;
		this.props.onSearchUpdate(val);
		this.setState({ term: val });
		input.focus();
	}

	onSetFocus = e => {
		this.props.setFocus(true);
	}

	onRemoveFocus = e => {
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