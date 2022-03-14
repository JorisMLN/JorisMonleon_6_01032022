import media from '../data/media.js';

class MediaFactory {
  constructor(id, media) {

    media.map((item) => {

      if (id === item.photographerId && item.include("image")) {
        return new Image(media);
      } else if (id === item.photographerId && item.include("video")) {
        return new Video(media);
      } else {
        throw 'Unknown type format'
      }
    })
  }
}