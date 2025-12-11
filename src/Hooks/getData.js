// api.js
import axios from "axios";

// پایه URL سرور json-server
const BASE_URL = "http://localhost:3000";

/**
 * GET: دریافت داده‌ها
 * @param {string} endpoint مسیر API مثل "players"
 * @returns داده‌های پاسخ
 */
export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`GET ${endpoint} error:`, error);
    throw error;
  }
};

/**
 * POST: ارسال داده جدید
 * @param {string} endpoint مسیر API
 * @param {object} data داده‌ای که باید اضافه شود
 * @returns داده اضافه شده
 */
export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`POST ${endpoint} error:`, error);
    throw error;
  }
};

/**
 * PUT: بروزرسانی داده موجود
 * @param {string} endpoint مسیر API
 * @param {number|string} id شناسه آیتم
 * @param {object} data داده‌های جدید برای بروزرسانی
 * @returns داده بروزرسانی شده
 */
export const putData = async (endpoint, id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`PUT ${endpoint}/${id} error:`, error);
    throw error;
  }
};

/**
 * DELETE: حذف داده
 * @param {string} endpoint مسیر API
 * @param {number|string} id شناسه آیتم
 * @returns نتیجه حذف
 */
export const deleteData = async (endpoint, id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`DELETE ${endpoint}/${id} error:`, error);
    throw error;
  }
};
