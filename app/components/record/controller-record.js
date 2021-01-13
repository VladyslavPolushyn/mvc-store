import ModelRecord from './model-record.js';
import ViewRecord from './view-record.js';

export default class ControllerRecord {
	constructor({ notify, events, subscribe }) {
		this.model = new ModelRecord();
		this.view = new ViewRecord();

		this.init();

		this.notify = notify;
		this.events = events;

		subscribe(events.AFTER_SEARCH, this.onSearchSort);
		subscribe(events.AFTER_SORT, this.onSearchSort);
		subscribe(events.AFTER_FILTER, this.onSearchSort);

	}

	init = () => {
		this.model.loadRecords()
			.then(data => {
				this.view.renderCardsField(data);
				this.notify(this.events.LOADED_DATA, data);
			});
	}

	onSearchSort = data => {
		this.view.renderCardsField(data);
	}

}