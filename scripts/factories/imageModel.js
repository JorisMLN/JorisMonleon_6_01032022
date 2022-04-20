import Media from '../factories/mediaModel.js'

class ImageModel extends Media {
  constructor(media) {
    super({ ...media, src: media.image })
  }

  getDomCard() {
    return `<div class='domCard'>
      <div class='domCard__media'>
        <img class='domCard__media--photo' src='assets/images/${this.photographerId}/${this.src}'></img>
      </div>
      <div class='domCard__bot'>
        <div>${this.title}</div>
        <div class='domCard__bot--likes'>
          <div id='${this.id}' class='domCard__bot--likes--count'>${this.likes}</div>
          <div data-id=${this.id} class="fa-solid fa-heart likesBtn"></div>
        </div>  
      </div>
    </div>`;
  }
}

export default ImageModel;