// DOM ELMS FOR PREVIEWIMAGE
const imageCoverUploadEl = document.querySelector('#upload-image-cover');
const imageCoverEl = document.querySelector('#image-cover');
const imageCoverOptionsUploadEl = document.querySelector('.image-cover__options-upload');
const btnOptionsDeleteImageEl = document.querySelector('.btn__options-delete-image');
const labelUploadImageCover = document.querySelector('#label-upload-image-cover');
const eventInfoEl = document.querySelector('.event-info');

// DOM ELMS FOR EVENT INFO SECTION
const nameEl = document.querySelector('#name');
const eventInfoDateLocationEl = document.querySelector('.event-info__date-location');
const dateEl = document.querySelector('#date');

// DOM ELMS FOR PREVIEWIMAGE
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
        eventInfoEl.classList.remove('u-display-hide');

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
    eventInfoEl.classList.add('u-display-hide');

    // reset the input field so if you removed it you can re-add the same file
    imageCoverUploadEl.value = '';
  });
}

/**
 * Update inputEl dynamically based what the user types on the inputEl field
 * The inputEl will only show if it's parent (Event Info div) is not hidden
 *
 * @param {HTMLElement} inputEl The input form to get user's input from
 * @param {String} classBeingAdded The class which is being added to the html
 * @param {HTMLElement} parentEl Where the html needs to be inserted to
 * @param {function(HTMLElement):String} htmlFunc Gets the html of the file
 */
function dynamicEventInfoUpdate(inputEl, classBeingAdded, parentEl, htmlFunc) {
  inputEl.addEventListener('input', () => {
    document.querySelector(`.${classBeingAdded}`)?.remove();

    // if there's no input value then don't add a the html
    if (inputEl.value !== '') {
      const html = htmlFunc(inputEl);
      parentEl.insertAdjacentHTML('afterbegin', html);
    }
  });
}

// Function below will only run if the user is on /create-event path
export function updateDateNameEventInfo() {
  // using the function in the inline script in the html
  dynamicEventInfoUpdate(nameEl, 'event-info__heading', eventInfoEl, (inputEl) => {
    return `<div class="event-info__heading"> <h1 class="heading-primary">${inputEl.value}</h1> </div>`;
  });

  dynamicEventInfoUpdate(dateEl, 'event-info__date', eventInfoDateLocationEl, (inputEl) => {
    return `
    <div class="event-info__date">
      <svg class="event-info__date-icon">
        <use xlink:href="/img/sprite.svg#calendar-icon"></use>
      </svg>
      <p class="event-info-date-para">${inputEl.value}</p>
    </div>
`;
  });
}
