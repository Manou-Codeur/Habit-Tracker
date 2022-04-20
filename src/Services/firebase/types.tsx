export type signUpType = (email: string, password: string) => void;
export type signInType = (email: string, password: string) => void;
export type resetPassType = (email: string) => void;
export type usersType = () => void;
export type userType = (uid: string) => any;
export type addUserType = ({
  name,
  email,
  uid,
}: {
  name: string;
  email: string;
  uid: string;
}) => void;
export type getHabitsIdsType = (uid: string) => void;

export interface MethodsTypes {
  doCreateUserWithEmailAndPassword: signUpType;
  doSignInWithEmailAndPassword: signInType;
  doResetPassword: resetPassType;
  users: usersType;
  user: userType;
  addUser: addUserType;
  getHabitsIds: getHabitsIdsType;
}
