import Media from '../factories/mediaModel.js'
class VideoModel extends Media{
  constructor(media) {
    super({...media, src: media.video})
  }
}

export default VideoModel;