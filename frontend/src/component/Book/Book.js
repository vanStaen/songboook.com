import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getPages } from "./getPages";
import { getRandomized } from "./getRandomized";

import Page from "./Page/Page";
import notFound from "../../images/notFound.png";

import "./Book.css";

const Book = (props) => {
  const [songbookPages, setSongbookPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pageHasChanged, setPageHasChanged] = useState(false);
  const [randomPageId, setRandomPageId] = useState(null);

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
    loadPages();
    setPageHasChanged(false);
    setNewSongAdded(false);
  }, [pageHasChanged, newSongAdded]);

  const book = songbookPages.map((page) => {
    let shouldBeDisplayed = true;

    if (page.bass) {
      shouldBeDisplayed = !props.filterBass;
    }
    if (page.piano) {
      shouldBeDisplayed = !props.filterPiano;
    }
    if (!page.bass && !page.piano) {
      shouldBeDisplayed = !props.filterGuitar;
    }
    if (!page.bookmark && props.onlyBookmarked) {
      shouldBeDisplayed = false;
    }

    //if belongs to search results
    if (
      props.searchValue &&
      page.tags !== null &&
      !page.tags.includes(props.searchValue)
    ) {
      shouldBeDisplayed = false;
    }

    // 0: all, 1: only unknown, 2: only known
    if (props.onlyFlagKnown === 1) {
      if (page.checked) {
        shouldBeDisplayed = false;
      }
    } else if (props.onlyFlagKnown === 2) {
      if (!page.checked) {
        shouldBeDisplayed = false;
      }
    }

    if (shouldBeDisplayed) {
      return (
        <div key={page.id} id={page.id}>
          <Page
            page={page}
            token={props.token}
            logout={props.logout}
            randomPageId={randomPageId}
            setRandomPageId={setRandomPageId}
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

  const handleRandomPick = async () => {
    try {
      const randomPage = await getRandomized();
      setRandomPageId(randomPage.id);
      console.log(randomPage.id);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    if (randomPageId !== null) {
      const randomlySelectedPage = document.getElementById(randomPageId);
      const randomlySelectedPageTop = randomlySelectedPage.getBoundingClientRect()
        .top;
      const heightScreen = window.innerHeight;
      const offSetScreen = (heightScreen - 330) / 2;
      window.scrollTo({
        top: randomlySelectedPageTop - offSetScreen,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [randomPageId]);

  const listOfFilter = () => {
    let listOfFilter = ["guitar", "piano", "bass"];
    if (props.filterGuitar) {
      listOfFilter.splice(listOfFilter.indexOf("guitar"), 1);
    }
    if (props.filterPiano) {
      listOfFilter.splice(listOfFilter.indexOf("piano"), 1);
    }
    if (props.filterBass) {
      listOfFilter.splice(listOfFilter.indexOf("bass"), 1);
    }
    if (props.onlyBookmarked) {
      listOfFilter.push("bookmarked");
    }
    if (props.onlyFlagKnown === 1) {
      listOfFilter.push("unknown");
    } else if (props.onlyFlagKnown === 2) {
      listOfFilter.push("known");
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

  return (
    <div
      style={{ width: "100%" }}
      onClick={() => {
        randomPageId && setRandomPageId(null);
      }}
    >
      {isLoading ? (
        <div className="Book__spinner">
          <div>
            <img
              src="https://avatars0.githubusercontent.com/u/12551446"
              className="loader"
              alt="Loading"
            />
            <br />
            <div style={{ fontSize: 18, marginTop: 10, color: "white" }}>
              Loading ...{" "}
            </div>
          </div>
        </div>
      ) : isError ? (
        <div className="Book__spinner">
          <div>
            <CloseOutlined className="error__icon" />
            <img
              src="https://avatars0.githubusercontent.com/u/12551446"
              className="error"
              alt="Error"
            />
            <br />
            <div style={{ fontSize: 18, marginTop: 10, color: "white" }}>
              Error connecting to the backend!
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="Book__resultInfos">
            {listOfFilter().length > 0 && (
              <>
                {bookNotNull.length + " songs for " + formatedListOfFilter()}
                &nbsp;-&nbsp;
                <Tooltip
                  placement="bottomLeft"
                  title={"Random song from this selection."}
                >
                  <span
                    className="Book_resultRandomPick"
                    onClick={handleRandomPick}
                  >
                    [random pick]
                  </span>
                </Tooltip>
              </>
            )}
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
};

export default Book;
