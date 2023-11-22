const header = document.getElementById('header');
function updateContentPadding() {
    const content = document.getElementById('content');
    const headerHeight = header.offsetHeight; // Get the height of the header
    content.style.paddingTop = headerHeight + 'px'; // Set padding-top to header height
}
window.addEventListener('load', updateContentPadding);
window.addEventListener('resize', updateContentPadding);