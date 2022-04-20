import { createContext } from "react";

import { MethodsTypes } from "./types";

const FirebaseContext = createContext<MethodsTypes | null>(null);

export default FirebaseContext;
