import { showAlert } from './alerts';
import axios from 'axios';

// type is either 'password' or 'data'
export const createEvent = async function (data, type) {
  try {
    const res = await axios({
      method: 'POST',
      url: 'api/v1/events',
      data,
    });

    // if (res.data.status === 'success') location.assign('/my-event');
  } catch (err) {
    showAlert('error', err.response.data.message); //accessing message property from server
  }
};

/*
//res has an object called data, all data's from api are hold there
if (res.data.status === 'success') {
  showAlert('success', `${type.toUpperCase()} updated successfully!`);

  // no need to reload as user already changed value to updated value
  // location.assign('/me');
}
*/
