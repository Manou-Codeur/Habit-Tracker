export type signUpType = (email: string, password: string) => Promise<any>;
export type signInType = (email: string, password: string) => Promise<any>;
export type resetPassType = (email: string) => Promise<any>;
export type userType = (uid: string) => any;
export type addUserType = ({
  name,
  email,
  uid,
}: {
  name: string;
  email: string;
  uid: string;
}) => Promise<any>;
export type getHabitsType = (uid: string) => {
  get: () => Promise<{ val: () => [] }>;
};
export type habitsManagerType = (
  uid: string,
  action: {
    type: "ADD" | "UPDATE" | "DELETE";
    habitName: string;
    left: number | undefined;
    skip: number | undefined;
  }
) => Promise<any>;

export interface MethodsTypes {
  doCreateUserWithEmailAndPassword: signUpType;
  doSignInWithEmailAndPassword: signInType;
  doResetPassword: resetPassType;
  user: userType;
  addUser: addUserType;
  getHabits: getHabitsType;
  habitsManager: habitsManagerType;
}
