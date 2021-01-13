import ModelBot from './model-bot.js';

export default class ControllerBot {
    constructor({ subscribe, events, notify }) {
        this.model = new ModelBot();
        this.subscribe = subscribe;
        this.notify = notify;
        this.events = events;
        subscribe(events.SEND_MESSAGE, this.onSend);
    }

    onSend = text => {
        this.model.send(text);
    }
    

}