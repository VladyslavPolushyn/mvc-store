export default class ModelRecord {
    records = [];
    columnTitles = ['id', 'name', 'manufacture', 'category', 'ingridients', 'amount', 'units', 'price', 'img'];
    url = 'https://spreadsheets.google.com/feeds/cells/1PXorfz2O2NqH-FcW0nA-HhmtZMmSSwgHheifWc0e1tU/1/public/full?alt=json';
    columnCount = 9;

    loadRecords = () => {
        // We need to return Promise to controller
        return fetch(this.url)
            .then(response => response.json())
            .then(data => this.parseData(data.feed.entry));

    }

    parseData = (data) => {
        const tempArr = data.map(item => item.gs$cell.$t);
        const tempArrLength = tempArr.length;
    
        for (let i = 0; i < tempArrLength / this.columnCount; i++) {
    
            const item = {};
    
            for (let k = 0; k < this.columnCount; k++) {
                item[this.columnTitles[k]] = tempArr.shift();
            }
            this.records.push(item);
    
        }
    
        // Remove column Titles from records
        this.records.shift();
        return this.records;
    }

}