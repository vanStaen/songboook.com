import { React, useEffect, useState } from "react";
import {
  EyeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  QuestionOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import piano from "./../../../images/piano.png";
import bass from "./../../../images/bass.png";
import guitar from "./../../../images/guitar.png";
import bookmark from "./../../../images/bookmark.png";

import "./SettingsButton.css";

export const SettingsButton = observer((props) => {
  const [mouseHover, setMouseHover] = useState(false);
  const [displayedAsList, setDisplayedAsList] = useState(false);

  // 0: all, 1: only unknown, 2: only known
  const classNameFlagKnown = () => {
    if (props.onlyFlagKnown === 0) {
      return "SettingsButton__knowflag inactive";
    } else if (props.onlyFlagKnown === 1) {
      return "SettingsButton__knowflag red";
    } else if (props.onlyFlagKnown === 2) {
      return "SettingsButton__knowflag green";
    }
  };

  const toolTipFlagKnow = () => {
    if (props.onlyFlagKnown === 0) {
      return "Show only song you know";
    } else if (props.onlyFlagKnown === 1) {
      return "Showing unknown only";
    } else if (props.onlyFlagKnown === 2) {
      return "Showing known only";
    }
  };

  const iconFlagKnown = () => {
    if (props.onlyFlagKnown === 0) {
      return <CheckOutlined />;
    } else if (props.onlyFlagKnown === 1) {
      return <QuestionOutlined />;
    } else if (props.onlyFlagKnown === 2) {
      return <CheckOutlined />;
    }
  };

  const handlerFlagKnown = () => {
    if (props.onlyFlagKnown === 0) {
      props.setOnlyFlagKnown(1);
    } else if (props.onlyFlagKnown === 1) {
      props.setOnlyFlagKnown(2);
    } else if (props.onlyFlagKnown === 2) {
      props.setOnlyFlagKnown(0);
    }
  };

  const showToolTip = () => {
    if (props.showSettings) {
      return false;
    } else if (mouseHover) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    props.showSettings
      ? setTimeout(function () {
          document.getElementById(
            "SettingsButton__actionContainer"
          ).style.display = "inline-block";
        }, 200)
      : (document.getElementById(
          "SettingsButton__actionContainer"
        ).style.display = "none");
  }, [props.showSettings]);

  return (
    <Tooltip
      placement="left"
      title="Adjust what you see"
      visible={showToolTip()}
    >
      <div
        onMouseEnter={() => {
          setMouseHover(true);
        }}
        onMouseLeave={() => {
          setMouseHover(false);
        }}
        className={
          props.showSettings
            ? "SettingsButton__float SettingsButton__open"
            : "SettingsButton__float"
        }
      >
        <div
          className="SettingsButton__actionContainer"
          id="SettingsButton__actionContainer"
        >
          <div
            className={
              props.filterPiano
                ? "SettingsButton__action icon__piano inactive"
                : "SettingsButton__action icon__piano"
            }
            onClick={() => props.setFilterPiano(!props.filterPiano)}
          >
            {" "}
            <Tooltip
              placement="bottom"
              title={
                props.filterPiano
                  ? "Show all songs for piano"
                  : "Hide all songs for piano"
              }
            >
              <img width="22" height="22" src={piano}></img>
            </Tooltip>
          </div>
          <div
            className={
              props.filterBass
                ? "SettingsButton__action icon__bass inactive"
                : "SettingsButton__action icon__bass"
            }
            onClick={() => props.setFilterBass(!props.filterBass)}
          >
            <Tooltip
              placement="bottom"
              title={
                props.filterBass
                  ? "Show all songs for bass"
                  : "Hide all songs for bass"
              }
            >
              <img width="17" height="17" src={bass}></img>
            </Tooltip>
          </div>
          <div
            className={
              props.filterGuitar
                ? "SettingsButton__action icon__guitar inactive"
                : "SettingsButton__action icon__guitar"
            }
            onClick={() => props.setFilterGuitar(!props.filterGuitar)}
          >
            <Tooltip
              placement="bottom"
              title={
                props.filterGuitar
                  ? "Show all songs for guitar"
                  : "Hide all songs for guitar"
              }
            >
              <img width="17" height="17" src={guitar}></img>
            </Tooltip>
          </div>
          |
          <Tooltip placement="bottom" title={toolTipFlagKnow()}>
            <div
              className={`SettingsButton__action ${classNameFlagKnown()}`}
              onClick={handlerFlagKnown}
            >
              {iconFlagKnown()}
            </div>
          </Tooltip>
          <div
            className={
              props.onlyBookmarked
                ? "SettingsButton__action icon__bookmark"
                : "SettingsButton__action icon__bookmark inactive"
            }
            onClick={() => props.setOnlyBookmarked(!props.onlyBookmarked)}
          >
            <Tooltip
              placement="bottom"
              title={
                props.onlyBookmarked
                  ? "Showing only bookmarked songs"
                  : "Show only bookmarked songs"
              }
            >
              <img width="17" height="18" src={bookmark}></img>
            </Tooltip>
          </div>
          |
          <div
            className="SettingsButton__action"
            onClick={() => setDisplayedAsList(!displayedAsList)}
          >
            <Tooltip
              placement="bottom"
              title={
                displayedAsList ? "Switch to grid view" : "Switch to list view"
              }
            >
              {displayedAsList ? (
                <BarsOutlined className="icon__view" />
              ) : (
                <AppstoreOutlined className="icon__view" />
              )}
            </Tooltip>
          </div>
          |
        </div>
        <EyeOutlined
          onClick={() => props.setShowSettings(!props.showSettings)}
          className="SettingsButton__icon"
        />
      </div>
    </Tooltip>
  );
});
