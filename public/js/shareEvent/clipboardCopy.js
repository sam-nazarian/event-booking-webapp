import { showError } from '../utilities/alerts';
const invitationUrlEl = document.querySelector('.invitation__url');

export function clipboardCopy() {
  console.log(invitationUrlEl);
  navigator.clipboard.writeText(invitationUrlEl.dataset.url);
  showError('Copied to clipboard!');
}
