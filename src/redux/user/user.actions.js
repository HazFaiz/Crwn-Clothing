import { UserActionTypes  } from "./user.types";

export const setCurrentUserRedux = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
  });