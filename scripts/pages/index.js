import photograph from '../data/photographers.js';
import photographerFactory from '../factories/photographer.js'


main();

function main() {
  const photographers = photograph;
  console.log(photographers);
  displayData(photographers);
}

function displayData(photographers) {
  const photographersSection = document.getElementById("photographerSection");
  let htmlBloc = '';

  photographers.forEach((photographer) => {
    htmlBloc += photographerFactory(photographer)
  });

  photographersSection.innerHTML = htmlBloc;
};