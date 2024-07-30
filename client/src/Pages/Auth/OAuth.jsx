import React from "react";
import { Button } from "flowbite-react";
import download from "../../assets/download.png"
import { app } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { signinFailure, signinSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle)
      const res = await fetch("http://localhost:8000/api/google-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoURL: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signinSuccess(data.data.user));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      color="failure"
      pill
      className="mt-6 w-full flex items-center justify-center gap-2"
      type="button"
      onClick={handleGoogleClick}
    >
      <img src={download} className="h-6 w-6 rounded-full mr-2" />
      Sign Up with Google
    </Button>
  );
};

export default OAuth;
