import React, { useEffect, useState, useCallback } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { postEmailVerified } from "./postEmailVerified";
import { Book } from "../../component/Book/Book";

import "./EmailVerified.css";

export const EmailVerified = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [randomPageId, setRandomPageId] = useState(false);
  const [newSongAdded, setNewSongAdded] = useState(false);
  const { t } = useTranslation();
  const params = useParams();

  const emailIsVerified = useCallback(async () => {
    const success = await postEmailVerified(params.verifyCode);
    if (success) {
      setIsVerified(true);
      setTimeout(() => {
        document.location.href = "/";
      }, 10000);
    }
    setIsLoading(false);
  }, [params.verifyCode]);

  useEffect(() => {
    emailIsVerified();
  }, [emailIsVerified]);

  return (
    <>
      <div className="emailVerified__container">
        <div className={`emailVerified__textContainer ${isVerified ? "emailVerified__success" : "emailVerified__error"}`}>
          {
            isLoading ? (
              <LoadingOutlined className="emailVerified__loader" />
            ) : isVerified ? (
              <div className="emailVerified__text">
                <strong>Your email have been verified</strong> <br />
              Thank you and welcome in our community!
                <br />
              You can now go ahead and log yourself in.
                <br />
                <div className="emailVerified__link">
                  You will be redirected to the{" "}
                  <span
                    className="link"
                    onClick={() => {
                      document.location.href = "/";
                    }}
                  >
                    {" "}
                  login page
                </span>
                .
              </div>
              </div>
            ) : (
                  <div className="emailVerified__text">
                    <strong>Your email could not be verified!</strong>
                    <br />
                    <br />
              Something went wrong in the verification of the email linked to
              your account!
                    <br />
                    <div className="emailVerified__link">
                      What can you do? Go back to the
                        {" "}
                      <span
                        className="link"
                        onClick={() => {
                          document.location.href = "/";
                        }}
                      >
                        login page
                </span>
                      {", "}
                sign in, and follow the infos on how to request a new
                verification link.
              </div>
                  </div>
                )}
        </div>
      </div>

      <div className="emailVerified__blury">
        <Book
          searchValue={null}
          newSongAdded={null}
          setNewSongAdded={setNewSongAdded}
          randomPageId={null}
          setRandomPageId={setRandomPageId}
        />
      </div>
    </>
  );
};
