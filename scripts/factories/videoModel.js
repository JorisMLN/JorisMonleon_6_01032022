import Media from '../factories/mediaModel.js'
class VideoModel extends Media {
  constructor(media) {
    super({ ...media, src: media.video })
  }

  getDomCard() {
    return `<div tabindex='1' class='domCard' data-id=${this.id}>
      <div class='domCard__media'>
        <video alt='${this.title}' class='domCard__media--photo' src='assets/images/${this.photographerId}/${this.src}'></video>
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

export default VideoModel;