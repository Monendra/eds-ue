import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the unordered list container
  const ul = document.createElement('ul');
  ul.setAttribute('role', 'list'); // ARIA role for better accessibility

  // Process each row in the block
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    
    // Find the tileText field
    let tileText = '';
    
    // Look for the tileText field in the row
    [...row.children].forEach((div) => {
      const key = div.children[0]?.textContent?.trim().toLowerCase();
      
      if (key === 'tiletext' || key === 'tile text') {
        const valueDiv = div.children[1];
        if (valueDiv) {
          tileText = valueDiv.innerHTML;
        }
      }
    });
    
    // If tileText is not found, use fallback method (for backward compatibility)
    if (!tileText) {
      // Use the content of the first or second div as fallback
      const contentDiv = row.children[1] || row.children[0];
      if (contentDiv) {
        tileText = contentDiv.textContent.trim();
      }
    }
    
    // Create and add the title div
    const tilesTitleDiv = document.createElement('div');
    tilesTitleDiv.className = 'tiles-title';
    tilesTitleDiv.innerHTML = tileText; // Use innerHTML to preserve rich text formatting
    
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
