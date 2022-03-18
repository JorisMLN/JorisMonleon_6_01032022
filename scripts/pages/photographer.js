import media from '../data/media.js';
import photograph from '../data/photographers.js';
// import MediaFactory from '../factories/mediaFactory';

main();

function main() {
  console.log(media);
  console.log(photograph);
  let photographerID = window.location.search.split('=')[1];

  const photographerFiltered = photograph.filter(filterOptions);
  console.log(photographerFiltered);

  function filterOptions(item) {
    if (item.id === Number(photographerID)) {
      return true;
    } else {
      return false;
    }
  }
  
  headerSettings(photographerFiltered);
}

function headerSettings(settings){

  let profil = {
    name: '',
    city: '',
    country: '',
    photo: '',
    tagline: ''
  }

  settings.forEach((item) => {
    profil.name = item.name;
    profil.city = item.city;
    profil.country = item.country;
    profil.photo = item.portrait;
    profil.tagline = item.tagline;
  })

  console.log(profil);
  
  let leftSide = document.getElementById('headerLeft');
  let leftHtml = `
    <div class='test'>${profil.name}</div>
    <div class='test'>${profil.city} ${profil.country}</div>
    <div class='test'>${profil.tagline}</div>
  `;
  leftSide.innerHTML = leftHtml;


  let rightSide = document.getElementById('headerRight');
  let rightHtml = `
    <img class='test' src='assets/photographers/${profil.photo}'></img>
  `;
  rightSide.innerHTML = rightHtml;
}

// function mediaDisplay(){

// }