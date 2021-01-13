export default class ViewLoader {
    preloader = document.querySelector('.preloader');
    hideLoader = () => {
        this.preloader.innerHTML = '';
        this.preloader.classList.remove('preloader');
    }
}