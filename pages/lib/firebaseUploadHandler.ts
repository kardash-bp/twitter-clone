import {
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { storage, ref } from '../../firebase'
import { Dispatch, SetStateAction } from "react";

export async function firebaseUploadHandler(userId: string, file: File, cbPercent: Dispatch<SetStateAction<number>>, cbUrl: Dispatch<SetStateAction<string>>) {
  // let linkUrl = ''
  if (!file) {
    alert("Please choose a file first!")
  }

  const storageRef = ref(storage, `/images/${userId}/${file.name}`)
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      // update progress
      cbPercent(percent);
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // download url
      getDownloadURL(uploadTask.snapshot.ref).then((url) => cbUrl(url));
    }
  );

}