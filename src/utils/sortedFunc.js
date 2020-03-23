export const sortByCategory = (arr, category) => {
  if (category === 'product') {
    return arr.sort((a, b) => (a.product > b.product) ? 1 : ((b.product > a.product) ? -1 : 0));
  } else {
    return arr.sort((elem1, elem2) => elem2[category] - elem1[category]);
  }
}
