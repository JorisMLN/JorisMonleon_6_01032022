import Media from '../factories/mediaModel.js'
class VideoModel extends Media{
  constructor(media) {
    super({...media, src: media.video})
  }

  getDomCard(){
    return `<div class='domCard'>
      <div class='domCard__media'>
        <video class='domCard__media--photo'>
          <source src='assets/images/${this.photographerId}/${this.src}'>
        </video>
      </div>
      <div class='domCard__bot'>
        <div>${this.title}</div><button>${this.likes}</button>
      </div>
    </div>`;
  }
}

export default VideoModel;