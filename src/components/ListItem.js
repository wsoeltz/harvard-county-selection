import React from 'react';

class ListItem extends React.Component {
	state = {};

	renderListItem(elm) {
		const self = this;
		if (elm.hasOwnProperty('children')) {
			return (
				<li key={elm.id}>
					{elm.name}
					<ul> {
						elm.children.map(curr => {
							return (self.renderListItem(curr));
						})
					}
					</ul>
				</li>
			);
		}
		return <li key={elm.id}><button>{elm.name}</button></li>;
	}

	render() {
		return this.renderListItem(this.props.data);
	}
}

export default ListItem;