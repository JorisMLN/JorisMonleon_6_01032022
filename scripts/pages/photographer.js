import media from '../data/media.js';
import photograph from '../data/photographers.js';

main();

function main() {
  console.log(media);
  console.log(photograph);
  let photographerID = window.location.search.split('=')[1];

  const photographerFiltered = photograph.filter(filterOptions);

  function filterOptions(item) {
    if (item.id === Number(photographerID)) {
      return true;
    } else {
      return false;
    }
  }

  console.log(photographerFiltered);
}