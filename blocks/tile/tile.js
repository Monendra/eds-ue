export default function decorate(block) {
  // Get the content from the block
  const content = block.firstElementChild;
  if (!content) return;

  // Get the image and link if they exist
  const picture = content.querySelector('picture');
  const link = content.querySelector('a');
  const linkHref = link ? link.href : '#';
  
  // Get the text content (title)
  const text = content.textContent.trim();

  // Clear existing content
  block.textContent = '';

  // Add component classes to the block
  block.className = 'component component--tile aem-GridColumn aem-GridColumn--default--12';

  // Create article element with tile classes
  const article = document.createElement('article');
  article.className = 'tile tile__theme tile__2x1 has-image';
  article.id = `h${Math.random().toString(36).substr(2, 7)}`;

  // Create link element
  const a = document.createElement('a');
  a.href = linkHref;
  a.title = text;

  // Create wrapper div
  const wrapper = document.createElement('div');
  wrapper.className = 'tile__wrapper js-resizer-background';
  wrapper.id = text;

  // If we have a picture, set it as background image
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const imgSrc = img.getAttribute('src');
      wrapper.style.backgroundImage = `url("${imgSrc}")`;
    }
  }

  // Create the nested structure exactly as provided
  const info = document.createElement('div');
  info.className = 'tile__info';

  const tileContent = document.createElement('div');
  tileContent.className = 'tile__content black';

  const titleComponent = document.createElement('div');
  titleComponent.className = 'component component--title';

  const titleText = document.createElement('p');
  titleText.className = 'title__text secondary';
  titleText.textContent = text;

  // Assemble the nested structure
  titleComponent.appendChild(titleText);
  tileContent.appendChild(titleComponent);
  info.appendChild(tileContent);
  wrapper.appendChild(info);
  a.appendChild(wrapper);
  article.appendChild(a);
  block.appendChild(article);
}
