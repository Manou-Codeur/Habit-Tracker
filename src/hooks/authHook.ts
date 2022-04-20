import { useEffect, useState } from "react";
import jwtGenerator from "jwt-decode";

export const useAuth = () => {
  const [userAuthed, setUserAuthed] = useState(null);

  useEffect(() => {
    try {
      const { user_id, aud } = jwtGenerator<any>(
        JSON.parse(localStorage.getItem("user-authed")!)
      );

      if (aud !== "habit-tracker-567af") throw new Error();

      setUserAuthed(user_id);
    } catch (error) {
      setUserAuthed(null);
    }
  }, []);

  return userAuthed;
};
