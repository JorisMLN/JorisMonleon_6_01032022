import media from '../data/media.js';
import photograph from '../data/photographers.js';
import VideoModel from '../factories/videoModel.js';
import ImageModel from '../factories/imageModel.js';

main();

function main() {
  console.log(media);
  console.log(photograph);

  const params = new URLSearchParams(document.location.search);
  console.log(params.get('id'), params.has('id'));

  const photographerID = params.get('id');
  const photographerFiltered = photograph.filter(filterOptions);

  //TODO gestion redirection sans ID ou fake ID (BACK TO INDEX)

  function filterOptions(item) {
    if (item.id === Number(photographerID)) {
      return true;
    } else {
      return false;
    }
  }
  
  headerSettings(photographerFiltered);
  mediaDisplay(media);
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

function mediaDisplay(media){

  let result = media
    .filter(media => id === media.id)
    .map(media => factory(media))

    console.log(result);
}

function factory(media){
  return media.hasOwnProperty('video') ?
    new VideoModel(media) 
    :
    new ImageModel(media)
}

