export default class ModelCart {
    cardItems = [];

    add = (event) => {

        for(let elem of this.cardItems) {
            if( elem.id === event.target.getAttribute('data-id') ){
                elem.count = +elem.count;
                elem.count += 1;
                elem.sum = elem.count * elem.price;
                return this.cardItems;
            }
        }

        this.cardItems.push(this.records.filter(elem => {
            if(elem.id === event.target.getAttribute('data-id')) {
                elem.count = 1;
                elem.sum = elem.count * elem.price; 
            }
            return elem.id === event.target.getAttribute('data-id');
        })[0]);

        return this.cardItems;
    }

    remove = event => {
        this.cardItems = this.cardItems.filter(elem => elem.id !== event.target.getAttribute('data-id'));
        return this.cardItems;
    }

    open = () => {
        return this.cardItems;
    }

    order = () => {
        return this.cardItems;
    }

    count = event => {

        this.cardItems.forEach(elem => {
            if(elem.id === event.target.getAttribute('data-id')) {
   
                elem.count = event.target.value;
                if (+elem.count > +elem.amount) {
                    elem.count = elem.amount;
                    event.target.value = elem.amount;
                }else if (elem.count < 1) {
                    elem.count = 1;
                    event.target.value = 1;
                }
                
            }
            elem.sum = elem.count * elem.price;
        })

        return this.cardItems;
    }

    getTotalSum = cartItems => {
        let totalSum = 0;

        for(let elem of cartItems) {
            totalSum += elem.sum;
        }

        return totalSum;
    }

    clearCart = cartItems => {
        this.cardItems = [];
        return this.cardItems;
    }

}