import React from 'react';
import ListItem from './ListItem';
import Spinner from './Spinner';

class SearchList extends React.Component {
	state = {};

	renderList() {
		let markup;
		if (this.props.searchResults === null) {
			return <Spinner />;
		} else if (!this.props.searchResults.length) {
			markup = <li>No results.</li>;
		} else {
			markup = this.props.searchResults.map((curr) => {
				return <ListItem data={curr} key={curr.id} />;
			});
		}
		return markup;
	}

	render() {
		return (
			<ul>
				{this.renderList()}
			</ul>
		);
	}
}

export default SearchList;