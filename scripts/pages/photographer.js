import dataMedia from '../data/media.js';
import photograph from '../data/photographers.js';
import VideoModel from '../factories/videoModel.js';
import ImageModel from '../factories/imageModel.js';

let media = dataMedia;
let photographerFiltered;

main();

function main() {

  const params = new URLSearchParams(document.location.search);
  console.log(params.get('id'), params.has('id'));

  const photographerID = params.get('id');
  photographerFiltered = photograph.filter(filterOptions);
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

  displayModal(photographerFiltered);
  sendForm();
  closeModal();

  displayLightBox();
  closeLightBox();

  fixedInfoDisplay(media, photographerFiltered);
  toggleHiddenSort();
}

function headerSettings(settings) {

  let profil = {
    name: '',
    city: '',
    country: '',
    photo: '',
    tagline: '',
  }

  settings.forEach((item) => {
    profil.name = item.name;
    profil.city = item.city;
    profil.country = item.country;
    profil.photo = item.portrait;
    profil.tagline = item.tagline;
  })

  let leftSide = document.getElementById('headerLeft');
  let leftHtml = `
    <h1 class='name'>${profil.name}</h1>
    <div class='city'>${profil.city} ${profil.country}</div>
    <div class='tag'>${profil.tagline}</div>
  `;
  leftSide.innerHTML = leftHtml;


  let rightSide = document.getElementById('headerRight');
  let rightHtml = `
    <div class='photoBloc'>
      <img class='photo' src='assets/photographers/${profil.photo}'></img>
    </div>
  `;
  rightSide.innerHTML = rightHtml;
}

function mediaDisplay(media, photographerID) {

  let result = media
    .filter(media => Number(photographerID) === media.photographerId)
    .sort((a, b) => b.likes - a.likes)
    .map(media => factory(media))
  // - - - - -

  displayArt(result);
  likesManager()
  sortByDropdown(media, photographerID)
}

