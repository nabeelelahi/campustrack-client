import Server from "../config/constants/server";
import CryptoJS from "crypto-js";

/**
 * Retrieves a value from local storage using the provided key.
 * The value is decrypted with the aes secret provided in the server constants.
 * If the value is not found, null is returned.
 * @param key The key to retrieve the value from local storage
 * @returns The decrypted value from local storage or null if the value is not found
 */
export const getStorageData = (key: string) => {
  const data = localStorage.getItem(key) ?? localStorage.getItem(key);
  // Decrypt
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data, Server.crypto.AES_SECRET);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return !decryptedData ? {} : decryptedData;
  }
  return null;
};
/**
 * Stores a value in local storage under the specified key.
 * The value is encrypted using AES encryption with the secret provided in server constants.
 *
 * @param key - The key under which the value will be stored in local storage
 * @param value - The value to be stored, which will be encrypted before storage
 */
export const setStorageData = <T>(key: string, value: T) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    Server.crypto.AES_SECRET
  ).toString();
  localStorage.setItem(key, ciphertext);
};

/**
 * Removes the value stored in local storage under the specified key.
 *
 * @param key The key of the value to be removed from local storage
 */
export const removeStorageData = (key: string) => {
  localStorage.removeItem(key);
};

export const encryptData = (data: string): string => {
  try {
    let key = CryptoJS.enc.Utf8.parse(Server.crypto.AES_SECRET);
    let iv = CryptoJS.enc.Utf8.parse(Server.crypto.AES_IV);
    let ciphertext = CryptoJS.AES.encrypt(data, key, { iv: iv }).toString();

    return ciphertext;
  } catch (error) {
    console.error("Error during encryption:", error);
    return ""; // Return an empty string or handle the error as needed
  }
};

export const optionpPicker = (
  data: any[],
  valuekey: string = "_id",
  labelkey: string = "name"
) => {
  return data.map((item: any) => ({
    value: item[valuekey],
    label: item[labelkey],
  }));
};
