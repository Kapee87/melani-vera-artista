// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { deleteObject, getDownloadURL, getMetadata, getStorage, ref, uploadBytes } from 'firebase/storage'
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyAZXTtpFgWXefGvspv558bZD-8Xx48w-34",
  authDomain: "portolio-artistico.firebaseapp.com",
  projectId: "portolio-artistico",
  storageBucket: "portolio-artistico.appspot.com",
  messagingSenderId: "217516038382",
  appId: "1:217516038382:web:43d2c3001257a8f9c4fbff",
  measurementId: "G-FFN1P178SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

/**
 * Upload a file using firebase storage
 * @param {File} file to upload
 * @returns {Promise<string>} url or the uploaded file
 */

export async function uploadFile(file, folder) {
  const storageRef = ref(storage, `${folder}/${v4()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
export async function getStorageRefFromUrl(url) {


  const imageRef = ref(storage, url);
  console.log(url);
  try {
    // Verificar si la referencia existe
    const metadata = await getMetadata(imageRef);
    // Si la referencia existe, retornarla
    return imageRef;
  } catch (error) {
    // Manejar el error si la referencia no existe
    console.error('La referencia no existe:', error);
    return null;
  }
}
export async function deleteFile(urlsToDelete) {

  /* urlsToDelete.forEach(async (file) => {
    const fileRef = ref(storage, file)
    const fileName = fileRef.name
    try {
      const res = await deleteObject(fileRef)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    console.log(fileRef);
  }); */

}