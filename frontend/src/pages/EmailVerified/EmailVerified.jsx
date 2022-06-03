import React, { useEffect, useState, useCallback } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import { postEmailVerified } from "./postEmailVerified";
import { displayStore } from "../../stores/displayStore";
import { Book } from "../../component/Book/Book";

import "./EmailVerified.css";

export const EmailVerified = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [randomPageId, setRandomPageId] = useState(false);
  const [newSongAdded, setNewSongAdded] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const emailIsVerified = useCallback(async () => {
    const success = await postEmailVerified(params.verifyCode);
    if (success) {
      setIsVerified(true);
      setTimeout(() => {
        navigate("/");
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
        <div
          className={`emailVerified__textContainer ${
            isVerified ? "emailVerified__success" : "emailVerified__error"
          }`}
        >
          {isLoading ? (
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
                    navigate("/");
                  }}
                >
                  start page
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
                What can you do? Go back to the{" "}
                <span
                  className="link"
                  onClick={() => {
                    displayStore.setShowPage("login");
                    navigate("/");
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
