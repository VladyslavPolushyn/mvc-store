import events from './events.js';

export default class Publisher {

    listeners = {};

    subscribe = (eventType, listener) => {
        this.getListeners(eventType).push(listener);
    }
        
    unsubscribe = (eventType, listener) => {
        this.listeners[eventType] = this.getListeners(eventType).filter(func => func != listener);
    }
        
    notify = (eventType, data) => {
        this.getListeners(eventType).forEach(listener => listener(data));
    }

    getListeners = eventType => {
        if(!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }

        return this.listeners[eventType];
    }

    get methods() {
        return {
            notify : this.notify,
            unsubscribe : this.unsubscribe,
            subscribe : this.subscribe,
            events : events
        }
    }
        
}