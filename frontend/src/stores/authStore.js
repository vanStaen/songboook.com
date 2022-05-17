import { action, makeObservable, observable } from "mobx";

import { displayStore } from "./displayStore";
import { deleteLogout } from "./actions/deleteLogout";
import { postLogin } from "./actions/postLogin";
import { getHasAccess } from "./actions/getHasAccess";

export class AuthStore {

  hasAccess = false;

  constructor() {
    makeObservable(this, {
      hasAccess: observable,
      setHasAccess: action,
      login: action,
      logout: action,
      checkAccess: action
    });
  }

  login = async (email, username, password, remind) => {
    if (!remind) {
      remind = false;
    }
    // Call login endpoint
    const resultLogIn = await postLogin(email, username, password, remind);
    if (resultLogIn.success) {
      this.setHasAccess(true);
      displayStore.setShowPage("book");
    } else {
      return resultLogIn.error
    }
  };

  logout = async () => {
    // Call logout endpoint
    const resultLogOut = await deleteLogout();
    if (resultLogOut) {
      this.setHasAccess(false);
    }
  };

  setHasAccess = (hasAccess) => {
    this.hasAccess = hasAccess;
  };

  checkAccess = async () => {
    const hasAccess = await getHasAccess();
    this.setHasAccess(hasAccess);
  }
}

export const authStore = new AuthStore();
