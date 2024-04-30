import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk';
const { initDataRaw } = retrieveLaunchParams();

//update for production
const API_BASE_URL = 'https://0558-144-48-39-25.ngrok-free.app/tonstory/us-central1/api';

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
    console.error("Error fetching counters:", error);
    throw error;
  }
};

export const updatePoints = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update-points`, {}, {headers});
    return response.data;
  } catch (error) {
    console.error("Error fetching counters:", error);
    throw error;
  }
};
