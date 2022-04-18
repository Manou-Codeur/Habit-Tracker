import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

import * as firebaseTypes from "./types";

const {
  REACT_APP_APIKEY,
  REACT_APP_AUTHDOMAIN,
  REACT_APP_PROJECTID,
  REACT_APP_STORAGEBUCKET,
  REACT_APP_MESSAGINGSENDERID,
  REACT_APP_APPID,
} = process.env;

const config = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
  messagingSenderId: REACT_APP_MESSAGINGSENDERID,
  appId: REACT_APP_APPID,
};

class Firebase {
  auth: any;
  db: any;

  constructor() {
    //init firebase config
    app.initializeApp(config);

    //init firebase auth method so we could use all it's functions
    this.auth = app.auth();

    //init firebase database method so we could use all it's functions
    this.db = app.database();
  }

  //auth methods
  doCreateUserWithEmailAndPassword: firebaseTypes.signUpType = (
    email,
    password
  ) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword: firebaseTypes.signInType = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doResetPassword: firebaseTypes.resetPassType = email =>
    this.auth.sendPasswordResetEmail(email);

  //db methods
  users: firebaseTypes.usersType = () => this.db.ref("/users");
  user: firebaseTypes.userType = uid => this.db.ref(`users/${uid}`);

  addUser: firebaseTypes.addUserType = ({ name, email, uid }) =>
    this.user(uid).set({
      name,
      email,
      habits: "[]",
    });

  getHabitsIds: firebaseTypes.getHabitsIdsType = uid =>
    this.db.ref(`/users/${uid}/habits`);

  //   addHabit = async (uid: string, habitId: string) => {
  //     //get curr ids and merge them with new ones then update the db
  //     const currList = this.getHabitsIds(uid);
  //     try {
  //       const snap = await currList.get();
  //       var updates = {};
  //       let habitsIds = [habitId];

  //       if (Array.isArray(snap.val())) {
  //         habitsIds.push(...snap.val());
  //       }

  //       //removes duplicate
  //       habitsIds = [...new Set(habitsIds)];

  //       updates["/users/" + uid + "/recentAlbums"] = habitsIds;
  //       this.db.ref().update(updates);
  //     } catch (err) {
  //       return await Promise.reject(
  //         "There is an unexpected error, please reload the page!"
  //       );
  //     }
  //   };
}

export default Firebase;
