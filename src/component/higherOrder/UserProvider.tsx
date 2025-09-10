import React, { useEffect, useReducer } from "react";
import { UserActionTypes } from "../../types/contexts";
import { UserContext, userReducer } from "../../store/user";
import { getStorageData } from "../../helper";

/**
 * Provides the user state to the application.
 *
 * Uses the `UserContext` to expose the user state to the application.
 *
 * Automatically persists the user state to local storage.
 *
 * @returns {JSX.Element} The user state provider element.
 */
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, null);

  useEffect(() => {
    if (!state) {
      let storageData = getStorageData("user");
      if (storageData) {
        dispatch({
          type: UserActionTypes.POST,
          payload: storageData,
        });
      }
    }
  }, [state]);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
