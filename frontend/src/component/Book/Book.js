import React, { Component } from "react";
import { CloseOutlined } from '@ant-design/icons';

import Page from '../Page/Page'
import axios from 'axios';

import './Book.css';

class Book extends Component {

    state = {
        songbookPages: [],
        isLoading: true,
        isError: false,
    }

    componentDidMount() {
        this.loadPages();
    }


    loadPages() {
        async function fetchPages() {
            const response = await axios({
                url: process.env.REACT_APP_API_URL,
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


    render() {
        const book = this.state.songbookPages.map(page => {
            return (
                <div key={page.id}>
                    <Page page={page} />
                </div>
            );
        })
        return (
            <div style={{ width: "100%" }}>
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
                        <div className="Book__main">
                            {book}
                        </div>
                }
            </div>
        );
    }
}

export default Book;
