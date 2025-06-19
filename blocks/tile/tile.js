export default function decorate(block) {
  // Get title and link from block data
  const title = block.textContent.trim();
  const link = block.querySelector('a')?.href || '';

  // Clear existing content
  block.textContent = '';

  // Create article element with tile classes
  const article = document.createElement('article');
  article.className = 'tile tile__theme tile__2x1 has-image';

  // Create link element
  const a = document.createElement('a');
  a.href = link;
  a.title = title;

  // Create wrapper div
  const wrapper = document.createElement('div');
  wrapper.className = 'tile__wrapper';

  // Create info and content divs
  const info = document.createElement('div');
  info.className = 'tile__info';

  const content = document.createElement('div');
  content.className = 'tile__content black';

  // Create title component
  const titleComponent = document.createElement('div');
  titleComponent.className = 'component component--title';

  const titleText = document.createElement('p');
  titleText.className = 'title__text secondary';
  titleText.textContent = title;

  // Assemble the structure
  titleComponent.appendChild(titleText);
  content.appendChild(titleComponent);
  info.appendChild(content);
  wrapper.appendChild(info);
  a.appendChild(wrapper);
  article.appendChild(a);
  block.appendChild(article);
}
