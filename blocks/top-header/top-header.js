import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

/**
 * Decorates the top header
 * @param {Element} block The top-header block element
 */
export default async function decorate(block) {
  // Extract configuration from block content
  const config = {};
  
  // Process rows to extract configuration
  [...block.children].forEach((row) => {
    const cols = [...row.children];
    if (cols.length === 2) {
      const key = cols[0].textContent.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
      const value = cols[1].textContent.trim();
      config[key] = value;
    }
  });
  
  // Set default values if not provided
  const studentsLink = config['students-link'] || 'https://www.westernsydney.edu.au/students';
  const staffLink = config['staff-link'] || 'https://www.westernsydney.edu.au/staff';
  const mywesternLink = config['mywestern-link'] || 'https://www.westernsydney.edu.au/mywestern';
  const searchLinkUrl = config['search-link'] || 'https://www.westernsydney.edu.au/search';
  const signIntoText = config['sign-into-text'] || 'SIGN INTO';
  
  // Create the top header structure
  const topHeader = document.createElement('div');
  topHeader.className = 'header--action--bar bg--dark-grey red_theme';
  
  // Left column with navigation links
  const leftCol = document.createElement('div');
  leftCol.className = 'header__col western--agents';
  
  // Create the navigation links for STUDENTS, STAFF, and MYWESTERN
  const navItems = [
    { text: 'STUDENTS', href: studentsLink, id: 'studentsLP' },
    { text: 'STAFF', href: staffLink, id: 'staffLP' },
    { text: 'MYWESTERN', href: mywesternLink, id: 'mywesternLP', target: 'blank' }
  ];
  
  navItems.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.className = 'header__col--wrapper';
    
    const link = document.createElement('a');
    link.href = item.href;
    link.className = 'western--online header__action--hyperlink btn color--white';
    link.target = item.target || '_self';
    link.id = item.id;
    link.setAttribute('aria-label', 'navigation');
    link.textContent = item.text;
    
    wrapper.appendChild(link);
    leftCol.appendChild(wrapper);
  });
  
  // Right column with search and sign in
  const rightCol = document.createElement('div');
  rightCol.className = 'header__col';
  
  // Icons section (search icon)
  const iconsDiv = document.createElement('div');
  iconsDiv.className = 'header__icons';
  
  // Arrow icon (hidden by default)
  const arrowIcon = document.createElement('div');
  arrowIcon.className = 'arrow--icon';
  const arrowLink = document.createElement('a');
  arrowLink.href = searchLinkUrl;
  arrowLink.setAttribute('aria-label', 'course-compare');
  arrowLink.style.display = 'none';
  
  const circleRedCount = document.createElement('div');
  circleRedCount.className = 'circle-red-count';
  circleRedCount.style.display = 'none';
  circleRedCount.textContent = '0';
  
  arrowLink.appendChild(document.createElement('img'));
  arrowLink.appendChild(circleRedCount);
  arrowIcon.appendChild(arrowLink);
  
  // Search icon
  const searchIcon = document.createElement('div');
  searchIcon.className = 'search--icon';
  const searchIconLink = document.createElement('a');
  searchIconLink.href = searchLinkUrl;
  searchIconLink.setAttribute('aria-label', 'search-icon');
  
  const searchImg = document.createElement('img');
  searchImg.src = '/content/dam/digital/icons/Magnifying-Glass-Search-Icon.png';
  searchImg.alt = 'Search Western Sydney University website';
  
  searchIconLink.appendChild(searchImg);
  searchIcon.appendChild(searchIconLink);
  
  iconsDiv.appendChild(arrowIcon);
  iconsDiv.appendChild(searchIcon);
  
  // Sign Into button
  const btnDiv = document.createElement('div');
  btnDiv.className = 'wsu__button';
  
  const btnWrap = document.createElement('div');
  btnWrap.className = 'button cmp-button--solid cmp-button--black';
  
  const btnLink = document.createElement('a');
  btnLink.role = 'button';
  btnLink.className = 'header__action--lightbox cmp-button';
  btnLink.href = 'javascript:void(0)';
  btnLink.onclick = "openLightBox(event, 'actionbar--lightbox--cta--1', 'lightbox--sm', 'actionbar--cta--1', false);";
  btnLink.id = 'signInto';
  btnLink.setAttribute('aria-label', 'lightbox');
  
  const btnText = document.createElement('span');
  btnText.className = 'cmp-button__text';
  btnText.textContent = signIntoText;
  
  btnLink.appendChild(btnText);
  btnWrap.appendChild(btnLink);
  btnDiv.appendChild(btnWrap);
  
  // Add lightbox content placeholder
  const lightboxContent = document.createElement('div');
  lightboxContent.id = 'actionbar--cta--1';
  lightboxContent.style.display = 'none';
  btnWrap.appendChild(lightboxContent);
  
  // Assemble right column
  rightCol.appendChild(iconsDiv);
  rightCol.appendChild(btnDiv);
  
  // Assemble top header
  topHeader.appendChild(leftCol);
  topHeader.appendChild(rightCol);
  
  // Replace the block content with our structure
  block.textContent = '';
  block.appendChild(topHeader);
  
  // Add lightbox functionality
  if (typeof window.openLightBox !== 'function') {
    window.openLightBox = function(event, lightboxId, lightboxSize, contentId, isIframe) {
      event.preventDefault();
      const lightbox = document.querySelector('.lightbox');
      const backdrop = document.querySelector('.lightbox--backdrop');
      const lightboxBody = lightbox.querySelector('.lightbox--body');
      
      // Set lightbox size
      lightbox.classList.add(lightboxSize);
      
      // Get content
      const content = document.getElementById(contentId);
      if (content) {
        lightboxBody.innerHTML = '';
        if (isIframe) {
          const iframe = document.createElement('iframe');
          iframe.src = content.getAttribute('data-src');
          iframe.width = '100%';
          iframe.height = '100%';
          iframe.frameBorder = '0';
          lightboxBody.appendChild(iframe);
        } else {
          lightboxBody.innerHTML = content.innerHTML;
        }
      }
      
      // Show lightbox
      lightbox.classList.add('show');
      backdrop.classList.add('show');
      
      // Close button functionality
      const closeBtn = lightbox.querySelector('.close');
      closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('show');
        backdrop.classList.remove('show');
      });
      
      // Close on backdrop click
      backdrop.addEventListener('click', function() {
        lightbox.classList.remove('show');
        backdrop.classList.remove('show');
      });
    };
  }
  
  // Create lightbox structure if it doesn't exist
  if (!document.querySelector('.lightbox')) {
    const lightboxHTML = `
      <div class="lightbox lightbox__action fade" tabindex="-1" role="dialog">
        <div class="lightbox--dialog lightbox--dialog--centered" role="document">
          <div class="lightbox--content bg--white">
            <div class="lightbox--header">
              <button type="button" class="close" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <path d="M18.667,1.88,16.787,0,9.333,7.453,1.88,0,0,1.88,7.453,9.333,0,16.787l1.88,1.88,7.453-7.453,7.453,7.453,1.88-1.88L11.213,9.333Z" transform="translate(6.667 6.667)"></path>
                </svg>
              </button>
            </div>
            <div class="lightbox--body">
            </div>
          </div>
        </div>
      </div>
      <div class="lightbox--backdrop fade bg--dark-grey background--blur--medium background--opacity--medium" data-modal-backdrop="lightboxId"></div>
    `;
    
    const lightboxContainer = document.createElement('div');
    lightboxContainer.innerHTML = lightboxHTML;
    document.body.appendChild(lightboxContainer);
  }
} 