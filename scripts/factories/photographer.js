function photographerFactory(data) {
  const { name, portrait, country, tagline, id, city, price } = data;

  return `<article class='article'>
      <div class='article__top'>
        <a href='photographer.html?id=${id}'>
          <img alt='Voir page du photographe ${name}' class='photo' src='assets/photographers/${portrait}'>
        </a>
        <h2>${name}</h2>
      </div>
      <div class='article__bot'>
        <div class='city'>${city}, ${country}</div>
        <div class='tag'>${tagline}</div>
        <div class='price'>${price}$/jour</div>
      <div>
      </div>
  </article>`;
}

export default photographerFactory;