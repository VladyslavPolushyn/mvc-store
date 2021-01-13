import ControllerRecord from './app/components/record/controller-record.js';
import ControllerHeader from './app/components/header/controller-header.js';
import ControllerCart from './app/components/cart/controller-cart.js';
import ControllerLoader from './app/components/loader/controller-loader.js';
import ControllerBot from './app/components/bot/controller-bot.js';
import Publisher from './app/helpers/publisher.js';
import ControllerSearchSort from './app/components/searchSort/controller-searchsort.js';

const publisher = new Publisher();
const loader = new ControllerLoader(publisher.methods);
const header = new ControllerHeader();
const record = new ControllerRecord(publisher.methods);
const cart = new ControllerCart(publisher.methods);
const bot = new ControllerBot(publisher.methods);
const searchSort = new ControllerSearchSort(publisher.methods);