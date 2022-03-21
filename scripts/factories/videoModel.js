import Media from '../factories/mediaModel.js'
class VideoModel extends Media{
  constructor(media) {
    super({...media, src: media.video})
  }

  getDomCard(){
    return `<div class='domCard'>
      <div class='domCard__media'></div>
      ${this.title}
    </div>`;
  }
}

export default VideoModel;