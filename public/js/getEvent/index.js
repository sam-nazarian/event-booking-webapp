import { showError } from '../utilities/alerts';

// Opening & closing the invite
const inviteEl = document.querySelector('.invite');
const inviteArrowBtnEl = document.querySelector('#invite__arrow-btn');
const arrowOpenEl = document.querySelector('.arrow-open');

inviteArrowBtnEl.addEventListener('click', () => {
  inviteEl.classList.toggle('invite--hide');
  arrowOpenEl.classList.toggle('arrow-open--hide');
});

arrowOpenEl.addEventListener('click', () => {
  inviteEl.classList.toggle('invite--hide');
  arrowOpenEl.classList.toggle('arrow-open--hide');
});

const createParticipantSubmitEl = document.querySelector('.create-participant__submit');
const createParticipantCancelEL = document.querySelector('.create-participant__cancel');
const overlayEl = document.querySelector('.overlay');

createParticipantSubmitEl.addEventListener('click', (e) => {
  e.preventDefault();
  showError('Functionality not implemented!');
  // overlayEl.classList.add('u-display-hide');
});

createParticipantCancelEL.addEventListener('click', (e) => {
  e.preventDefault();
  overlayEl.classList.add('u-display-hide');
});

overlayEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('overlay')) overlayEl.classList.add('u-display-hide');
});

const inviteConfirmBtnEl = document.querySelector('#invite__confirm-btn');
const inviteDeclineBtnEl = document.querySelector('#invite__decline-btn');

inviteConfirmBtnEl.addEventListener('click', (e) => {
  e.preventDefault();
  overlayEl.classList.remove('u-display-hide');
});

inviteDeclineBtnEl.addEventListener('click', (e) => {
  e.preventDefault();
  overlayEl.classList.remove('u-display-hide');
});
