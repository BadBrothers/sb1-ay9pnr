import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
}

export const loginWithTwitter = async (): Promise<TwitterUser> => {
  const popup = window.open(
    `${API_URL}/auth/twitter`,
    'Twitter Auth',
    'width=600,height=600'
  );

  return new Promise((resolve, reject) => {
    window.addEventListener('message', async (event) => {
      if (event.origin !== API_URL) return;
      if (event.data.type === 'TWITTER_AUTH_SUCCESS') {
        const { user } = event.data;
        popup?.close();
        resolve(user);
      }
      if (event.data.type === 'TWITTER_AUTH_ERROR') {
        popup?.close();
        reject(new Error('Twitter authentication failed'));
      }
    });
  });
};

export const getCurrentUser = async (): Promise<TwitterUser | null> => {
  try {
    const { data } = await axios.get(`${API_URL}/auth/user`, { withCredentials: true });
    return data;
  } catch (error) {
    return null;
  }
};

export const logout = async (): Promise<void> => {
  await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};