function sortByDropdown(media, photographerID) {
  let ddMenuBtn = document.getElementById('dropdownMenuButton1');
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

    ddMenuBtn.innerText = 'Date';

    displayArt(sortedResult);
    displayLightBox()
    likesManager()
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

    ddMenuBtn.innerText = 'Titre';

    displayArt(sortedResult);
    displayLightBox()
    likesManager()
  })

  let popBtn = document.querySelector('.popBtn');
  popBtn.addEventListener('click', function () {
    sortedResult = media
      .filter(media => Number(photographerID) === media.photographerId)
      .sort((a, b) => b.likes - a.likes)
      .map(media => factory(media))
    // - - - - -

    ddMenuBtn.innerText = 'Popularité';

    displayArt(sortedResult);
    displayLightBox()
    likesManager()
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

function fixedInfoDisplay(media, photographers) {

  let price;
  let _id;

  photographers.map(photographe => {
    price = photographe.price;
    _id = photographe.id;
  });

  let fixedInfoBloc = document.getElementById('fixedInfo');

  let likes = media
    .filter(media => Number(_id) === media.photographerId)
    .map(media => media.likes)
  // - - - - -

  let totalLikes = 0;
  for (let i = 0; i < likes.length; i++) {
    totalLikes += likes[i];
  }

  let htmlLikes = `<div>${totalLikes} <div class="fa-solid fa-heart likesBtn"></div></div>`;
  let htmlPrice = `<div>${price}€ / jour</div>`;
  fixedInfoBloc.innerHTML = htmlLikes + htmlPrice;
}

function likesManager() {
  let likesBtn = document.getElementsByClassName('likesBtn');

  Array.from(likesBtn).map(btn => {
    btn.addEventListener('click', function () {
      console.log(btn.dataset.id)
      media.forEach((item) => {
        if (item.id === Number(btn.dataset.id)) {
          item.likes++
          console.log(item.likes);
          console.log(item);

          let likesCount = document.getElementById(`${btn.dataset.id}`);
          likesCount.innerHTML = item.likes;

          fixedInfoDisplay(media, photographerFiltered);
        }
      })
    })
  })

}

function toggleHiddenSort() {
  let sortButton = document.getElementById('dropdownMenuButton1');
  let sortMenu = document.getElementById('sortMenu');

  sortButton.addEventListener('click', () => {
    sortMenu.classList.add('show');
    sortButton.classList.add('hidden');
  })

  sortMenu.addEventListener('click', () => {
    sortMenu.classList.remove('show');
    sortButton.classList.remove('hidden');
  })
}


//####################################################################################################################################
// Modal Manager
function displayModal(photographer) {
  const openModalBtn = document.getElementById('openModalBtn');
  let modalTitleName = document.getElementById('modalTitleName');

  openModalBtn.addEventListener('click', () => {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block';
    modalTitleName.textContent = `${photographer[0].name}`;
    document.getElementById('firstName').focus();
  });
}

function closeModal() {
  const closeModalBtn = document.querySelector('#closeModalBtn');
  const modal = document.getElementById('contact_modal');

  closeModalBtn.addEventListener('click', () => {
    console.log('close form')
    modal.style.display = 'none';
  });
}

function sendForm() {
  const sendBtn = document.querySelector('#contact_button');

  sendBtn.addEventListener('click', function (event) {
    event.preventDefault();

    let firstName = document.querySelector('#firstName').value;
    let lastName = document.querySelector('#lastName').value;
    let mail = document.querySelector('#mail').value;
    let message = document.querySelector('#message').value;

    console.log(firstName, lastName, mail, message);

    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
  }, { once: true })
}

//####################################################################################################################################
// Light Box Manager
function displayLightBox() {
  let lightBox = document.getElementById('lightBox_modal');
  let slotToDisplay = document.getElementById('lightBox__slot');
  let arrayOfPhotoDisplayed = Array.from(document.getElementsByClassName('domCard__media--photo'));

  const arrayOfSources = [];
  console.log(arrayOfSources);

  // loop pour l'event de click
  arrayOfPhotoDisplayed.forEach((photo) => {
    arrayOfSources.push(photo.attributes.src.value);

    // gestion de l'event de click
    photo.addEventListener('click', function (event) {
      event.preventDefault();

      let srcFocus = event.target.attributes.src.value;
      createChildElement(slotToDisplay, srcFocus);
      lightBox.style.display = "block";
      arrayRightArrow(arrayOfSources, srcFocus);
      arrayLeftArrow(arrayOfSources, srcFocus);
      isManagingKeyboardNav(arrayOfSources, srcFocus);
    })

    // gestion d'open de la modal au clavier
    document.onkeydown = keyEnterLog;
    function keyEnterLog(event) {

      if (event.code === 'Enter') {

        let srcFocus = event.target.firstElementChild.firstElementChild.attributes.src.value;
        createChildElement(slotToDisplay, srcFocus);
        lightBox.style.display = "block";

        arrayRightArrow(arrayOfSources, srcFocus);
        arrayLeftArrow(arrayOfSources, srcFocus);
        isManagingKeyboardNav(arrayOfSources, srcFocus);
      }
    }

    // gestion du click sur une fleche droite
    function arrayRightArrow(arrayOfSources, srcFocus) {
      let rightArrow = document.getElementById('rightArrow');
      let imgSlot = document.getElementById('imgId');

      // Ecoute de click fleche droite
      rightArrow.addEventListener('click', function () {
        let indexOfThisPhoto = arrayOfSources.indexOf(srcFocus);
        let actualIndex = indexOfThisPhoto + 1;

        if (actualIndex > (arrayOfSources.length - 1)) {
          actualIndex = 0;
          srcFocus = arrayOfSources[actualIndex];
          imgSlot.setAttribute('src', srcFocus);
        } else {
          srcFocus = arrayOfSources[actualIndex];
          imgSlot.setAttribute('src', srcFocus);
        }
      })
    }
    // gestion du click sur fleche gauche
    function arrayLeftArrow(arrayOfSources, srcFocus) {
      let leftArrow = document.getElementById('leftArrow');
      let imgSlot = document.getElementById('imgId');

      // Ecoute de click fleche gauche
      leftArrow.addEventListener('click', function () {
        let indexOfThisPhoto = arrayOfSources.indexOf(srcFocus);
        let actualIndex = indexOfThisPhoto - 1;

        if (actualIndex < 0) {
          actualIndex = arrayOfSources.length - 1;
          srcFocus = arrayOfSources[actualIndex];
          imgSlot.setAttribute('src', srcFocus);
        } else {
          srcFocus = arrayOfSources[actualIndex];
          imgSlot.setAttribute('src', srcFocus);
        }
      })
    }

    // gestion de la navigation au clavier
    function isManagingKeyboardNav(arrayOfSources, srcFocus) {
      document.onkeydown = keyDownlog;

      function keyDownlog(event) {

        let indexOfThisPhoto = arrayOfSources.indexOf(srcFocus);
        let imgSlot = document.getElementById('imgId');
        let actualIndex;

        switch (event.code) {

          case 'ArrowRight':
            console.log(event.code, 'right');
            indexOfThisPhoto = arrayOfSources.indexOf(srcFocus);
            actualIndex = indexOfThisPhoto + 1;
            if (actualIndex > (arrayOfSources.length - 1)) {
              actualIndex = 0;
              srcFocus = arrayOfSources[actualIndex];
              imgSlot.setAttribute('src', srcFocus);
            } else {
              srcFocus = arrayOfSources[actualIndex];
              imgSlot.setAttribute('src', srcFocus);
            }
            break;

          case 'ArrowLeft':
            console.log(event.code, 'left');
            indexOfThisPhoto = arrayOfSources.indexOf(srcFocus);
            actualIndex = indexOfThisPhoto - 1;
            if (actualIndex < 0) {
              actualIndex = arrayOfSources.length - 1;
              srcFocus = arrayOfSources[actualIndex];
              imgSlot.setAttribute('src', srcFocus);
            } else {
              srcFocus = arrayOfSources[actualIndex];
              imgSlot.setAttribute('src', srcFocus);
            }
            break;

          case 'Backspace':
            console.log(event.code, 'back');
            let slotToDisplay = document.getElementById('lightBox__slot');
            let imgToRemove = document.getElementById('imgId');
            slotToDisplay.removeChild(imgToRemove);
            lightBox.style.display = "none";
            break;
        }
      }
    }
  })
}

// creer l'element a display (image ou miniature video)
function createChildElement(slotToDisplay, srcFocus) {
  console.log(srcFocus);

  const video = document.createElement('video');
  const source = document.createElement('source');
  source.setAttribute('src', srcFocus);
  source.setAttribute('id', 'videoId');
  video.appendChild(source);

  const img = document.createElement('img');
  img.setAttribute('src', srcFocus);
  img.setAttribute('id', 'imgId');

  let mimeType = srcFocus.split('.')[1];
  console.log(mimeType);
  if (mimeType === 'jpg') {
    video.setAttribute('class', 'hidden');
  } else {
    img.setAttribute('class', 'hidden');
  }

  slotToDisplay.appendChild(img);
  slotToDisplay.appendChild(video);
  return slotToDisplay;
}

// ferme la modal et supprime l'element (image ou miniature video)
function closeLightBox() {
  let lightBox = document.getElementById('lightBox_modal');
  let closeBtn = document.getElementById('closeLightBoxBtn');
  let slotToDisplay = document.getElementById('lightBox__slot');

  closeBtn.addEventListener('click', function () {
    let imgToRemove = document.getElementById('imgId');
    slotToDisplay.removeChild(imgToRemove);
    lightBox.style.display = "none";
    displayLightBox();
  })
}
