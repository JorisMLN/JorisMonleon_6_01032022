import Media from '../factories/mediaModel.js'

class ImageModel extends Media {
  constructor(media) {
    super({...media, src: media.image})
  }

  getDomCard(){
    return `<div>${this.id}</div>`;
  }
}

export default ImageModel;