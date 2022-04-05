import Media from '../factories/mediaModel.js'
class VideoModel extends Media {
  constructor(media) {
    super({ ...media, src: media.video })
  }

  getDomCard() {
    return `<div class='domCard'>
      <div class='domCard__media'>
        <video>
          <source class='domCard__media--photo' src='assets/images/${this.photographerId}/${this.src}'>
        </video>
      </div>
      <div class='domCard__bot'>
        <div>${this.title}</div>
        <div class='domCard__bot--likes'>
          <div id='${this.id}' class='domCard__bot--likes--count'>${this.likes}</div>
          <img data-id=${this.id} class='likesBtn' alt='button like' src="assets/icons/heart.png" />
        </div>  
      </div>
    </div>`;
  }
}

export default VideoModel;