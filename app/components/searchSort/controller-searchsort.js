import ModelSearchSort from './model-searchsort.js';
import ViewSearchSort from './view-searchsort.js';

export default class ControllerSearchSort {
    constructor({ subscribe, events, notify}) {
        this.view = new ViewSearchSort(this.onSort, this.onSearch, this.onFilterCategory);
        this.model = new ModelSearchSort();

        this.events = events;
        this.notify = notify;

        subscribe(events.LOADED_DATA, this.onLoad);
    }

    onLoad = data => {
        this.model.records = data;
    }

    onSort = event => {
		const records = this.model.sort(event.target.value);
        this.notify(this.events.AFTER_SORT, records);
	}

	onSearch = event => {
		const records = this.model.search(event.target.value);
        this.notify(this.events.AFTER_SEARCH, records);
	}

	onFilterCategory = event => {
		const records = this.model.filterCategory(event.target.value);
        this.notify(this.events.AFTER_FILTER, records);
	}
}