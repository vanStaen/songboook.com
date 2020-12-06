import React, { Component } from "react";
import Page from '../Page/Page'
import axios from 'axios';

import './Book.css';

class Book extends Component {

    state = {
        songbookPages: [],
        isLoading: true,
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
            <div style={{ margin: 30 }}>
                { this.state.isLoading ?
                    <div>
                        <img src="https://avatars0.githubusercontent.com/u/12551446" className="book-loader" alt="Loading" />
                        <br />
                        <div style={{ fontSize: 18 }}>Loading ... </div>
                    </div>
                    :
                    (<div className="Book__main">
                        {book}
                    </div>)
                }

            </div>
        );
    }
}

export default Book;
