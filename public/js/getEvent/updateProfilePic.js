const labelProfilePictureEl = document.querySelector('#upload-profile-picture');
const profilePictureEl = document.querySelector('.create-participant__profile');

export function previewImage() {
  labelProfilePictureEl.addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // Read file once reader has finished loading
      reader.addEventListener('load', function () {
        profilePictureEl.src = this.result;
      });
    }
  });
}

// imageCoverOptionsUploadEl.classList.add('u-display-hide');
// btnOptionsDeleteImageEl.classList.remove('u-display-hide');
// labelUploadImageCover.setAttribute('for', '');
// imageCoverEl.classList.add('u-cursor-none');
// eventInfoEl.classList.remove('u-display-hide');
