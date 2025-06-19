export default function decorate(block) {
  const tileWrapper = document.createElement('article');
  tileWrapper.className = 'tile tile__theme tile__2x1 has-image';

  // Get content from the block
  const link = block.querySelector('a') || { href: '#', textContent: '' };
  const title = link.textContent;
  const backgroundImage = block.querySelector('img');
  const backgroundUrl = backgroundImage ? backgroundImage.src : '';

  // Create the inner structure
  const html = `
    <a href="${link.href}" title="${title}">
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