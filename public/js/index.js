import { showError } from './alerts';
import { createEvent } from './createEvent';
import { previewImage } from './updateImageCover';

// DOM ELEMENTS
const formCreateEventEl = document.querySelector('#form-create-event');
const imageCoverUploadEl = document.querySelector('#upload-image-cover');

if (imageCoverUploadEl) {
  previewImage();
}

if (formCreateEventEl) {
  formCreateEventEl.addEventListener('submit', (e) => {
    e.preventDefault();

    //recreating multi-part form data
    const form = new FormData();
    form.append('imageCover', document.getElementById('upload-image-cover').files[0]);
    form.append('name', document.getElementById('name').value);
    form.append('date', document.getElementById('date').value);
    form.append('startTime', document.getElementById('start-time').value);
    form.append('endTime', document.getElementById('end-time').value);
    form.append('description', document.getElementById('description').value);

    // showError('You need to fill everything');
    createEvent(form);
  });
}
