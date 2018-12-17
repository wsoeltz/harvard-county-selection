import React from 'react';
import ListItem from './ListItem';
import Loader from './Loader';

class SearchList extends React.Component {
	state = {};

	renderList() {
		let markup;
		if (this.props.searchResults === null) {
			return <Loader />;
		} else if (!this.props.searchResults.length) {
			markup = <li>No results.</li>;
		} else {
			markup = this.props.searchResults.map((curr) => {
				return <ListItem data={curr} key={curr.id} onItemSelect={obj => this.props.onItemSelect(obj)} />;
			});
		}
		return markup;
	}

	componentDidUpdate() {
		if (this.props.scrollToElm.id) {
			console.log(this.props.scrollToElm.id);
		}
	}


	render() {
		return (
			<ul className={`search-list visible-${this.props.menuOpen}`}>
				{this.renderList()}
			</ul>
		);
	}
}

export default SearchList;