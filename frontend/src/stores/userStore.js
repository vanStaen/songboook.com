import { action, makeObservable, observable } from "mobx";

export class UserStore {

    userId = null;
    userName = null;
    picUrl = "https://avatars0.githubusercontent.com/u/12551446";

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
