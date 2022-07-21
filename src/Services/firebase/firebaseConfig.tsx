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
  user: firebaseTypes.userType = uid => this.db.ref(`users/${uid}`);

  addUser: firebaseTypes.addUserType = ({ name, email, uid }) =>
    this.user(uid).set({
      name,
      email,
      habits: "[]",
    });

  getHabits: firebaseTypes.getHabitsType = uid =>
    this.db.ref(`/users/${uid}/habits`);

  habitsManager: firebaseTypes.habitsManagerType = async (
    uid,
    { type, habitName, left, skip }
  ) => {
    //get curr habits and merge them with new ones then update the db
    const currList = this.getHabits(uid);
    try {
      const snap = await currList.get();
      var updates: any = {};
      let habitsArr: { name: string; left: number; skip: number }[] = [];

      //check if there's any items already in the db
      if (Array.isArray(snap.val())) {
        habitsArr.push(...snap.val());
      }

      //add, update or delete a habit
      if (type === "ADD") {
        habitsArr.push({ name: habitName, left: left!, skip: skip! });
      } else if (type === "UPDATE") {
        const index = habitsArr.findIndex(habit => habit.name === habitName);
        habitsArr[index].left = left!;
        habitsArr[index].skip = skip!;
      } else if (type === "DELETE") {
        habitsArr = habitsArr.filter(habit => habit.name !== habitName);
      }

      updates["/users/" + uid + "/habits"] = habitsArr;
      this.db.ref().update(updates);
    } catch (err) {
      return await Promise.reject(
        "There is an unexpected error, please reload the page!"
      );
    }
  };
}

export default Firebase;
