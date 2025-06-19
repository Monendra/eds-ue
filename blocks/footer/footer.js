/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default function decorate(block) {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  // Create the main content wrapper
  const mainContent = document.createElement('div');
  mainContent.className = 'footer-content';

  // Left section - Acknowledgement
  const leftSection = document.createElement('div');
  leftSection.className = 'footer-section acknowledgement';
  
  const ackTitle = document.createElement('h2');
  ackTitle.textContent = 'Acknowledgement of Country';
  ackTitle.className = 'footer-title';
  
  const ackFlags = document.createElement('span');
  ackFlags.className = 'aboriginal-flags';
  ackFlags.innerHTML = '🖤💛❤️💙'; // Using emojis as placeholder for flags
  
  const ackText = document.createElement('p');
  ackText.textContent = 'With respect for Aboriginal cultural protocol and out of recognition that its campuses occupy their traditional lands, Western Sydney University acknowledges the Darug, Eora, Dharawal (also referred to as Tharawal) and Wiradjuri peoples and thanks them for their support of its work in their lands in Greater Western Sydney and beyond.';
  
  leftSection.append(ackTitle, ackFlags, ackText);

  // Right section - Contact & Social
  const rightSection = document.createElement('div');
  rightSection.className = 'footer-section contact-social';

  // Contact Us
  const contactTitle = document.createElement('h2');
  contactTitle.textContent = 'Contact Us';
  contactTitle.className = 'footer-title';

  const phone = document.createElement('p');
  phone.innerHTML = '<span class="icon">📞</span> 1300 668 370';
  
  const address = document.createElement('p');
  address.innerHTML = '<span class="icon">📍</span> Locked Bag 1797<br>Penrith<br>NSW 2751';

  // Follow Us
  const followTitle = document.createElement('h2');
  followTitle.textContent = 'Follow Us';
  followTitle.className = 'footer-title';

  const socialLinks = document.createElement('div');
  socialLinks.className = 'social-links';
  socialLinks.innerHTML = `
    <a href="#" class="social-link facebook">Facebook</a>
    <a href="#" class="social-link instagram">Instagram</a>
    <a href="#" class="social-link twitter">Twitter</a>
    <a href="#" class="social-link snapchat">Snapchat</a>
    <a href="#" class="social-link linkedin">LinkedIn</a>
    <a href="#" class="social-link tiktok">TikTok</a>
  `;

  rightSection.append(contactTitle, phone, address, followTitle, socialLinks);

  // Bottom links
  const bottomLinks = document.createElement('div');
  bottomLinks.className = 'footer-links';
  bottomLinks.innerHTML = `
    <a href="#">Accessibility</a>
    <a href="#">Disclaimer</a>
    <a href="#">Privacy</a>
    <a href="#">Copyright</a>
    <a href="#">Complaints Unit</a>
    <a href="#">Admissions Transparency</a>
    <a href="#">Right to Information</a>
    <a href="#">Emergency Help</a>
    <a href="#">Website Feedback</a>
  `;

  // Copyright text
  const copyright = document.createElement('div');
  copyright.className = 'footer-copyright';
  copyright.innerHTML = 'Western Sydney University Copyright © 2004-2025 | ABN 53 014 069 881 | CRICOS Provider No: 00917K | TEQSA Provider ID: PRV12061 (Australian University)';

  // Assemble the footer
  mainContent.append(leftSection, rightSection);
  footer.append(mainContent, bottomLinks, copyright);
  
  // Clear and append
  block.textContent = '';
  block.append(footer);
}
