import { showError } from './alerts';
import axios from 'axios';

// type is either 'password' or 'data'
export const createEvent = async function (data) {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/events', // ON PRODCUTION CHANGE TO api/v1/events
      data,
    });

    console.log(`res`, res);
    // console.log(res.data.data.data._id);

    // if (res.data.status === 'success') location.assign(`/my-event/${res.data.data.data._id}`);
  } catch (err) {
    console.log(`ERROR 💥`, err);
    showError(err.response.data.message); //accessing message property from server
  }
};
