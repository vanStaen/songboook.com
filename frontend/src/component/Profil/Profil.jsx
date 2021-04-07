import { useState, useEffect } from "react";
import { observer } from "mobx-react";

import { authStore } from "../../stores/authStore";
import { userStore } from "../../stores/userStore";
import { Spinner } from "../Spinner/Spinner";

import "./Profil.css";

export const Profil = observer(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Profil__full">
      <div className="Profil__title">Profil</div>

      <div
        className="Profil__avatar"
        style={{
          backgroundImage: `url(${userStore.picUrl})`,
          backgroundSize: "cover",
        }}
      ></div>

      <div className="Profil__main">
        <br />
        <div>hello {userStore.userName},</div>
        <br />
        <div className="Profil__logout" onClick={() => authStore.logout()}>
          (logout)
        </div>
      </div>
    </div>
  );
});
