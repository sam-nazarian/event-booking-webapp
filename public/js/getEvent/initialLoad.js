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

const participantContainerEl = document.querySelector('.participant__container');
const participantAttendingEl = document.querySelector('.participant__attending');
const participantNotAttendingEl = document.querySelector('.participant__not-attending');

const attendingTotalEl = document.querySelector('#attending-total');
const notAttendingTotalEl = document.querySelector('#not-attending-total');

const addParticipantUI = function (attending = true, formName) {
  // Hide Respond Buttons
  // hide overlay
  overlayEl.classList.add('u-display-hide');
  // enable scrolling
  document.body.classList.remove('u-disable-scrolling');
  root.classList.remove('u-disable-scrolling');
  // hide invite button
  inviteEl.classList.add('u-display-hide');

  // Add Attending
  if (attending) {
    participantAttendingEl.insertAdjacentHTML('beforeend', `<div class="participant-item"><img class="participant-item__profile-picture" src="${participantContainerEl.dataset.profilePicture ? participantContainerEl.dataset.profilePicture : 'default.jpeg'}" alt=${formName}><span class="participant-item__value">${formName}</span></div>`);

    // Add 1 To The Attending Total
    attendingTotalEl.innerHTML = Number(attendingTotalEl.textContent) + 1;
  } else {
    participantNotAttendingEl.insertAdjacentHTML('beforeend', `<div class="participant-item"><img class="participant-item__profile-picture" src="${participantContainerEl.dataset.profilePicture ? participantContainerEl.dataset.profilePicture : '/img/users/default.jpeg'}" alt=${formName}><span class="participant-item__value">${formName}</span></div>`);

    // Add 1 To The Not Attending Total
    notAttendingTotalEl.innerHTML = Number(notAttendingTotalEl.textContent) + 1;
  }

  // Scroll To Participants Container
  participantContainerEl.scrollIntoView({ behavior: 'smooth' });
};

const formNameEl = document.querySelector('#create-participant__name');
/* Send http request to server to create a participant */
async function httpCreateParticipant(attending = true) {
  const form = new FormData();
  form.append('picture', document.querySelector('#upload-profile-picture').files[0]);
  form.append('name', formNameEl.value);
  form.append('attending', attending.toString());

  try {
    // HIDE RESPOND FORM & ADD UPDATED HTML TO DOM
    // optimist approach first showing the result then doing the fetch (to increase speed)
    addParticipantUI(attending, formNameEl.value);

    const res = await axios({
      method: 'POST',
      url: `/api/v1/participants/${document.body.dataset.eventId}`, // ON PRODCUTION CHANGE TO api/v1/events
      data: form,
    });

    showError('Invitation saved. Thank you for your response!');

    // console.log(`res`, res);
    // console.log(res.data.data.data._id);
    // if (res.data.status === 'success') location.assign(`/share-event/${res.data.data.data._id}`);
  } catch (err) {
    // console.log(`ERROR 💥`, err);
    showError(err.response.data.message); //accessing message property from server
  }
}
