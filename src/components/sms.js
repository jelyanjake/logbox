import axios from 'axios';

const BASE_URL = 'https://api.textbee.dev/api/v1';
const API_KEY = process.env.TEXTBEE_API_KEY;
const DEVICE_ID = process.env.TEXTBEE_DEVICE_ID;

export const sendSMS = async (recipient, message) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/gateway/devices/${DEVICE_ID}/send-sms`,
      {
        recipients: Array.isArray(recipient) ? recipient : [recipient],
        message: message,
      },
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};