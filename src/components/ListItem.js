import React from 'react';

class ListItem extends React.Component {
	state = {};

	onItemClick(obj) {
		// Send back the data for the selected list item
		this.props.onItemSelect(obj);
	}

	renderListItem(elm) {
		// Recursively loop through each list item and it's children until all are rendered
		const self = this;
		if (elm.hasOwnProperty('children')) {
			return (
				<li key={elm.id}>
					<span>{elm.name}</span>
					<ul> {
						elm.children.map(curr => {
							return (self.renderListItem(curr));
						})
					} </ul>
				</li>
			);
		}
		return (
			<li key={elm.id} id={`county_id_${elm.id}`}>
				<button onMouseDown={obj => this.onItemClick(elm)}>
					{elm.name}
				</button>
			</li>
		);
	}

	render() {
		return this.renderListItem(this.props.data);
	}
}

export default ListItem;