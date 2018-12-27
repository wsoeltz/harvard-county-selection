import React from 'react';
import ListItem from './ListItem';
import Loader from './Loader';

class SearchList extends React.Component {

	renderList() {
		if (this.props.searchResults === null) {
			// If there are no results to display yet, display a loading message
			return <Loader />;
		} else if (!this.props.searchResults.length) {
			// If there are no results that match the query, display a "No Results" message
			return <li className="no-results">No results.</li>;
		} else {
			// If there are results, loop through and display them
			const markup = this.props.searchResults.map((curr) => {
				return <ListItem data={curr} key={curr.id} onItemSelect={obj => this.props.onItemSelect(obj)} />;
			});
			return markup;
		}
	}

	componentDidUpdate() {
		// If an element had been selected, scroll to it when the list is opened
		const listElm = document.querySelector('.search-list');
		if (this.props.scrollToElm.id) {
			const selectedElm = document.querySelector(`#county_id_${this.props.scrollToElm.id}`);
			const topPos = selectedElm.offsetTop - 96;
			listElm.scrollTop = topPos;
		} else {
			listElm.scrollTop = 0;
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