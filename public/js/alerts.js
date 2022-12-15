// Import DOM
// Error Messages Elms
const errContainerDom = document.querySelector('.err');
const errMessageDom = document.querySelector('.err__message');

// Global variable
let errTimeout = 0;

/**
 * Display err using err-container popup at the top of the page
 * @param {String} text the text that will show on the error popup
 */
export function showError(text) {
  if (errTimeout > 0) clearTimeout(errTimeout); //remove timer if it was already set below (which would have a val>0)
  errMessageDom.innerHTML = text;
  errContainerDom.classList.add('err--active');

  errTimeout = window.setTimeout(() => {
    errContainerDom.classList.remove('err--active');
  }, 7000);
}
