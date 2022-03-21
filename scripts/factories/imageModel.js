import Media from '../factories/mediaModel.js'

class ImageModel extends Media {
  constructor(media) {
    super({...media, src: media.image})
  }

  getDomCard(){
    return `<div class='domCard'>
      <div class='domCard__media'></div>
      ${this.title}
    </div>`;
  }
}

export default ImageModel;