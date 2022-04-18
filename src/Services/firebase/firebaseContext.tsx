import { createContext } from "react";

import * as firebaseTypes from "./types";

interface MethodsTypes {
  doCreateUserWithEmailAndPassword: firebaseTypes.signUpType;
  doSignInWithEmailAndPassword: firebaseTypes.signInType;
  doResetPassword: firebaseTypes.resetPassType;
  users: firebaseTypes.usersType;
  user: firebaseTypes.userType;
  addUser: firebaseTypes.addUserType;
  getHabitsIds: firebaseTypes.getHabitsIdsType;
}

const FirebaseContext = createContext<MethodsTypes | null>(null);

export default FirebaseContext;
