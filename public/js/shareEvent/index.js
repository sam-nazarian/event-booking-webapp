// import files
import { clipboardCopy } from './clipboardCopy';

// import DOM
const invitationBtnEl = document.querySelector('.invitation__btn');

if (invitationBtnEl) {
  invitationBtnEl.addEventListener('click', () => {
    clipboardCopy();
  });
}
