import axios from 'axios';
import { config } from './config';
import { jwtDecode } from 'jwt-decode';

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};

export const addReview = async (movieId, review, rating) => {
  try {
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken();
    const url = `${config.url}/reviews`;
    const body = {
      movieId,
      review,
      rating
    };
    const response = await axios.post(url, body, {
      headers: {
        token: token,
        userId: userId,
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
    const userId = getUserIdFromToken();
    const url = `${config.url}/reviews/my`;
    const response = await axios.get(url, {
      headers: {
        token: token,
        userId: userId,
      },
    });
    return response.data;
  } catch (ex) {
    console.error(ex);
    return { status: 'error', error: 'Failed to get reviews' };
  }
};

export const getSharedReviews = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken();
    const url = `${config.url}/reviews/shared`;
    const response = await axios.get(url, {
      headers: {
        token: token,
        userId: userId,
      },
    });
    return response.data;
  } catch (ex) {
    console.error(ex);
    return { status: 'error', error: 'Failed to get shared reviews' };
  }
};

export const getAllUsersForSharing = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken();
    const url = `${config.url}/reviews/users`;
    const response = await axios.get(url, {
      headers: {
        token: token,
        userId: userId,
      },
    });
    return response.data;
  } catch (ex) {
    console.error(ex);
    return { status: 'error', error: 'Failed to get users' };
  }
};

export const shareReview = async (reviewId, userIds) => {
  try {
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken();
    const url = `${config.url}/reviews/${reviewId}/share`;
    const body = { userIds };
    const response = await axios.post(url, body, {
      headers: {
        token: token,
        userId: userId,
      },
    });
    return response.data;
  } catch (ex) {
    console.error(ex);
    return { status: 'error', error: 'Failed to share review' };
  }
};

export const updateReview = async (reviewId, review, rating) => {
  try {
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken();
    const url = `${config.url}/reviews/${reviewId}`;
    const body = { review, rating };
    const response = await axios.put(url, body, {
      headers: {
        token: token,
        userId: userId,
      },
    });
    return response.data;
  } catch (ex) {
    console.error(ex);
    return { status: 'error', error: 'Failed to update review' };
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken();
    const url = `${config.url}/reviews/${reviewId}`;
    const response = await axios.delete(url, {
      headers: {
        token: token,
        userId: userId,
      },
    });
    return response.data;
  } catch (ex) {
    console.error(ex);
    return { status: 'error', error: 'Failed to delete review' };
  }
};

export const getReviewById = async (reviewId) => {
  try {
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken();
    const url = `${config.url}/reviews/${reviewId}`;
    const response = await axios.get(url, {
      headers: {
        token: token,
        userId: userId,
      },
    });
    return response.data;
  } catch (ex) {
    console.error(ex);
    return { status: 'error', error: 'Failed to get review' };
  }
};
