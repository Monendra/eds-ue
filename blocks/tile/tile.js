export default function decorate(block) {
  const tileWrapper = document.createElement('article');
  tileWrapper.className = 'tile tile__2x1';

  // Get content from the block
  const rows = block.children;
  let backgroundUrl = '';
  let href = '#';
  let title = '';

  // Extract content from the block structure
  [...rows].forEach((row) => {
    const anchor = row.querySelector('a');
    const img = row.querySelector('img');
    const text = row.textContent.trim();

    if (img) {
      backgroundUrl = img.src;
    }
    if (anchor) {
      href = anchor.href;
    }
    if (text && !text.includes('Link here')) {
      title = text;
    }
  });

  // Create the inner structure
  const html = `
    <a href="${href}" title="${title}">
      <div class="tile__wrapper" style="background-image: url('${backgroundUrl}');">
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