import ModelCart from './model-cart.js';
import ViewCart from './view-cart.js';

export default class ControllerCart {

    constructor({ subscribe, notify, events }) {
        this.model = new ModelCart();
        this.subscribe = subscribe;
        this.notify = notify;
        this.events = events;
        //Инициализируем View после рендера товаров
        this.subscribe(events.LOADED_DATA, this.init);
        this.subscribe(events.AFTER_SORT, this.init);
        this.subscribe(events.AFTER_SEARCH, this.init);
        this.subscribe(events.AFTER_FILTER, this.init);
        
    }

    init = data => {
        this.model.records = data;
        this.view = new ViewCart(this.onAdd, this.onOpen, this.onRemove, this.onOrder, this.onCount);
    }

    onAdd = event => {
        const records = this.model.add(event);
        return records;
    }

    onOpen = () => {
        const records = this.model.open();
        this.view.renderCartBody(records);

        if(records.length > 0) {
            const totalSum = this.model.getTotalSum(records);
            this.view.renderTotalSum(totalSum);
        }
        
    }

    onRemove = event => {
        const records = this.model.remove(event);
        this.view.renderCartBody(records);

        if (records.length > 0) {
            const totalSum = this.model.getTotalSum(records);
            this.view.renderTotalSum(totalSum);
        }     

    }

    onOrder = event => {
        event.preventDefault();
        
        const name = event.target[0].value;
        const email = event.target[1].value;
        const phone = event.target[2].value;

        const records = this.model.order();

        let text = encodeURI(`*New Order*\n*Name:* ${name}\n*E-mail:* ${email}\n*Phone:* ${phone}\n`.replace(/\-/g, '\\-').replace(/\./g, '\\.'));

        for(let item of records) {
            let itemText = encodeURI(`✔ *${item.name}* \\| ${item.units} \\| Quantity: ${item.count} \\| Price per item: ${item.price}\n`.replace(/\./g, '\\.'));
            text += itemText;
        }

        text += encodeURI(`*Total order sum:* ${this.model.getTotalSum(records)}`);

        this.notify(this.events.SEND_MESSAGE, text);

        const date = new Date();

        records.push({
            'buyerName' : name,
            'email' : email,
            'phone' : phone,
            'date' : date.toLocaleDateString(),
            'totalSum' : this.model.getTotalSum(records)
        });

        let orders = JSON.parse(localStorage.getItem('orders'));

        if (orders) {
            orders.push(records);
            localStorage.setItem('orders', JSON.stringify(orders));
        }else {
            localStorage.setItem('orders', JSON.stringify([records]));
        }

        event.target.reset();
        
        this.model.clearCart(records);
        this.view.renderSuccessSubmit(event.target);

    }

    onCount = event => {
        const records = this.model.count(event);
        const totalSum = this.model.getTotalSum(records);
        this.view.renderTotalSumOfItem(event, records);
        this.view.renderTotalSum(totalSum);
    }
    
}