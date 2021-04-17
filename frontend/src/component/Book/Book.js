import React, { useState, useEffect, useLayoutEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Tooltip } from "antd";

import Page from "./Page/Page";
import { getPages } from "./getPages";
import { Spinner } from "../Spinner/Spinner";
import { displayStore } from "../../stores/displayStore";

import notFound from "../../images/notFound.png";
import logo from "../../images/logo.png";

import "./Book.css";

const Book = observer((props) => {
  const [songbookPages, setSongbookPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pageHasChanged, setPageHasChanged] = useState(false);
  const [positionHeader, setPositionHeader] = useState();

  const newSongAdded = props.newSongAdded;
  const setNewSongAdded = props.setNewSongAdded;

  const loadPages = () => {
    //fetch Entries
    getPages()
      .then((resData) => {
        setSongbookPages(resData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        console.log(error.message);
      });
  };

  useEffect(() => {
    calculatePositionHeader();
    window.addEventListener("resize", calculatePositionHeader);
    return () => {
      window.removeEventListener("resize", calculatePositionHeader);
    };
  }, []);

  useEffect(() => {
    loadPages();
    setPageHasChanged(false);
    setNewSongAdded(false);
  }, [pageHasChanged, newSongAdded, setNewSongAdded]);

  const book = songbookPages.map((page) => {
    let shouldBeDisplayed = true;

    if (displayStore.bassOnly) {
      shouldBeDisplayed = page.bass;
    }
    else if (displayStore.pianoOnly) {
      shouldBeDisplayed = page.piano;
    }
    else if (displayStore.guitarOnly) {
      shouldBeDisplayed = !page.piano && !page.bass;
    }

    if (!page.bookmark && displayStore.onlyBookmarked) {
      shouldBeDisplayed = false;
    }

    //if belongs to search results
    if (props.searchValue) {
      const tagsIncludeSearchValue = page.tags.includes(props.searchValue);
      const objectsInsclueSearchValue = Object.values(page).some((value) =>
        String(value).includes(props.searchValue)
      );

      if (tagsIncludeSearchValue || objectsInsclueSearchValue) {
        shouldBeDisplayed = true;
      } else {
        shouldBeDisplayed = false;
      }
    }

    // 0: all, 1: only unknown, 2: only known
    if (displayStore.onlyFlagKnown === 1) {
      if (page.checked) {
        shouldBeDisplayed = false;
      }
    } else if (displayStore.onlyFlagKnown === 2) {
      if (!page.checked) {
        shouldBeDisplayed = false;
      }
    }

    if (shouldBeDisplayed) {
      return (
        <div key={page.id} id={page.id}>
          <Page
            page={page}
            randomPageId={props.randomPageId}
            setRandomPageId={props.setRandomPageId}
            setPageHasChanged={setPageHasChanged}
          />
        </div>
      );
    } else {
      return null;
    }
  });

  const bookNotNull = book.filter((e) => {
    return e != null;
  });

  useLayoutEffect(() => {
    if (props.randomPageId !== null) {
      const randomlySelectedPage = document.getElementById(props.randomPageId);
      const randomlySelectedPageTop = randomlySelectedPage.getBoundingClientRect()
        .top;
      const heightScreen = window.innerHeight;
      const offSetScreen = (heightScreen - 330) / 2;
      const heightPosition = window.scrollY;
      const scrolltarget =
        randomlySelectedPageTop < 0
          ? randomlySelectedPageTop + heightPosition
          : heightPosition + randomlySelectedPageTop;
      window.scrollTo({
        top: scrolltarget - offSetScreen,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [props.randomPageId]);

  const listOfFilter = () => {
    let listOfFilter = ["guitar", "piano", "bass"];
    if (displayStore.guitarOnly) {
      listOfFilter = ["guitar"];
    }
    else if (displayStore.pianoOnly) {
      listOfFilter = ["piano"];
    }
    if (displayStore.bassOnly) {
      listOfFilter = ["bass"];
    }
    return listOfFilter;
  };

  const formatedListOfFilter = () => {
    let formatedListOfFilter = listOfFilter();
    if (formatedListOfFilter.length > 1) {
      const firstElement = formatedListOfFilter.slice(
        0,
        formatedListOfFilter.length - 1
      );
      const lastElement = formatedListOfFilter[formatedListOfFilter.length - 1];

      return firstElement.join(", ") + " & " + lastElement;
    }
    return formatedListOfFilter[0];
  };

  const resultInfos = () => {
    let bookmarked = "";
    let known = "";
    if (displayStore.onlyBookmarked) {
      bookmarked = "bookmarked";
    }
    if (displayStore.onlyFlagKnown === 1) {
      known = "unknown";
    } else if (displayStore.onlyFlagKnown === 2) {
      known = "known";
    }

    return (
      <>
        {`${bookNotNull.length} 
        ${bookmarked} ${known} songs for 
        ${props.searchValue
            ? ` filter '${props.searchValue}'`
            : formatedListOfFilter()
          }`}
      </>
    );
  };

  const calculatePositionHeader = () => {
    const widthOfAPageInPixel = 362;
    const marginLeftOfAPageInPixel = 15;
    const widthOfBookInPixel = document.getElementById("bookContainer")
      .clientWidth;
    const pagePerRow = Math.floor(
      (widthOfBookInPixel - 90) / widthOfAPageInPixel
    );
    const positionFromLeft =
      (widthOfBookInPixel - pagePerRow * widthOfAPageInPixel) / 2 +
      marginLeftOfAPageInPixel +
      10;
    setPositionHeader(positionFromLeft);
  };

  return (
    <div
      style={{ width: "100%" }}
      id="bookContainer"
      onClick={() => {
        props.randomPageId && props.setRandomPageId(null);
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <div className="Book__centered">
          <div>
            <CloseOutlined className="error__icon" />
            <img src={logo} className="error" alt="Error" />
            <br />
            <div style={{ fontSize: 18, marginTop: 15, color: "white" }}>
              Error connecting to the backend!
            </div>
          </div>
        </div>
      ) : (
            <div>
              <div className="Book__header" style={{ marginLeft: positionHeader }}>
                <Tooltip placement="top" title={<span style={{ fontSize: "12px" }}>Love from Berlin</span>}>
                  <img src={logo} className="Book__logoHeader" alt="logotest" />
                </Tooltip>
                <span className="Book__logo">
                  ongbo<b>0</b>ok
            </span>
            &nbsp; | &nbsp; {resultInfos()}
              </div>
              {bookNotNull.length > 0 ? (
                <div className="Book__main">{book}</div>
              ) : (
                  <div className="Book__nothingFound">
                    <div style={{ marginBottom: "15px" }}>
                      <img
                        src={notFound}
                        className="nothingFound"
                        alt="Nothing found"
                      />
                      <br />
                      <div
                        style={{
                          fontSize: 14,
                          marginTop: 10,
                          color: "white",
                          opacity: 0.15,
                        }}
                      >
                        Nothing found!
                </div>
                    </div>
                  </div>
                )}
            </div>
          )}
    </div>
  );
});

export default Book;
