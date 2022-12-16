import { showError } from '../utilities/alerts';
import { createEvent, addSubmitLoader, hideSubmitLoader } from './createEvent';
import { previewImage } from './updateImageCover';

// DOM ELEMENTS
const formCreateEventEl = document.querySelector('#form-create-event');
const imageCoverUploadEl = document.querySelector('#upload-image-cover');
const dateEl = document.getElementById('date');

if (imageCoverUploadEl) {
  previewImage();
}

if (dateEl) {
  const todaysDate = new Date().toISOString().split('T')[0];
  dateEl.setAttribute('min', todaysDate);
}

if (formCreateEventEl) {
  formCreateEventEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    addSubmitLoader();

    //recreating multi-part form data
    const form = new FormData();
    form.append('imageCover', document.getElementById('upload-image-cover').files[0]);
    form.append('name', document.getElementById('name').value);
    form.append('date', document.getElementById('date').value);
    form.append('startTime', document.getElementById('start-time').value);
    form.append('endTime', document.getElementById('end-time').value);
    form.append('description', document.getElementById('description').value);

    await createEvent(form);
    hideSubmitLoader();
  });
}
