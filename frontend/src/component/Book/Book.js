import React, { Component } from "react";
import { Modal, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

import Page from './Page/Page';
import notFound from '../../images/notFound.png';

import './Book.css';

class Book extends Component {

    state = {
        songbookPages: [],
        isLoading: true,
        isError: false,
        showRandomModal: false,
    }

    componentDidMount() {
        this.loadPages();
    }

    loadPages() {
        async function fetchPages() {
            const response = await axios({
                url: process.env.REACT_APP_API_URL + "songbook",
                method: "GET",
            });
            if ((response.status !== 200) & (response.status !== 201)) {
                throw new Error("Error!");
            }
            const entries = await response.data;
            return entries;
        }
        // fetch Entries
        fetchPages().then((resData) => {
            const pages = resData;
            this.setState({ songbookPages: pages });
            this.setState({ isLoading: false });
        }
        ).catch(error => {
            this.setState({ isError: true, isLoading: false });
            console.log(error.message);
        });
    };

    handleRandomPick = () => {
        this.setState({ showRandomModal: !this.state.showRandomModal })
    }

    render() {

        const book = this.state.songbookPages.map(page => {

            let shouldBeDisplayed = true;

            if (page.bass) {
                shouldBeDisplayed = !this.props.filterBass;
            }
            if (page.piano) {
                shouldBeDisplayed = !this.props.filterPiano;
            }
            if (!page.bass && !page.piano) {
                shouldBeDisplayed = !this.props.filterGuitar;
            }
            if (!page.bookmark && this.props.onlyBookmarked) {
                shouldBeDisplayed = false;
            }

            //if belongs to search results
            if (this.props.searchValue && page.tags !== null && !page.tags.includes(this.props.searchValue)) {
                shouldBeDisplayed = false;
            } else {
                /* for debuggin only
                console.log(page.tags);
                console.log(this.props.searchValue); */
            }


            // 0: all, 1: only unknown, 2: only known
            if (this.props.onlyFlagKnown === 1) {
                if (page.checked) {
                    shouldBeDisplayed = false;
                }
            } else if (this.props.onlyFlagKnown === 2) {
                if (!page.checked) {
                    shouldBeDisplayed = false;
                }
            }

            if (shouldBeDisplayed) {
                return (
                    <div key={page.id}>
                        <Page
                            page={page}
                            token={this.props.token}
                        />
                    </div>
                );
            } else {
                return null
            }

        })

        const bookNotNull = book.filter((e) => {
            return e != null;
        });

        const listOfFilter = () => {
            let listOfFilter = ['guitar', 'piano', 'bass'];
            if (this.props.filterGuitar) { listOfFilter.splice(listOfFilter.indexOf('guitar'), 1); }
            if (this.props.filterPiano) { listOfFilter.splice(listOfFilter.indexOf('piano'), 1); }
            if (this.props.filterBass) { listOfFilter.splice(listOfFilter.indexOf('bass'), 1); }
            if (this.props.onlyBookmarked) { listOfFilter.push('bookmarked'); }
            if (this.props.onlyFlagKnown === 1) { listOfFilter.push('unknown'); }
            else if (this.props.onlyFlagKnown === 2) { listOfFilter.push('known'); }
            return listOfFilter;
        }

        const formatedListOfFilter = () => {
            let formatedListOfFilter = listOfFilter();
            if (formatedListOfFilter.length > 1) {
                const firstElement = formatedListOfFilter.slice(0, formatedListOfFilter.length - 1);
                const lastElement = formatedListOfFilter[formatedListOfFilter.length - 1];

                return firstElement.join(", ") + " & " + lastElement;
            }
            return formatedListOfFilter[0];
        }

        const randomPic = Math.floor(Math.random() * bookNotNull.length);

        return (
            <div style={{ width: "100%" }}>
                <Modal
                    visible={this.state.showRandomModal}
                    onCancel={() => this.setState({ showRandomModal: false })}
                    footer={null}
                    width={409}
                    closable={false}
                    className="randomPickModal"
                    centered
                >
                    <div className="centered">
                        {bookNotNull[randomPic]}
                    </div>

                </Modal>
                { this.state.isLoading ?
                    <div className="Book__spinner">
                        <div>
                            <img src="https://avatars0.githubusercontent.com/u/12551446" className="loader" alt="Loading" />
                            <br />
                            <div style={{ fontSize: 18, marginTop: 10, color: "white" }}>Loading ... </div>
                        </div>
                    </div>
                    :
                    this.state.isError ?
                        <div className="Book__spinner">
                            <div>
                                <CloseOutlined className="error__icon" />
                                <img src="https://avatars0.githubusercontent.com/u/12551446" className="error" alt="Error" />
                                <br />
                                <div style={{ fontSize: 18, marginTop: 10, color: "white" }}>Error connecting to the backend!</div>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="Book__resultInfos">
                                {listOfFilter().length > 0 && (
                                    <>
                                        {bookNotNull.length + " songs for " + formatedListOfFilter()}
                                        &nbsp;-&nbsp;
                                        <Tooltip placement="bottomLeft" title={"Random song from this selection."}>
                                            <span className="Book_resutltRamdomPick" onClick={this.handleRandomPick}>[random pick]</span>
                                        </Tooltip>
                                    </>
                                )}
                            </div>

                            {bookNotNull.length > 0 ?
                                (<div className="Book__main">
                                    {book}
                                </div>)
                                :
                                (
                                    <div className="Book__nothingFound">
                                        <div style={{ marginBottom: "15px" }}>
                                            <img src={notFound} className="nothingFound" alt="Nothing found" /><br />
                                            <div style={{ fontSize: 14, marginTop: 10, color: "white", opacity: .15 }}>Nothing found!</div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }
            </div>
        );
    }
}

export default Book;
