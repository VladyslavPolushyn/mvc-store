import ViewHeader from './view-header.js';

export default class ModelHeader {
    constructor() {
        this.view = new ViewHeader();
    }

    ordersOpen = () => {
        this.view.renderOrders();
    }
}