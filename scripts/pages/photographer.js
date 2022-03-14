import media from '../data/media.js';

main();

function main() {
  console.log(media);

  let photographerParameters = window.location.search;
  let photographerID = photographerParameters.split('=')[1];
  console.log(photographerID);
}