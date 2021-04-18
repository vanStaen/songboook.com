import { React, useState } from "react";
import { Tag, Input, notification } from "antd";
import { EditOutlined, LinkOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import axios from "axios";

import { displayStore } from "../../../../../stores/displayStore";
import { authStore } from "../../../../../stores/authStore";
import "./Links.css";

const Links = observer((props) => {
  const [tabs, setTabs] = useState(props.tabs);
  const [video, setVideo] = useState(props.video);
  const [pic, setPic] = useState(props.pic);

  const [isTabsEditMode, setIsTabsEditMode] = useState(false);
  const [isVideoEditMode, setIsVideoEditMode] = useState(false);
  const [isPicEditMode, setIsPicEditMode] = useState(false);

  const [editInputValue, setEditInputValue] = useState("");

  const maxTagWidth = props.isDrawerFold ? 160 : 350;

  const patchLinkInDB = (data) => {
    async function patchEntry(data) {
      const response = await axios({
        url: process.env.REACT_APP_API_URL + "/songbook/" + props.id,
        method: "PATCH",
        data: data,
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Error!");
      }
      const patchResult = await response.data;
      return patchResult;
    }
    patchEntry(data)
      .then((resData) => {
        //console.log("Success", resData)
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
    isTabsEditMode && setIsTabsEditMode(false);
    isVideoEditMode && setIsVideoEditMode(false);
    isPicEditMode && setIsPicEditMode(false);
    displayStore.setIsInEditMode(false);
    setEditInputValue("");
  };

  const handleEditConfirm = () => {
    if (isTabsEditMode) {
      if (editInputValue.length > 0) {
        patchLinkInDB({ link: editInputValue });
        props.setTabsMissing(false);
      } else {
        patchLinkInDB({ link: "null" });
        props.setTabsMissing(true);
      }
      setTabs(editInputValue);
      setIsTabsEditMode(false);
    } else if (isVideoEditMode) {
      if (editInputValue.length > 0) {
        patchLinkInDB({ videourl: editInputValue });
        props.setVideoMissing(false);
      } else {
        patchLinkInDB({ videourl: "null" });
        props.setVideoMissing(true);
      }
      setVideo(editInputValue);
      setIsVideoEditMode(false);
    } else if (isPicEditMode) {
      if (editInputValue.length > 0) {
        patchLinkInDB({ picurl: editInputValue });
        props.setPicMissing(false);
      } else {
        patchLinkInDB({ picurl: "null" });
        props.setPicMissing(true);
      }
      setPic(editInputValue);
      setIsPicEditMode(false);
    }
    setEditInputValue("");
    props.setPageHasChanged("true");
    displayStore.setIsInEditMode(false);
  };

  const clickLinkHandler = (url) => {
    if (url !== "null") {
      window.open(url, '_blank').focus();
    }
  };

  const returnCropedText = (text, threshold) => {
    let howLongShouldItbe;
    let cutAtChar;
    let isLongText = false;

    const getTextWidth = (inputText) => {
      const font = "12px sans-serif";
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = font;
      const width = context.measureText(inputText).width;
      return width;
    };

    for (
      howLongShouldItbe = text.length;
      getTextWidth(text.slice(0, howLongShouldItbe)) > threshold;
      howLongShouldItbe--
    ) {
      cutAtChar = howLongShouldItbe;
      isLongText = true;
    }

    const cropedText = isLongText ? `${text.slice(0, cutAtChar)}...` : text;
    return cropedText;
  };

  return (
    <div className="links">
      <div className="link__container">
        <div className="link__ref">Tabs:</div>
        {isTabsEditMode ? (
          <div style={{ display: "inline-block", width: maxTagWidth + 90 }}>
            <Input
              key={`link_input_${props.id}`}
              size="small"
              className="link__input"
              value={editInputValue}
              onChange={handleEditChange}
              onBlur={handleEditCancel}
              onPressEnter={handleEditConfirm}
            />
          </div>
        ) : (
            <a onClick={() => clickLinkHandler(tabs)} >
              <Tag className="links__tag" key="tabs">
                <LinkOutlined />
              &nbsp;&nbsp;
              {returnCropedText(tabs, maxTagWidth)}
                {authStore.token && (
                  <EditOutlined
                    onClick={(e) => {
                      setEditInputValue(tabs);
                      setIsTabsEditMode(true);
                      displayStore.setIsInEditMode(true);
                      e.preventDefault();
                    }}
                  />
                )}
              </Tag>
            </a>
          )}
      </div>

      <div className="link__container">
        <div className="link__ref">Video:</div>
        {isVideoEditMode ? (
          <div style={{ display: "inline-block", width: maxTagWidth + 90 }}>
            <Input
              key={`link_input_${props.id}`}
              size="small"
              className="link__input"
              value={editInputValue}
              onChange={handleEditChange}
              onBlur={handleEditCancel}
              onPressEnter={handleEditConfirm}
            />
          </div>
        ) : (
            <a onClick={() => clickLinkHandler(video)}>
              <Tag className="links__tag" key="video">
                <LinkOutlined />
              &nbsp;&nbsp;
              {returnCropedText(video, maxTagWidth)}
                {authStore.token && (
                  <EditOutlined
                    onClick={(e) => {
                      setEditInputValue(video);
                      setIsVideoEditMode(true);
                      displayStore.setIsInEditMode(true);
                      e.preventDefault();
                    }}
                  />
                )}
              </Tag>
            </a>
          )}
      </div>

      {authStore.token && (
        <div className="link__container">
          <div className="link__ref">Pic:</div>
          {isPicEditMode ? (
            <div style={{ display: "inline-block", width: maxTagWidth + 90 }}>
              <Input
                key={`link_input_${props.id}`}
                size="small"
                className="link__input"
                value={editInputValue}
                onChange={handleEditChange}
                onBlur={handleEditCancel}
                onPressEnter={handleEditConfirm}
              />
            </div>
          ) : (
              <Tag
                className="links__tag"
                key="pic"
                onDoubleClick={(e) => {
                  setEditInputValue(pic);
                  setIsPicEditMode(true);
                  displayStore.setIsInEditMode(true);
                  e.preventDefault();
                }}
              >
                <LinkOutlined />
              &nbsp;&nbsp;
                {returnCropedText(pic, maxTagWidth)}
                <EditOutlined
                  onClick={(e) => {
                    setEditInputValue(pic);
                    setIsPicEditMode(true);
                    displayStore.setIsInEditMode(true);
                    e.preventDefault();
                  }}
                />
              </Tag>
            )}
        </div>
      )}
    </div>
  );
});

export default Links;
