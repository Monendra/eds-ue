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
    [...row.children].forEach((col, index) => {
      const key = col.children[0]?.textContent.trim();
      const value = col.children[1]?.textContent.trim();
      
      if (key && value) {
        cardData[key.toLowerCase()] = value;
      }
    });
    
    // Clear the list item
    li.innerHTML = '';
    
    // Create card structure with image
    if (row.querySelector('picture')) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'cards-card-image';
      
      // Get the image
      const picture = row.querySelector('picture').cloneNode(true);
      const img = picture.querySelector('img');
      
      // Apply alt text if available
      if (cardData.imagealt) {
        img.alt = cardData.imagealt;
      }
      
      imageDiv.appendChild(picture);
      li.appendChild(imageDiv);
    }
    
    // Create card body with title, description, and button
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'cards-card-body';
    
    // Add title (H2)
    if (cardData.title) {
      const title = document.createElement('h2');
      title.textContent = cardData.title;
      bodyDiv.appendChild(title);
    }
    
    // Add description (can contain HTML)
    if (cardData.description) {
      const description = document.createElement('div');
      description.className = 'card-description';
      description.innerHTML = cardData.description;
      bodyDiv.appendChild(description);
    }
    
    // Add button if text and link are available
    if (cardData.buttontext || cardData.buttonlink) {
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'button-container';
      
      const button = document.createElement('a');
      button.className = 'button';
      button.href = cardData.buttonlink || '#';
      button.textContent = cardData.buttontext || 'FIND OUT MORE';
      
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
