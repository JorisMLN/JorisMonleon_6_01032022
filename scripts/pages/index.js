import photograph from '../data/photographers.js';
import photographerFactory from '../factories/photographer.js'


main();

function main() {
  const photographers = photograph;
  console.log(photographers);
  displayData(photographers);
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographerSection");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};