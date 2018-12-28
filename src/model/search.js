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