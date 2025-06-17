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
        
        // Remove any existing buttons to prevent duplicates
        const existingButtons = div.querySelectorAll('.button-container, .button');
        existingButtons.forEach(btn => btn.remove());
        
        // Check for button configuration
        let buttonText = 'FIND OUT MORE';
        let buttonLink = '#';
        
        // Extract button text and link if they exist in the content
        // Look for divs that might contain button configuration
        const divChildren = Array.from(div.children);
        
        // Check the last two divs if they exist and might be button config
        if (divChildren.length >= 2) {
          const lastIndex = divChildren.length - 1;
          const secondLastIndex = divChildren.length - 2;
          
          // Check if these look like simple text containers for button config
          if (divChildren[secondLastIndex].children.length === 0 && 
              divChildren[lastIndex].children.length === 0) {
            
            buttonText = divChildren[secondLastIndex].textContent.trim();
            buttonLink = divChildren[lastIndex].textContent.trim();
            
            // Remove these divs as they're just configuration
            divChildren[lastIndex].remove();
            divChildren[secondLastIndex].remove();
          }
        }
        
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
        
        // Add button
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        const button = document.createElement('a');
        button.className = 'button';
        button.href = buttonLink;
        button.textContent = buttonText;
        
        buttonContainer.appendChild(button);
        div.appendChild(buttonContainer);
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
