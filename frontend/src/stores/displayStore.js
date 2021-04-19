import { action, makeObservable, observable } from "mobx";

export class DisplayStore {

    bassOnly = false;
    pianoOnly = false;
    guitarOnly = false;
    onlyBookmarked = false;
    onlyFlagKnown = 0; // 0: all, 1: only unknown, 2: only known
    displayedAsList = false;
    isInEditMode = false;
    sizeListview = window.innerWidth - 200;
    showPage = "book";

    constructor() {
        makeObservable(this, {
            bassOnly: observable,
            setBassOnly: action,
            pianoOnly: observable,
            setPianoOnly: action,
            guitarOnly: observable,
            setGuitarOnly: action,
            onlyBookmarked: observable,
            setOnlyBookmarked: action,
            onlyFlagKnown: observable,
            setOnlyFlagKnown: action,
            showPage: observable,
            setShowPage: action,
            displayedAsList: observable,
            setDisplayedAsList: action,
            isInEditMode: observable,
            setIsInEditMode: action,
            sizeListview: observable,
            setSizeListview: action,
        });
    }

    setBassOnly = (bassOnly) => {
        if (bassOnly === true) {
            this.bassOnly = true;
            this.pianoOnly = false;
            this.guitarOnly = false;
        } else {
            this.bassOnly = false;
            this.pianoOnly = false;
            this.guitarOnly = false;
        }
    };

    setPianoOnly = (pianoOnly) => {
        if (pianoOnly === true) {
            this.bassOnly = false;
            this.pianoOnly = true;
            this.guitarOnly = false;
        } else {
            this.bassOnly = false;
            this.pianoOnly = false;
            this.guitarOnly = false;
        }
    };

    setGuitarOnly = (guitarOnly) => {
        if (guitarOnly === true) {
            this.bassOnly = false;
            this.pianoOnly = false;
            this.guitarOnly = true;
        } else {
            this.bassOnly = false;
            this.pianoOnly = false;
            this.guitarOnly = false;
        }
    };

    setOnlyBookmarked = (onlyBookmarked) => {
        this.onlyBookmarked = onlyBookmarked;
    };

    setOnlyFlagKnown = (onlyFlagKnown) => {
        this.onlyFlagKnown = onlyFlagKnown;
    };

    setShowPage = (showPage) => {
        this.showPage = showPage;
    };

    setDisplayedAsList = (displayedAsList) => {
        this.displayedAsList = displayedAsList;
    };

    setIsInEditMode = (isInEditMode) => {
        this.isInEditMode = isInEditMode;
    };

    setSizeListview = (sizeListview) => {
        this.sizeListview = sizeListview;
    };



}

export const displayStore = new DisplayStore();
