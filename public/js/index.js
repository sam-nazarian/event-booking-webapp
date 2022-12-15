import { showError } from './alerts';
import { createEvent } from './createEvent';
import uploadImageCoverEl from './updateImageCover';

// DOM ELEMENTS
const formCreateEventEl = document.querySelector('#form-create-event');

formCreateEventEl.addEventListener('submit', (e) => {
  e.preventDefault();

  // showError('You need to fill everything');
  console.log('thanks for submitting the event!');
});

/*
const imageCoverUploadEl = document.querySelector('#upload-image-cover');
if (imageCoverUploadEl) {
}
*/
