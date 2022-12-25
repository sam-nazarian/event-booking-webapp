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
