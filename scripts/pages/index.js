import photograph from '../data/photographers.js';
import photographerFactory from '../factories/photographer.js'


main();

function main() {
  const photographers = photograph;
  console.log(photographers);
  displayData(photographers);
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};





//###################################################################################

// async function getPhotographers() {
//   const photographers = [photograph];
//   console.log(photograph);

//   return ({
//     photographers: [...photographers]
//   })
// }

// async function displayData(photographers) {
//   const photographersSection = document.querySelector(".photographer_section");

//   photographers.forEach((photographer) => {
//     const photographerModel = photographerFactory(photographer);
//     const userCardDOM = photographerModel.getUserCardDOM();
//     photographersSection.appendChild(userCardDOM);
//   });
// };

// async function main() {
//   // Récupère les datas des photographes
//   const { photographers } = await getPhotographers();
//   displayData(photographers);
// };

// main();
