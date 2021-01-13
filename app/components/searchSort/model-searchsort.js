export default class ModelSearchSort {

    sort = type => {
        const sortMethods = {
            'low-price': (a, b) => a.price - b.price,
            'high-price': (a, b) => b.price - a.price
        }
        return this.records.sort(sortMethods[type]);
    }

    search = text => {
        const textL = text.toLowerCase().trim();
        return this.records.filter(item => {
            return item.name.toLowerCase().includes(textL)
        });
    }

    filterCategory = category => {
        if(category === 'All') {
            return this.records;
        }
        return this.records.filter(item => item.category === category);
    }

}