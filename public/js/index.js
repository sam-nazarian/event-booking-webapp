console.log('HELLO THERE THIS IS FROM INDEX.JS IN THE PUBLIC FOLDER!');

const formCreateEvent = document.querySelector('.form-create-event');

formCreateEvent.addEventListener('submit', (e) => {
  e.preventDefault();
});
