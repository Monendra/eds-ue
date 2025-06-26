import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the unordered list container
  const ul = document.createElement('ul');
  ul.setAttribute('role', 'list'); // ARIA role for better accessibility

  // Process each row in the block
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    
    // Look for specific field keys in the row
    let imageDiv = null;
    let tileBodyDiv = null;
    
    // Find the image and tileBody divs based on the model fields
    [...row.children].forEach((div) => {
      const key = div.children[0]?.textContent?.trim().toLowerCase();
      
      if (key === 'image' && div.children[1]?.querySelector('picture')) {
        imageDiv = div.children[1];
      } else if (key === 'tilebody' || key === 'tile body content') {
        tileBodyDiv = div.children[1];
      }
    });
    
    // If we found an image, add it to the tile
    if (imageDiv && imageDiv.querySelector('picture')) {
      const img = imageDiv.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        li.appendChild(optimizedPic);
      }
    }
    
    // Get the tile content from the tileBody field or fallback to the second div
    let tileContent = '';
    if (tileBodyDiv) {
      tileContent = tileBodyDiv.innerHTML;
    } else {
      // Fallback to the old method if tileBody field is not found
      const titleDiv = row.children[1] || row.children[0];
      tileContent = titleDiv?.textContent.trim() || '';
    }
    
    // Create and add the title div
    const tilesTitleDiv = document.createElement('div');
    tilesTitleDiv.className = 'tiles-title';
    tilesTitleDiv.innerHTML = tileContent; // Use innerHTML to preserve rich text formatting
    
    // Add ARIA label for better accessibility
    const textContent = tilesTitleDiv.textContent.trim();
    li.setAttribute('aria-label', textContent);
    
    li.appendChild(tilesTitleDiv);
    ul.appendChild(li);
    
    // Make the entire tile clickable if there's a link
    const link = tilesTitleDiv.querySelector('a');
    if (link) {
      const href = link.getAttribute('href');
      li.addEventListener('click', (e) => {
        // Don't trigger if the click was on the link itself (to allow right-click menu)
        if (e.target !== link && !link.contains(e.target)) {
          window.location.href = href;
        }
      });
      li.style.cursor = 'pointer';
    }
  });

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(ul);
}
