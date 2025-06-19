/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default function decorate(block) {
  // Create footer element
  const footer = document.createElement('footer');
  footer.className = 'footer';

  // Create main content wrapper
  const mainContent = document.createElement('div');
  mainContent.className = 'footer-content';

  // Get sections from the block
  const sections = [...block.firstElementChild.children];

  // Left section - Acknowledgement
  const acknowledgementSection = sections[0];
  acknowledgementSection.className = 'footer-section acknowledgement';
  const ackTitle = acknowledgementSection.querySelector('h2');
  ackTitle.className = 'footer-title';
  
  // Add aboriginal flags after the title
  const ackFlags = document.createElement('span');
  ackFlags.className = 'aboriginal-flags';
  ackFlags.innerHTML = '🖤💛❤️💙'; // Using emojis as placeholder for flags
  ackTitle.after(ackFlags);

  // Right section - Contact & Social
  const rightSection = document.createElement('div');
  rightSection.className = 'footer-section contact-social';

  // Contact Us
  const contactSection = sections[1];
  const contactTitle = contactSection.querySelector('h2');
  contactTitle.className = 'footer-title';
  const [phone, address] = contactSection.querySelectorAll('p');
  phone.innerHTML = `<span class="icon">📞</span> ${phone.textContent}`;
  address.innerHTML = `<span class="icon">📍</span> ${address.innerHTML}`;
  rightSection.append(contactTitle, phone, address);

  // Follow Us
  const socialSection = sections[2];
  const socialTitle = socialSection.querySelector('h2');
  socialTitle.className = 'footer-title';
  const socialLinks = socialSection.querySelector('div');
  socialLinks.className = 'social-links';
  const socialAnchors = socialLinks.querySelectorAll('a');
  socialAnchors.forEach(anchor => {
    anchor.className = `social-link ${anchor.textContent.toLowerCase()}`;
  });
  rightSection.append(socialTitle, socialLinks);

  // Bottom links
  const bottomLinks = sections[3];
  bottomLinks.className = 'footer-links';

  // Copyright text
  const copyright = document.createElement('div');
  copyright.className = 'footer-copyright';
  copyright.innerHTML = 'Western Sydney University Copyright © 2004-2025 | ABN 53 014 069 881 | CRICOS Provider No: 00917K | TEQSA Provider ID: PRV12061 (Australian University)';

  // Assemble the footer
  mainContent.append(acknowledgementSection, rightSection);
  footer.append(mainContent, bottomLinks, copyright);

  // Clear and append
  block.textContent = '';
  block.append(footer);
}
