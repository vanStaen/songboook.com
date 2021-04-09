import { action, makeObservable, observable } from "mobx";

export class DisplayStore {

    filterBass = false;
    filterPiano = null;
    filterGuitar = false;
    onlyBookmarked = false;
    onlyFlagKnown = 0; // 0: all, 1: only unknown, 2: only known
    showPage = "book";

    constructor() {
        makeObservable(this, {
            filterBass: observable,
            setFilterBass: action,
            filterPiano: observable,
            setFilterPiano: action,
            filterGuitar: observable,
            setFilterGuitar: action,
            onlyBookmarked: observable,
            setOnlyBookmarked: action,
            onlyFlagKnown: observable,
            setOnlyFlagKnown: action,
            showPage: observable,
            setShowPage: action,
        });
    }

    setFilterBass = (filterBass) => {
        this.filterBass = filterBass;
    };

    setFilterPiano = (filterPiano) => {
        this.filterPiano = filterPiano;
    };

    setFilterGuitar = (filterGuitar) => {
        this.filterGuitar = filterGuitar;
    };

    setOnlyBookmarked = (onlyBookmarked) => {
        this.onlyBookmarked = onlyBookmarked;
    };

    setOnlyFlagKnown = (onlyFlagKnown) => {
        this.onlyFlagKnown = onlyFlagKnown;
    };

    setShowPage = (setShowPage) => {
        this.setShowPage = setShowPage;
    };

}

export const displayStore = new DisplayStore();
