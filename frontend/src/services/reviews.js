import axios from 'axios';
import { config } from './config';

export const addReview = async (movieId, review, rating) => {
  try {
    const token = localStorage.getItem('token');
    const url = `${config.url}/reviews`;
    const body = {
      movieId,
      review,
      rating
    };
    const response = await axios.post(url, body, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (ex) {
    console.error(ex);
    return { status: 'error', error: 'Failed to add review' };
  }
};

export const getMyReviews = async () => {
  try {
    const token = localStorage.getItem('token');
    const url = `${config.url}/review`;
    const response = await axios.get(url, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (ex) {
    console.error(ex);
    return { status: 'error', error: 'Failed to get reviews' };
  }
};
