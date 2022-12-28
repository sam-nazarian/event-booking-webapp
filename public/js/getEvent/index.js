import { showError } from '../utilities/alerts';
import { MAPBOX_API_KEY } from '../utilities/config';

const getEventPageEl = document.querySelector('#get-event-page');
const root = document.getElementsByTagName('html')[0];

// Create participant component
const createParticipantSubmitEl = document.querySelector('.create-participant__submit');
const createParticipantCancelEL = document.querySelector('.create-participant__cancel');
const overlayEl = document.querySelector('.overlay');
// Confirm or decline btns - Invite-respond component
const inviteConfirmBtnEl = document.querySelector('#invite__confirm-btn');
const inviteDeclineBtnEl = document.querySelector('#invite__decline-btn');
// Opening & closing the invite - Invite-respond component
const inviteEl = document.querySelector('.invite');
const inviteArrowBtnEl = document.querySelector('#invite__arrow-btn');
const arrowOpenEl = document.querySelector('.arrow-open');

function addEventListeners() {
  // Event listeners for create participant component
  createParticipantSubmitEl.addEventListener('click', (e) => {
    e.preventDefault();
    showError('Functionality not implemented!');

    // document.body.classList.remove('u-disable-scrolling');
    // root.classList.remove('u-disable-scrolling');
  });

  createParticipantCancelEL.addEventListener('click', (e) => {
    e.preventDefault();
    overlayEl.classList.add('u-display-hide');

    document.body.classList.remove('u-disable-scrolling');
    root.classList.remove('u-disable-scrolling');
  });

  overlayEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay')) {
      overlayEl.classList.add('u-display-hide');

      document.body.classList.remove('u-disable-scrolling');
      root.classList.remove('u-disable-scrolling');
    }
  });

  // Event listeners Invite-respond component
  inviteConfirmBtnEl.addEventListener('click', (e) => {
    e.preventDefault();
    overlayEl.classList.remove('u-display-hide');

    // document.body.classList.add('u-disable-scrolling'); //causes page to reload
    root.classList.add('u-disable-scrolling');
  });

  inviteDeclineBtnEl.addEventListener('click', (e) => {
    e.preventDefault();
    overlayEl.classList.remove('u-display-hide');

    // document.body.classList.add('u-disable-scrolling'); //causes page to reload
    root.classList.add('u-disable-scrolling');
  });

  // Close/open of Event listeners Invite-respond component
  inviteArrowBtnEl.addEventListener('click', () => {
    inviteEl.classList.toggle('invite--hide');
    arrowOpenEl.classList.toggle('arrow-open--hide');
  });

  arrowOpenEl.addEventListener('click', () => {
    inviteEl.classList.toggle('invite--hide');
    arrowOpenEl.classList.toggle('arrow-open--hide');
  });
}

function addMap() {
  const map = L.map('map', {
    scrollWheelZoom: false,
    dragging: !L.Browser.mobile,
  }).setView([49.883226, -97.155884], 2);

  L.tileLayer(`https://api.mapbox.com/styles/v1/saman2111/cl79xjeka001714n0hqhmd9mg/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEY}`).addTo(map);

  map.setView([49.883226, -97.155884], 2, {
    animate: true,
    pan: {
      duration: 2,
    },
  });
}

if (getEventPageEl) {
  addEventListeners();
  addMap();
}
