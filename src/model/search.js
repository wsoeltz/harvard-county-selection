export const searchData = (term, data) => {
	// return an array of data that matches the term
	if (data.length && term !== '') {
		return data.filter(curr => {
			if (curr.name.toUpperCase().includes(term.toUpperCase())) {
				return true;
			}
			return false;
		});
	} else {
		return null;
	}
}

export const getParents = (childArr, parentArr) => {
	// return an array of parent elements with an array of their children inside of it
	if (childArr !== null && parentArr !== null) {
		const newArr = parentArr.filter(curr => {
			const id = curr.id;
			curr.children = childArr.filter(curr => {
				if (curr.parent === id) {
					return true;
				}
				return false;
			});
			if (curr.children.length) {
				return true;
			}
			return false;
		});
		return newArr;
	}
	return null;
}