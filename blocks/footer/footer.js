import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Create the footer structure programmatically
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';
  
  // Acknowledgement of Country section
  const acknowledgementSection = document.createElement('div');
  acknowledgementSection.className = 'footer-top';
  acknowledgementSection.innerHTML = `
    <div class="acknowledgement">
      <h2>Acknowledgement of Country</h2>
      <div class="flag-container">
        <div class="aboriginal-flag" title="Aboriginal Flag"></div>
        <div class="torres-strait-flag" title="Torres Strait Islander Flag"></div>
      </div>
      <p>With respect for Aboriginal cultural protocol and out of recognition that its campuses occupy their traditional lands, Western Sydney University acknowledges the Darug, Eora, Dharawal (also referred to as Tharawal) and Wiradjuri peoples and thanks them for their support of its work in their lands in Greater Western Sydney and beyond.</p>
    </div>
  `;
  
  // Footer links section
  const linksSection = document.createElement('div');
  linksSection.className = 'footer-links';
  linksSection.innerHTML = `
    <ul class="links-group">
      <li><a href="#">Accessibility</a></li>
      <li><a href="#">Disclaimer</a></li>
      <li><a href="#">Privacy</a></li>
      <li><a href="#">Copyright</a></li>
    </ul>
    <ul class="links-group">
      <li><a href="#">Complaints Unit</a></li>
      <li><a href="#">Admissions Transparency</a></li>
      <li><a href="#">Right to Information</a></li>
      <li><a href="#">Emergency Help</a></li>
    </ul>
  `;
  
  // Website feedback and copyright section
  const bottomSection = document.createElement('div');
  bottomSection.className = 'footer-bottom';
  bottomSection.innerHTML = `
    <div class="feedback-button">
      <a href="#" class="button">Website Feedback</a>
    </div>
    <p>Western Sydney University Copyright © 2004-2025  |  ABN 53 014 069 881  |  CRICOS Provider No: 00917K  |  TEQSA Provider ID: PRV12061 (Australian University)</p>
  `;
  
  // Contact Us section
  const contactSection = document.createElement('div');
  contactSection.className = 'contact-info';
  contactSection.innerHTML = `
    <h2>Contact Us</h2>
    <ul>
      <li class="phone"><a href="tel:1300668370">1300 668 370</a></li>
      <li class="address">
        <p>Locked Bag 1797<br>Penrith<br>NSW 2751</p>
      </li>
    </ul>
  `;
  
  // Follow Us section
  const followSection = document.createElement('div');
  followSection.className = 'follow-us';
  followSection.innerHTML = `
    <h2>Follow Us</h2>
    <div class="social-icons">
      <a href="#" class="social-icon facebook">
        <img src="/icons/socm_icon_fb2.svg" alt="Facebook">
      </a>
      <a href="#" class="social-icon instagram">
        <img src="/icons/socm_icon_insta2.svg" alt="Instagram">
      </a>
      <a href="#" class="social-icon twitter">
        <img src="/icons/socm_icon_x2.svg" alt="X">
      </a>
      <a href="#" class="social-icon snapchat">
        <img src="/icons/socm_icon_snp2.svg" alt="Snapchat">
      </a>
      <a href="#" class="social-icon linkedin">
        <img src="/icons/socm_icon_in2.svg" alt="LinkedIn">
      </a>
      <a href="#" class="social-icon tiktok">
        <img src="/icons/socm_icon_tt2.svg" alt="TikTok">
      </a>
    </div>
  `;
  
  // Append contact and follow sections to the right column
  const rightColumn = document.createElement('div');
  rightColumn.className = 'right-column';
  rightColumn.appendChild(contactSection);
  rightColumn.appendChild(followSection);
  
  // Append right column to acknowledgement section
  acknowledgementSection.appendChild(rightColumn);
  
  // Append all sections to footer container
  footerContainer.appendChild(acknowledgementSection);
  footerContainer.appendChild(linksSection);
  footerContainer.appendChild(bottomSection);
  
  // Clear and append the new structure
  footer.innerHTML = '';
  footer.appendChild(footerContainer);

  block.append(footer);
}
