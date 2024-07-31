import { Alert, Button, TextInput } from "flowbite-react";
import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.user || {});
  const [imageFile, setimagefile] = useState(null);
  const [imageFileURL, setimgaefileURL] = useState(null);
  const [imageFileuploadprogress, setimageFileuploadprogress] = useState(null);
  const [imageFileuploadError, setimageFileuploadError] = useState(null);
  console.log(imageFileuploadprogress, imageFileuploadError);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimagefile(file);
      setimgaefileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
      console.log(imageFile, imageFileURL);
    }
  }, [imageFile]);

  const uploadImage = async () => {
    console.log("uploading image ...");
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageFileuploadprogress(progress.toFixed(0));
      },
      (error) => {
        setimageFileuploadError("File must be < 2MB");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimgaefileURL(downloadURL);
        });
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form action="" className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileuploadprogress && (
              <CircularProgressbar
                value={imageFileuploadprogress || 0}
                text={`${imageFileuploadprogress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62,152,199) ${imageFileuploadprogress / 100}`,
                  },
                }}
              />
            )}
            <img
              src={imageFileURL || currentUser.avatar}
              alt="user"
              className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
            />
          </div>
          {imageFileuploadError && (
            <Alert color="failure">{imageFileuploadError}</Alert>
          )}
          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
          />
          <TextInput type="password" id="password" placeholder="password" />

          <Button pill type="submit">
            Update
          </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
