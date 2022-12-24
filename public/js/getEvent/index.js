const inviteEl = document.querySelector('.invite');
const inviteArrowBtnEl = document.querySelector('#invite__arrow-btn');

inviteArrowBtnEl.addEventListener('click', () => {
  inviteEl.classList.toggle('invite--hide');
});
