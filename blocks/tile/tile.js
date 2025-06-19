export default function decorate(block) {
  const tileWrapper = document.createElement('article');
  tileWrapper.className = 'tile tile__theme tile__2x1 has-image';

  // Get content from the block
  const div = block.querySelector('div');
  const img = div.querySelector('img');
  const link = div.querySelector('a');
  
  const title = link ? link.textContent : '';
  const href = link ? link.href : '#';
  const backgroundUrl = img ? img.src : '';

  // Create the inner structure
  const html = `
    <a href="${href}" title="${title}">
      <div class="tile__wrapper js-resizer-background" style="background-image: url('${backgroundUrl}');">
        <div class="tile__info">
          <div class="tile__content black">
            <div class="component component--title">
              <p class="title__text secondary">${title}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  `;

  tileWrapper.innerHTML = html;
  block.textContent = '';
  block.append(tileWrapper);
} 