import { addInitialEventListeners } from './initialLoad';
import { addMap } from './map';
import { previewImage } from './updateProfilePic';

const getEventPageEl = document.querySelector('#get-event-page');

if (getEventPageEl) {
  addInitialEventListeners();
  addMap();
  previewImage();
}
