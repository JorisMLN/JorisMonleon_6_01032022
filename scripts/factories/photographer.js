
function photographerFactory(data) {
  const { name, portrait, country, tagline, id } = data;

  const picture = `assets/photographers/${portrait}`;
  const href = `photographer.html?id=${id}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    const link = document.createElement('a');
    link.setAttribute("href", href)

    const img = document.createElement('img');
    img.setAttribute("src", picture)

    const h2 = document.createElement('h2');
    h2.textContent = name;

    const p = document.createElement('p');
    p.textContent = country;

    const p2 = document.createElement('p');
    p2.textContent = tagline;

    link.appendChild(img);
    article.appendChild(link);
    article.appendChild(h2);
    article.appendChild(p);
    article.appendChild(p2);

    return (article);
  }

  return { name, picture, getUserCardDOM }
}

export default photographerFactory;