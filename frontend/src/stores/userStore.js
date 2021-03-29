import { action, makeObservable, observable } from "mobx";

export class UserStore {

    userId = localStorage.getItem("userId") || null;
    userName = null;
    picUrl = null;

    constructor() {
        makeObservable(this, {
            userId: observable,
            setUserId: action,
            userName: observable,
            setUserName: action,
            picUrl: observable,
            setPicUrl: action,
        });
    }

    setUserId = (userId) => {
        this.userId = userId;
    };

    setUserName = (userName) => {
        this.userName = userName;
    };

    setPicUrl = (picUrl) => {
        this.picUrl = picUrl;
    };


}

export const userStore = new UserStore();
