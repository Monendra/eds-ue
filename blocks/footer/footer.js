export default function decorate(block) {
  block.classList.add('footer');
  
  // Get the content div
  const content = block.firstElementChild;
  if (content) {
    content.classList.add('footer-content');
  }
}
