import React, { useState } from "react";
import { Input, notification } from "antd";
import { observer } from "mobx-react";
import axios from "axios";

import { authStore } from "../../../../stores/authStore";
import "./Title.css";
import { displayStore } from "../../../../stores/displayStore";

const Title = observer((props) => {
  const [title, setTitle] = useState(
    props.title.replace(/ /g, "").length > 23
      ? `${props.title.replace("-", "/").replace(/ /g, "").slice(0, 23)}...`
      : props.title.replace("-", "/").replace(/ /g, "")
  );
  const [isEditMode, setIsEditmode] = useState(false);
  const [editInputValue, setEditInputValue] = useState(
    props.title.replace("-", "/")
  );

  const patchTitleInDB = (title) => {
    async function patchEntry(title) {
      const response = await axios({
        url: process.env.API_URL + "/song/" + props.id,
        method: "PATCH",
        data: { title: title },
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Error!");
      }
      const patchResult = await response.data;
      return patchResult;
    }
    // fetch Entries
    patchEntry(title)
      .then((resData) => {
        console.log("Sucess", resData);
      })
      .catch((error) => {
        authStore.logout();
        notification.error({ description: `Unauthorized! Please login.` });
        console.log("error", error.message);
      });
  };

  const handleEditChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditCancel = () => {
    setIsEditmode(false);
    displayStore.setIsInEditMode(false);
    setEditInputValue(props.title.replace("-", "/"));
  };

  const handleEditConfirm = () => {
    patchTitleInDB(editInputValue.replace("/", "-"));
    setTitle(
      editInputValue.replace(/ /g, "").length > 23
        ? `${editInputValue
            .replace("-", "/")
            .replace(/ /g, "")
            .slice(0, 23)}...`
        : editInputValue.replace("-", "/").replace(/ /g, "")
    );
    setIsEditmode(false);
    displayStore.setIsInEditMode(false);
  };

  const handleEditMode = () => {
    setIsEditmode(true);
    displayStore.setIsInEditMode(true);
  };

  return (
    <>
      {isEditMode ? (
        <Input
          key={`title_input_${props.id}`}
          size="small"
          className="title__input"
          value={editInputValue}
          onChange={handleEditChange}
          onBlur={handleEditCancel}
          onPressEnter={handleEditConfirm}
        />
      ) : (
        <div
          className="Page__title"
          onDoubleClick={() => {
            authStore.hasAccess && handleEditMode();
          }}
        >
          {title}
        </div>
      )}
    </>
  );
});

export default Title;
