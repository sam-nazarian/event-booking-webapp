import { showError } from './alerts';
import { createEvent } from './createEvent';

// DOM ELEMENTS
const formCreateEvent = document.querySelector('.form-create-event');
// showError('You need to fill everything');

formCreateEvent.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('thanks for submitting the event!');
});
