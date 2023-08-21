import axios from "axios";

const BASE_URL = "https://api.staging.paymee.app";
const USER_TOKEN = "ee767c938b21da26f9990d11bb2df8c00c88d83d";

// Function to retrieve the qrcode-on-table list
export const getQrcodeList = () => {
  const url = `${BASE_URL}/api/v2/panoramix/on-table/qrcodes`;

  return axios.get(url, {
    headers: {
      Authorization: `Token ${USER_TOKEN}`,
    },
  });
};

// Function to retrieve a specific qrcode-on-table details
export const getQrcodeDetails = (id) => {
  const url = `${BASE_URL}/api/v2/panoramix/on-table/qrcodes/${id}/details`;

  return axios.get(url, {
    headers: {
      Authorization: `Token ${USER_TOKEN}`,
    },
  });
};

// Function to update the paid status for a specific qrcode-on-table
export const updateQrcodeStatus = (id, status) => {
  const url = `${BASE_URL}/api/v2/panoramix/on-table/qrcodes/${id}/status`;

  return axios.patch(
    url,
    { status },
    {
      headers: {
        Authorization: `Token ${USER_TOKEN}`,
      },
    }
  );
};

// Function to edit the qrcode-on-table details
export const editQrcodeDetails = (id, amount, note) => {
  const url = `${BASE_URL}/api/v2/panoramix/on-table/qrcodes/${id}/edit`;

  return axios.put(
    url,
    { amount, note },
    {
      headers: {
        Authorization: `Token ${USER_TOKEN}`,
      },
    }
  );
};

// Function to delete a qrcode-on-table
export const deleteQrcode = (id) => {
  const url = `${BASE_URL}/api/v2/panoramix/on-table/qrcodes/${id}/delete`;

  return axios.delete(url, {
    headers: {
      Authorization: `Token ${USER_TOKEN}`,
    },
  });
};

// Function to create a new qrcode-on-table
export const createQrcode = (amount, note) => {
  const url = `${BASE_URL}/api/v2/panoramix/on-table/qrcodes/create`;

  return axios.post(
    url,
    { amount, note },
    {
      headers: {
        Authorization: `Token ${USER_TOKEN}`,
      },
    }
  );
};
