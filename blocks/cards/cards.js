import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    
    // Process each column in the row
    while (row.firstElementChild) li.append(row.firstElementChild);
    
    // Organize card content
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
        
        // Ensure proper heading structure
        const firstChild = div.firstElementChild;
        if (firstChild && (firstChild.tagName !== 'H2' && firstChild.tagName !== 'H3')) {
          // If the first element is not a heading, wrap content in appropriate elements
          const content = div.innerHTML;
          const titleText = div.textContent.split('\n')[0] || 'Card Title';
          const paragraphText = div.textContent.replace(titleText, '').trim();
          
          div.innerHTML = `
            <h3>${titleText}</h3>
            <p>${paragraphText}</p>
          `;
        }
      }
    });
    
    ul.append(li);
  });
  
  // Optimize images
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  
  block.textContent = '';
  block.append(ul);
}
