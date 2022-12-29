// Import Files
import { showError } from '../utilities/alerts';
import axios from 'axios';

// Import DOM
const loaderEl = document.querySelector('.loader');
const btnCreateEventEl = document.querySelector('#btn-create-event');

// type is either 'password' or 'data'
export async function createEvent(data) {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://10.0.0.171:8000/api/v1/events', // ON PRODCUTION CHANGE TO api/v1/events
      data,
    });

    // console.log(`res`, res);
    // console.log(res.data.data.data._id);
    if (res.data.status === 'success') location.assign(`/share-event/${res.data.data.data._id}`);
  } catch (err) {
    // console.log(`ERROR 💥`, err);
    showError(err.response.data.message); //accessing message property from server
  }
}

export function addSubmitLoader() {
  btnCreateEventEl.classList.add('u-display-hide');
  loaderEl.classList.remove('u-display-hide');
}

export function hideSubmitLoader() {
  loaderEl.classList.add('u-display-hide');
  btnCreateEventEl.classList.remove('u-display-hide');
}
