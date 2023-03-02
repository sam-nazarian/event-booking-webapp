import axios from 'axios';
import { showError } from '../utilities/alerts';

const root = document.getElementsByTagName('html')[0];

// Opening & closing the invite - Invite-respond component
const inviteEl = document.querySelector('.invite');
const inviteArrowBtnEl = document.querySelector('#invite__arrow-btn');
const arrowOpenEl = document.querySelector('.arrow-open');

// Confirm or decline btns - Invite-respond component
const inviteConfirmBtnEl = document.querySelector('#invite__confirm-btn');
const inviteDeclineBtnEl = document.querySelector('#invite__decline-btn');

// Create participant component - Participant component
const createParticipantFormEl = document.querySelector('.create-participant__form');
const createParticipantCancelEL = document.querySelector('.create-participant__cancel');
const overlayEl = document.querySelector('.overlay');

const respondTextEl = document.querySelector('#respond-text');

export function addInitialEventListeners() {
  // Close Invite-respond component
  inviteArrowBtnEl.addEventListener('click', () => {
    inviteEl.classList.toggle('invite--hide');
    arrowOpenEl.classList.toggle('arrow-open--hide');
  });

  // Open Invite-respond component
  arrowOpenEl.addEventListener('click', () => {
    inviteEl.classList.toggle('invite--hide');
    arrowOpenEl.classList.toggle('arrow-open--hide');
  });

  // Confirm btn - Invite-respond component
  inviteConfirmBtnEl.addEventListener('click', (e) => {
    e.preventDefault();
    overlayEl.classList.remove('u-display-hide');
    overlayEl.setAttribute('data-type-of-response', 'confirmInvite');
    respondTextEl.innerHTML = 'accept';

    // document.body.classList.add('u-disable-scrolling'); //causes page to reload
    root.classList.add('u-disable-scrolling');
  });

  // Decline btn - Invite-respond component
  inviteDeclineBtnEl.addEventListener('click', (e) => {
    e.preventDefault();
    overlayEl.classList.remove('u-display-hide');
    overlayEl.setAttribute('data-type-of-response', 'declineInvite');
    respondTextEl.innerHTML = 'decline';

    // document.body.classList.add('u-disable-scrolling'); //causes page to reload
    root.classList.add('u-disable-scrolling');
  });

  // Create participant component
  createParticipantFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    if (overlayEl.dataset.typeOfResponse === 'confirmInvite') {
      httpCreateParticipant(true);
    }
    if (overlayEl.dataset.typeOfResponse === 'declineInvite') {
      httpCreateParticipant(false);
    }

    // document.body.classList.remove('u-disable-scrolling');
    // root.classList.remove('u-disable-scrolling');
  });

  // Cancel (via clicking go back button) participant component
  createParticipantCancelEL.addEventListener('click', (e) => {
    e.preventDefault();
    overlayEl.classList.add('u-display-hide');

    document.body.classList.remove('u-disable-scrolling');
    root.classList.remove('u-disable-scrolling');
  });

  // Cancel (via clicking overlay) participant component
  overlayEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay')) {
      overlayEl.classList.add('u-display-hide');

      document.body.classList.remove('u-disable-scrolling');
      root.classList.remove('u-disable-scrolling');
    }
  });
}

/* Send http request to server to create a participant */
async function httpCreateParticipant(attending = true) {
  const form = new FormData();
  form.append('picture', document.querySelector('#upload-profile-picture').files[0]);
  form.append('name', document.querySelector('#create-participant__name').value);
  form.append('attending', attending.toString());

  try {
    const res = await axios({
      method: 'POST',
      url: `http://10.0.0.171:8000/api/v1/participants/${document.body.dataset.eventId}`, // ON PRODCUTION CHANGE TO api/v1/events
      data: form,
    });

    // HIDE RESPOND FORM & ADD UPDATED HTML TO DOM

    // console.log(`res`, res);
    // console.log(res.data.data.data._id);
    // if (res.data.status === 'success') location.assign(`/share-event/${res.data.data.data._id}`);
  } catch (err) {
    // console.log(`ERROR 💥`, err);
    showError(err.response.data.message); //accessing message property from server
  }
}

// createParticipantFormEl.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   //recreating multi-part form data
//   const form = new FormData();
//   form.append('imageCover', document.getElementById('upload-image-cover').files[0]);
//   form.append('name', document.getElementById('name').value);
//   form.append('date', document.getElementById('date').value);
//   form.append('startTime', document.getElementById('start-time').value);
//   form.append('endTime', document.getElementById('end-time').value);
//   form.append('description', document.getElementById('description').value);

//   const addressEl = document.getElementById('address');

//   if (addressEl.dataset.lng && addressEl.dataset.lat) {
//     form.append('location[coordinates][0]', addressEl.dataset.lng);
//     form.append('location[coordinates][1]', addressEl.dataset.lat);
//   }

//   form.append('location[addressDescription]', addressEl.dataset.addressDescription);
//   form.append('location[addressFull]', addressEl.dataset.addressFull);

//   await createEvent(form);
