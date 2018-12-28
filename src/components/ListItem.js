import React from 'react';

class ListItem extends React.Component {

	onItemClick(obj) {
		// Send back the data for the selected list item
		this.props.onItemSelect(obj);
	}

	render() {
		// If this is a county level component, render it with a button
		if (this.props.data.level === 'county') {
			return (
				<li>
					<button onMouseDown={obj => this.onItemClick(this.props.data)}>
						{this.props.data.name}
					</button>
				</li>
			);
		}
		// Otherwise render it with a class name denoting it's parent level
		return (
			<li className={`level-${this.props.data.level}`}>
				{this.props.data.name}
			</li>
		);
	}

}

export default ListItem;