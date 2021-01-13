export default class ModelBot {
    // https://api.telegram.org/bot1458340316:AAEWHATaWTznDzvKHTztItS6c9REObJRYSo/sendMessage?chat_id=471270721&text=hellooooo

    constructor() {
        this.token = localStorage.getItem('bot');
        this.chatId = localStorage.getItem('chatId');
    }

    get url() {
        return `https://api.telegram.org/bot${ this.token }/sendMessage?chat_id=${ this.chatId }&parse_mode=MarkdownV2&text=`
    }

    send = text => {
        fetch(`${ this.url }${ text }`);
    }
}