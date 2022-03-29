import Media from '../factories/mediaModel.js'
class VideoModel extends Media {
  constructor(media) {
    super({ ...media, src: media.video })
  }

  getDomCard() {
    return `<div class='domCard'>
      <div class='domCard__media'>
        <video class='domCard__media--photo'>
          <source src='assets/images/${this.photographerId}/${this.src}'>
        </video>
      </div>
      <div class='domCard__bot'>
        <div>${this.title}</div>
        <div class='domCard__bot--likes'>
          ${this.likes}
          <img alt='button like' src="assets/icons/heart.png" />
        </div>  
      </div>
    </div>`;
  }
}

export default VideoModel;