import { action, makeObservable, observable } from "mobx";

export class FormStore {
  artist = null;
  song = null;
  level = null;
  type = "guitar";
  link = null;
  picurl = null;
  videourl = null;

  constructor() {
    makeObservable(this, {
      artist: observable,
      setArtist: action,
      song: observable,
      setSong: action,
      type: observable,
      setType: action,
      level: observable,
      setLevel: action,
      link: observable,
      setLink: action,
      picurl: observable,
      setPicurl: action,
      videourl: observable,
      setVideourl: action,
    });
  }

  setArtist = (artist) => {
    this.artist = artist;
  };
  setSong = (song) => {
    this.song = song;
  };
  setType = (type) => {
    this.type = type;
  };
  setLevel = (level) => {
    this.level = level;
  };
  setLink = (link) => {
    this.link = link;
  };

  setPicurl = (picurl) => {
    this.picurl = picurl;
  };

  setVideourl = (videourl) => {
    this.videourl = videourl;
  };
}

export const formStore = new FormStore();
