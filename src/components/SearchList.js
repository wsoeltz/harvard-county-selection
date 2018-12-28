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
						scrollToElm={this.scrollToElm}
					/>);
					newArr = newArr.concat(childArr);
				}
			} else if (curr.name.toUpperCase().includes(this.props.value.name.toUpperCase()) || this.props.value.id !== null) {
				// 1) If this is the lowest level of the list, check if the name is equal to our search value OR if we currently have an item selected (in which case the search term is essentially cleared and we revert to showing all items).
				// 2) Push it to our new array, to be returned to the function that called it
				newArr.push( <ListItem
					key={curr.id}
					data={curr}
					onItemSelect={this.props.onItemSelect}
					scrollToElm={this.scrollToElm}
				/>);
			}
		});

		// Return the new array. If this function is being called recursively it will concate this array to its own array
		return newArr;
	}

	scrollToElm = (elm, id) => {
		// If an element has been selected, scroll to it
		if (this.props.value.id === id) {
			// Using the parentNode selector here instead of ref as ref cannot be accessed at the time at which this is called by the nested ListItem
			const listElm = elm.parentNode;
			const topPos = elm.offsetTop;
			listElm.scrollTop = topPos;
		}
	}

	render() {
		return (
			<ul className="search-list">
				{this.renderList()}
			</ul>
		);
	}
}

export default SearchList;