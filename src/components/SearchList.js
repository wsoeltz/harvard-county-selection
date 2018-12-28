import React from 'react';
import ListItem from './ListItem';
import Loader from './Loader';

class SearchList extends React.Component {

	renderList() {
		const data = this.props.data;
		if (data === null) {
			// If there are no results to display yet, display a loading message
			return <Loader />;
		} else {
			// If there are results, loop through and match them to the search term
			const markup = this.getListResults(data);

			if (!markup.length) {
				// If there are no results that match the query, display a "No Results" message
				return <li className="no-results">No results.</li>;
			}

			return markup;
		}
	}

	getListResults(arr) {
		let newArr = [];

		// Loop through each element in our dataset
		arr.forEach(curr => {

			if (curr.hasOwnProperty('children')) {
				// If there are children elements, recursively run this function again and assign the result to a child array
				const childArr = this.getListResults(curr.children);

				if (childArr.length) {
					// If a child arr has been returned, push this element to the new array and then concat the child array after it
					newArr.push( <ListItem
						key={curr.id}
						data={curr}
						onItemSelect={this.props.onItemSelect}
					/>);
					newArr = newArr.concat(childArr);
				}
			} else if (curr.name.toUpperCase().includes(this.props.value.name.toUpperCase())) {
				// If this is the lowest level of the list, push it to our new array, to be returned to the function that called it
				newArr.push( <ListItem
					key={curr.id}
					data={curr}
					onItemSelect={this.props.onItemSelect}
				/>);
			}
		});

		// Return the new array. If this function is being called recursively it will concate this array to its own array
		return newArr;
	}

	componentDidUpdate() {
		/*// If an element had been selected, scroll to it when the list is opened
		const listElm = document.querySelector('.search-list');
		if (this.props.scrollToElm.id) {
			const selectedElm = document.querySelector(`#county_id_${this.props.scrollToElm.id}`);
			const topPos = selectedElm.offsetTop - 96;
			listElm.scrollTop = topPos;
		} else {
			listElm.scrollTop = 0;
		}*/
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