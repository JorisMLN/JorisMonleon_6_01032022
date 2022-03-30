import media from '../data/media.js';
import photograph from '../data/photographers.js';
import VideoModel from '../factories/videoModel.js';
import ImageModel from '../factories/imageModel.js';

main();

function main() {

  const params = new URLSearchParams(document.location.search);
  console.log(params.get('id'), params.has('id'));

  const photographerID = params.get('id');
  const photographerFiltered = photograph.filter(filterOptions);
  function filterOptions(item) {
    if (item.id === Number(photographerID)) {
      return true;
    } else {
      return false;
    }
  }

  if (params.has('id') === false || photographerFiltered.length <= 0) {
    window.location = 'http://127.0.0.1:5501/index.html';
  };

  headerSettings(photographerFiltered);
  mediaDisplay(media, photographerID);
  displayModal();
  closeModal();
  displayLightBox();
  closeLightBox();
}

function headerSettings(settings) {

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
    <div class='name'>${profil.name}</div>
    <div class='city'>${profil.city} ${profil.country}</div>
    <div class='tag'>${profil.tagline}</div>
  `;
  leftSide.innerHTML = leftHtml;


  let rightSide = document.getElementById('headerRight');
  let rightHtml = `
    <img class='photo' src='assets/photographers/${profil.photo}'></img>
  `;
  rightSide.innerHTML = rightHtml;
}

function mediaDisplay(media, photographerID) {
  console.log(media)

  let result = media
    .filter(media => Number(photographerID) === media.photographerId)
    .sort((a, b) => b.likes - a.likes)
    .map(media => factory(media))
  // - - - - -
  displayArt(result);

  sortByDropdown(media, photographerID)
}

function sortByDropdown(media, photographerID) {
  let sortedResult;

  let dateBtn = document.querySelector('.dateBtn');
  dateBtn.addEventListener('click', function () {
    sortedResult = media
      .filter(media => Number(photographerID) === media.photographerId)
      .sort(function (a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
      })
      .map(media => factory(media))
    // - - - - -

    displayArt(sortedResult);
  })

  let titleBtn = document.querySelector('.titleBtn');
  titleBtn.addEventListener('click', function () {
    sortedResult = media
      .filter(media => Number(photographerID) === media.photographerId)
      .sort(function (a, b) {
        return a.title.localeCompare(b.title);
      })
      .map(media => factory(media))
    // - - - - -

    displayArt(sortedResult);
  })

  let popBtn = document.querySelector('.popBtn');
  popBtn.addEventListener('click', function () {
    sortedResult = media
      .filter(media => Number(photographerID) === media.photographerId)
      .sort((a, b) => b.likes - a.likes)
      .map(media => factory(media))
    // - - - - -

    displayArt(sortedResult);
  })
}

function displayArt(result) {
  let displayMedia = document.getElementById('displayMedia');
  let html = '';
  result.forEach(item => html += item);
  displayMedia.innerHTML = html;
}

function factory(media) {
  return media.hasOwnProperty('video')
    ?
    new VideoModel(media).getDomCard()
    :
    new ImageModel(media).getDomCard()
}

//####################################################################################################################################
// Modal Manager
function displayModal() {
  const openModalBtn = document.getElementById('openModalBtn');

  openModalBtn.addEventListener('click', () => {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block';
    console.log('openTest');
    sendForm();
  });
}

function closeModal() {
  const closeModalBtn = document.querySelector('#closeModalBtn');

  closeModalBtn.addEventListener('click', () => {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
    console.log('closeTest');
  });
}

function sendForm() {
  const sendBtn = document.querySelector('.contact_button');
  console.log('test send')

  sendBtn.addEventListener('click', function (event) {
    console.log(event)
    event.preventDefault();

    let firstName = document.getElementsByClassName('firstName').value;
    let lastName = document.getElementsByClassName('lastName').value;
    let mail = document.getElementsByClassName('mail').value;
    let message = document.getElementsByClassName('message').value;

    console.log(firstName, lastName, mail, message);
  })

}

function displayLightBox() {
  let lightBox = document.getElementById('lightBox_modal');
  let mediaToView = document.getElementsByClassName('domCard__media--photo');
  let slotToDisplay = document.getElementById('lightBox__display');

  let arrayOfPhotoSource = [];
  console.log(Array.from(mediaToView))

  Array.from(mediaToView).forEach((photo) => {

    arrayOfPhotoSource.push(photo.attributes.src.value);

    photo.addEventListener('click', function (event) {
      event.preventDefault();
      let srcValue = event.target.attributes.src.value;

      slotToDisplay.setAttribute("src", srcValue);

      lightBox.style.display = "block";
    })
  })

  console.log(arrayOfPhotoSource);
}

function closeLightBox() {
  let lightBox = document.getElementById('lightBox_modal');
  let closeBtn = document.getElementById('closeLightBoxBtn');
  closeBtn.addEventListener('click', function () {
    lightBox.style.display = "none";
  })
}