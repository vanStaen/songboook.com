import React, { useEffect, useState } from "react";
import {
  EyeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  QuestionOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import { authStore } from "../../../stores/authStore";
import { displayStore } from "../../../stores/displayStore";

import piano from "./../../../images/piano.png";
import bass from "./../../../images/bass.png";
import guitar from "./../../../images/guitar.png";
import bookmark from "./../../../images/bookmark.png";

import "./FilterButton.css";

export const FilterButton = observer((props) => {
  const [mouseHover, setMouseHover] = useState(false);

  // 0: all, 1: only unknown, 2: only known
  const classNameFlagKnown = () => {
    if (displayStore.onlyFlagKnown === 0) {
      return "FilterButton__knowflag inactive";
    } else if (displayStore.onlyFlagKnown === 1) {
      return "FilterButton__knowflag red";
    } else if (displayStore.onlyFlagKnown === 2) {
      return "FilterButton__knowflag green";
    }
  };

  const toolTipFlagKnow = () => {
    if (displayStore.onlyFlagKnown === 0) {
      return "Show only song you know";
    } else if (displayStore.onlyFlagKnown === 1) {
      return "Showing unknown only";
    } else if (displayStore.onlyFlagKnown === 2) {
      return "Showing known only";
    }
  };

  const iconFlagKnown = () => {
    if (displayStore.onlyFlagKnown === 0) {
      return <CheckOutlined />;
    } else if (displayStore.onlyFlagKnown === 1) {
      return <QuestionOutlined />;
    } else if (displayStore.onlyFlagKnown === 2) {
      return <CheckOutlined />;
    }
  };

  const handlerFlagKnown = () => {
    if (displayStore.onlyFlagKnown === 0) {
      displayStore.setOnlyFlagKnown(2);
    } else if (displayStore.onlyFlagKnown === 1) {
      displayStore.setOnlyFlagKnown(0);
    } else if (displayStore.onlyFlagKnown === 2) {
      displayStore.setOnlyFlagKnown(1);
    }
  };

  const showToolTip = () => {
    if (props.showFilters) {
      return false;
    } else if (mouseHover) {
      return true;
    }
    return false;
  };

  const widthButton = () => {
    if (!props.showFilters) {
      return { width: "2.7em" };
    }
    if (authStore.token !== null) {
      return { width: "16.8em" };
    }
    return { width: "12.3em" };
  };

  useEffect(() => {
    props.showFilters
      ? setTimeout(function () {
          document.getElementById(
            "FilterButton__actionContainer"
          ).style.display = "inline-block";
        }, 200)
      : (document.getElementById(
          "FilterButton__actionContainer"
        ).style.display = "none");
  }, [props.showFilters]);

  return (
    <Tooltip
      placement="left"
      title="Adjust what you see"
      visible={showToolTip()}
    >
      <div
        style={widthButton()}
        onMouseEnter={() => {
          setMouseHover(true);
        }}
        onMouseLeave={() => {
          setMouseHover(false);
        }}
        className={
          props.showFilters
            ? "FilterButton__float FilterButton__open"
            : "FilterButton__float"
        }
      >
        {!props.showFilters &&
          (displayStore.pianoOnly ||
            displayStore.bassOnly ||
            displayStore.guitarOnly ||
            displayStore.onlyBookmarked ||
            displayStore.onlyFlagKnown !== 0) && (
            <div className="FilterButton__badge"></div>
          )}
        <div
          className="FilterButton__actionContainer"
          id="FilterButton__actionContainer"
        >
          <div
            className={
              displayStore.pianoOnly
                ? "FilterButton__action icon__piano"
                : "FilterButton__action icon__piano inactive"
            }
            onClick={() => displayStore.setPianoOnly(!displayStore.pianoOnly)}
          >
            {" "}
            <Tooltip
              placement="bottom"
              title={
                displayStore.pianoOnly
                  ? "Click to reset this filter"
                  : "Show only songs for piano"
              }
            >
              <img width="22" height="22" src={piano} alt="piano"></img>
            </Tooltip>
          </div>
          <div
            className={
              displayStore.bassOnly
                ? "FilterButton__action icon__bass"
                : "FilterButton__action icon__bass inactive"
            }
            onClick={() => displayStore.setBassOnly(!displayStore.bassOnly)}
          >
            <Tooltip
              placement="bottom"
              title={
                displayStore.bassOnly
                  ? "Click to reset this filter"
                  : "Show only songs for bass"
              }
            >
              <img width="17" height="17" src={bass} alt="bass"></img>
            </Tooltip>
          </div>
          <div
            className={
              displayStore.guitarOnly
                ? "FilterButton__action icon__guitar"
                : "FilterButton__action icon__guitar inactive"
            }
            onClick={() => displayStore.setGuitarOnly(!displayStore.guitarOnly)}
          >
            <Tooltip
              placement="bottom"
              title={
                displayStore.guitarOnly
                  ? "Click to reset this filter"
                  : "Show only songs for guitar"
              }
            >
              <img width="17" height="17" src={guitar} alt="guitar"></img>
            </Tooltip>
          </div>
          {authStore.token !== null && (
            <>
              |
              <Tooltip placement="bottom" title={toolTipFlagKnow()}>
                <div
                  className={`FilterButton__action ${classNameFlagKnown()}`}
                  onClick={handlerFlagKnown}
                >
                  {iconFlagKnown()}
                </div>
              </Tooltip>
              <div
                className={
                  displayStore.onlyBookmarked
                    ? "FilterButton__action icon__bookmark"
                    : "FilterButton__action icon__bookmark inactive"
                }
                onClick={() =>
                  displayStore.setOnlyBookmarked(!displayStore.onlyBookmarked)
                }
              >
                <Tooltip
                  placement="bottom"
                  title={
                    displayStore.onlyBookmarked
                      ? "Showing only bookmarked songs"
                      : "Show only bookmarked songs"
                  }
                >
                  <img
                    width="17"
                    height="18"
                    src={bookmark}
                    alt="bookmark"
                  ></img>
                </Tooltip>
              </div>
            </>
          )}
          |
          <div
            className="FilterButton__action"
            onClick={() =>
              displayStore.setDisplayedAsList(!displayStore.displayedAsList)
            }
          >
            <Tooltip
              placement="bottom"
              title={
                displayStore.displayedAsList
                  ? "Switch to grid view"
                  : "Switch to list view"
              }
            >
              {displayStore.displayedAsList ? (
                <BarsOutlined className="icon__view" />
              ) : (
                <AppstoreOutlined className="icon__view" />
              )}
            </Tooltip>
          </div>
          |
        </div>
        <EyeOutlined
          onClick={() => props.setShowFilters(!props.showFilters)}
          className="FilterButton__icon"
        />
      </div>
    </Tooltip>
  );
});
