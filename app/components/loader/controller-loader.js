import ViewLoader from './view-loader.js';

export default class ControllerLoader {
    constructor({subscribe, unsubscribe, events}) {
        this.view = new ViewLoader();
        subscribe(events.LOADED_DATA, this.onLoad);
        this.unsubscribe = unsubscribe;

        this.events = events;
    }

    onLoad = () => {
        this.unsubscribe(this.events.LOADED_DATA, this.onLoad);
        this.view.hideLoader();
    }
}