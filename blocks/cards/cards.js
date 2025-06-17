import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    
    // Extract structured data from the row
    const cardData = {};
    
    // Process each column in the row to extract structured data
    [...row.children].forEach((col) => {
      const key = col.children[0]?.textContent.trim();
      const value = col.children[1]?.innerHTML.trim();
      
      if (key && value) {
        cardData[key.toLowerCase()] = value;
      }
    });
    
    // Create card structure with image
    if (row.querySelector('picture')) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'cards-card-image';
      
      // Get the image
      const picture = row.querySelector('picture').cloneNode(true);
      imageDiv.appendChild(picture);
      li.appendChild(imageDiv);
    }
    
    // Create card body with title, description, and button
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'cards-card-body';
    
    // No processing needed - just use the data as provided
    bodyDiv.innerHTML = `
      <h3>${cardData.title}</h3>
      <p>${cardData.description}</p>
    `;
    
    // Add button if text and link are available
    if (cardData.buttontext && cardData.buttonlink) {
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'button-container';
      
      const button = document.createElement('a');
      button.className = 'button';
      button.href = cardData.buttonlink;
      button.textContent = cardData.buttontext;
      
      buttonContainer.appendChild(button);
      bodyDiv.appendChild(buttonContainer);
    }
    
    li.appendChild(bodyDiv);
    ul.appendChild(li);
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
