import ModelHeader from './model-header.js';
import ViewHeader from './view-header.js';

export default class ControllerHeader {
    constructor() {
        this.model = new ModelHeader();
        this.view = new ViewHeader(this.onOrdersOpen);
        this.init();
    }

    init = () => {
        this.view.renderHeader();
    }

    onOrdersOpen = () => {
        this.model.ordersOpen();
    }
}