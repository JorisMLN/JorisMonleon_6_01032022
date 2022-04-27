class Media{
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.likes = media.likes;
    this.date = media.date;
    this.src = media.src; 
  }

  getDomCard(){}
}

export default Media;