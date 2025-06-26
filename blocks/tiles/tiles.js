import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the unordered list container
  const ul = document.createElement('ul');
  ul.setAttribute('role', 'list'); // ARIA role for better accessibility

  // Process each row in the block
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    
    // Check if the row has an image
    const imageDiv = row.querySelector('picture') ? 
      row.querySelector('picture').closest('div') : null;
    
    // Find the title content - either in the second div or the first non-image div
    let titleContent = '';
    let titleDiv = null;
    
    if (imageDiv) {
      // If we have an image, find the non-image div for the title
      [...row.children].forEach((div) => {
        if (div !== imageDiv && !titleContent) {
          titleContent = div.textContent.trim();
          titleDiv = div;
        }
      });
    } else {
      // No image, use the second div (or first if only one exists)
      titleDiv = row.children[1] || row.children[0];
      titleContent = titleDiv?.textContent.trim() || '';
    }
    
    // If we found an image, add it to the tile
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        li.appendChild(optimizedPic);
      }
    }
    
    // Create and add the title div
    const tilesTitleDiv = document.createElement('div');
    tilesTitleDiv.className = 'tiles-title';
    tilesTitleDiv.textContent = titleContent;
    
    // Add ARIA label for better accessibility
    li.setAttribute('aria-label', titleContent);
    
    li.appendChild(tilesTitleDiv);
    ul.appendChild(li);
    
    // Make the entire tile clickable if there's a link
    const link = titleDiv?.querySelector('a');
    if (link) {
      const href = link.getAttribute('href');
      li.addEventListener('click', () => {
        window.location.href = href;
      });
      li.style.cursor = 'pointer';
    }
  });

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(ul);
}
