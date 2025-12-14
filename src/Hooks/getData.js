// api.firebase.js
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc
} from "firebase/firestore";

import { db } from "../FireBase/config";

/**
 * GET: دریافت همه داده‌ها از یک collection
 * @param {string} endpoint نام collection مثل "players"
 * @returns آرایه داده‌ها با id
 */
export const getData = async (endpoint) => {
  try {
    const querySnapshot = await getDocs(collection(db, endpoint));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`GET ${endpoint} error:`, error);
    throw error;
  }
};

/**
 * GET by ID: دریافت یک آیتم
 */
export const getDataById = async (endpoint, id) => {
  try {
    const docRef = doc(db, endpoint, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Document not found");
    }

    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error(`GET ${endpoint}/${id} error:`, error);
    throw error;
  }
};

/**
 * POST: اضافه کردن داده جدید
 * @param {string} endpoint نام collection
 * @param {object} data داده جدید
 */
export const postData = async (endpoint, data) => {
  try {
    const docRef = await addDoc(collection(db, endpoint), data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error(`POST ${endpoint} error:`, error);
    throw error;
  }
};

/**
 * PUT: بروزرسانی داده موجود
 * @param {string} endpoint نام collection
 * @param {string} id شناسه document
 * @param {object} data داده‌های جدید
 */
export const putData = async (endpoint, id, data) => {
  try {
    const docRef = doc(db, endpoint, id);
    await updateDoc(docRef, data);
    return { id, ...data };
  } catch (error) {
    console.error(`PUT ${endpoint}/${id} error:`, error);
    throw error;
  }
};

/**
 * DELETE: حذف داده
 * @param {string} endpoint نام collection
 * @param {string} id شناسه document
 */
export const deleteData = async (endpoint, id) => {
  try {
    const docRef = doc(db, endpoint, id);
    await deleteDoc(docRef);
    return { success: true, id };
  } catch (error) {
    console.error(`DELETE ${endpoint}/${id} error:`, error);
    throw error;
  }
};
