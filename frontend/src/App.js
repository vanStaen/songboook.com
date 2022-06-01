import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { notification } from "antd";
import { observer } from "mobx-react";

import { Songbook } from "./pages/Songbook/Songbook";
import { NewPassword } from "./pages/NewPassword/NewPassword";
import { EmailVerified } from "./pages/EmailVerified/EmailVerified";
import { Footer } from "./component/Footer/Footer";

import { authStore } from "./stores/authStore";
import { userStore } from "./stores/userStore";
import { archiveAccount } from "./stores/actions/archiveAccount";

import "./App.css";

const App = observer(() => {
  useEffect(() => {
    authStore.checkAccess();
    //userStore.fetchUserData();
  }, []);

  useEffect(() => {
    //userStore.fetchUserData();
  }, [authStore.hasAccess]);

  useEffect(() => {
    // Check if account was archived
    if (userStore.archived) {
      archiveAccount(false);
      notification.success({
        message: (
          <>
            <b>{t("profile.accountReactivated")}</b>
            <br />
            {t("profile.gladToHaveYouBack")}
          </>
        ),
        placement: "bottomRight",
      });
    }
  }, [userStore.archived]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="recoverpwd/:key" element={<NewPassword />} />
          <Route path="emailverify/:verifyCode" element={<EmailVerified />} />
          <Route path="/" element={<Songbook />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
});

export default App;
