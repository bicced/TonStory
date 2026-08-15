import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk';
const { initDataRaw } = retrieveLaunchParams();

// Production API URL - Update with your Firebase Cloud Functions URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://us-central1-tonstory.cloudfunctions.net/api';

const headers = {
  Authorization: `tma ${initDataRaw}`
}

export const loadUserData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-data`, {headers});
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export const getScoreboard = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/scoreboard`, {headers});
    return response.data;
  } catch (error) {
    console.error("Error fetching scoreboard:", error);
    throw error;
  }
};

export const updatePoints = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update-points`, {}, {headers});
    return response.data;
  } catch (error) {
    console.error("Error updating points:", error);
    throw error;
  }
};
