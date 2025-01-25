import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export const firebaseSignUp = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await userCredential.user.updateProfile({ displayName: name }); // Update user's display name
  return userCredential;
};

export const firebaseLogin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};