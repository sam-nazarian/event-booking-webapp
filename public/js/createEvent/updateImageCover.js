const imageCoverUploadEl = document.querySelector('#upload-image-cover');
const imageCoverEl = document.querySelector('#image-cover');
const imageCoverOptionsUploadEl = document.querySelector('.image-cover__options-upload');
const btnOptionsDeleteImageEl = document.querySelector('.btn__options-delete-image');
const labelUploadImageCover = document.querySelector('#label-upload-image-cover');

export function previewImage() {
  imageCoverUploadEl.addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // Read file once reader has finished loading
      reader.addEventListener('load', function () {
        imageCoverOptionsUploadEl.classList.add('u-display-hide');
        btnOptionsDeleteImageEl.classList.remove('u-display-hide');
        labelUploadImageCover.setAttribute('for', '');
        imageCoverEl.classList.add('u-cursor-none');

        imageCoverEl.style.backgroundImage = `linear-gradient(to right, rgba(3, 72, 125, 0.85), rgba(3, 72, 125, 0.85)), url(${this.result}`;
      });
    }
  });

  btnOptionsDeleteImageEl.addEventListener('click', function (e) {
    e.preventDefault();
    labelUploadImageCover.setAttribute('for', 'upload-image-cover');
    imageCoverEl.style.backgroundImage = ``;
    btnOptionsDeleteImageEl.classList.add('u-display-hide');
    imageCoverOptionsUploadEl.classList.remove('u-display-hide');
    imageCoverEl.classList.remove('u-cursor-none');

    // reset the input field so if you removed it you can re-add the same file
    imageCoverUploadEl.value = '';
  });
}
