import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const inputEl = formEl.elements['search-text'];

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const query = inputEl.value.trim();

  if (!query) {
    iziToast.error({
      message: 'Please enter a search term',
      position: 'topRight',
      titleColor: '#fff',
      titleSize: '16px',
      titleLineHeight: '1.5',
      messageColor: '#fff',
      messageSize: '16px',
      messageLineHeight: '1.5',
      iconUrl: '/goit-js-hw-10/img/bi_x-octagon.svg',
      progressBarColor: '#b51b1b',
      color: '#ef4040',
      transitionIn: 'fadeInDown',
      maxWidth: 432,
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          titleColor: '#fff',
          titleSize: '16px',
          titleLineHeight: '1.5',
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: '1.5',
          iconUrl: '/goit-js-hw-10/img/bi_x-octagon.svg',
          progressBarColor: '#b51b1b',
          color: '#ef4040',
          transitionIn: 'fadeInDown',
          maxWidth: 432,
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch(err => {
      iziToast.error({
        message: 'Something went wrong, try again later',
        position: 'topRight',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        iconUrl: '/goit-js-hw-10/img/bi_x-octagon.svg',
        progressBarColor: '#b51b1b',
        color: '#ef4040',
        transitionIn: 'fadeInDown',
        maxWidth: 432,
      });
      console.error(err);
    })
    .finally(() => {
      hideLoader();
    });
});
