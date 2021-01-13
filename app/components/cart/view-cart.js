export default class ViewCart {

    cartContainer = document.querySelector('.cart-container');

    constructor(cbAdd, cbOpen, cbRemove, cbOrder, cbCount) {

        this.cbRemove = cbRemove;
        this.cbOrder = cbOrder;
        this.cbCount = cbCount;

        this.cartContainer.innerHTML = `
            <button type="button" data-bs-toggle="modal" data-bs-target="#cartModal" class="cart-btn btn btn-info mt-2 position-relative">Cart <i class="fa fa-shopping-cart" aria-hidden="true"></i><span class="cart-count position-absolute"></span></button>
            <!-- Modal CART-->
            <div class="modal fade cart-modal" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content modal-cart-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="cartModalLabel">Cart</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body cart-body"></div>
                        <!-- Button trigger modal FORM -->
                        <button type="button" class="make-order-btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#orderFormModal">
                            Make order
                        </button>
                    </div>
                </div>
            </div>
            <!-- Modal FORM-->
            <div class="modal fade form-modal" id="orderFormModal" tabindex="-1" aria-labelledby="orderFormModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="orderFormModalLabel">Order Form</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="form-field">
            
                    </form>
                </div>
                </div>
            </div>
            </div>
        `;

        this.cartBody = document.querySelector('.cart-body');
        this.addBtnArr = document.querySelectorAll('.add-btn');
        this.cartBtn = document.querySelector('.cart-btn');
        this.makeOrderBtn = document.querySelector('.make-order-btn');

        this.makeOrderBtn.addEventListener('click', () => {
            document.querySelector('.cart-modal').classList.remove('show');
            document.querySelector('.modal-backdrop').classList.remove('modal-backdrop');
        });

        this.addBtnArr.forEach(elem => {
            elem.addEventListener('click', cbAdd);
        });

        this.cartBtn.addEventListener('click', cbOpen);

    }

    renderCartBody = cardItems => {

        if(cardItems.length === 0){
            this.makeOrderBtn.setAttribute('disabled', '');
            this.cartBody.innerHTML = 'Your cart is empty :(';
        }else {
            this.makeOrderBtn.removeAttribute('disabled');
            this.cartBody.innerHTML = cardItems.map(item => this.renderCartItem(item)).join('');
            this.cartBody.insertAdjacentHTML('beforeend', `
                <hr>
                <h6>Total sum of order: <span class="total-sum"></span> ₴</h6> 
            `);

            this.form = document.querySelector('.form-field');
            this.form.addEventListener('submit', this.cbOrder);
            this.form.innerHTML = `
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" required pattern="[a-zA-Zа-яА-ЯёЁ ]+">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">E-mail</label>
                    <input type="email" class="form-control" id="email" required pattern="[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone number</label>
                    <input type="text" class="form-control" id="phone" value="+380" required maxlength="13" pattern="[\+380]+[0-9]{12}">
                </div>
                <button type="submit" class="order-btn btn btn-primary">Submit</button>
            `

            this.countInputs = document.querySelectorAll('.item-count-input');
            this.countInputs.forEach(elem => {
                elem.addEventListener('input', this.cbCount)
            });

        }

        this.removeBtnArr = document.querySelectorAll('.remove-btn');
        this.removeBtnArr.forEach(elem => {
            elem.addEventListener('click', this.cbRemove);
        });
    }

    renderCartItem = cardItem => {
        return `
            <div class="cart-item bg-light mb-2 p-2">
                <p class="m-0 fw-bold">${cardItem.name} | ${cardItem.units}</p>

                <div class="cart-info d-flex flex-wrap justify-content-between">
                    <p class="">
                        Price: ${cardItem.price} ₴  
                    </p>
                    <p class="">
                        Total: <span class="total-sum-item-${cardItem.id}">${cardItem.sum}</span> ₴  
                    </p>
                    <div class="d-flex flex-wrap">
                        <input type="number" value="${cardItem.count}" class="item-count-input" data-id="${cardItem.id}" min="1" max="${cardItem.amount}">
                        <button class="remove-btn btn btn-danger" type="button" data-id="${cardItem.id}">&#10005;</button>
                    </div>
                </div>
            </div>
        `
    }

    renderTotalSumOfItem = (event, records) => {
        const itemId = event.target.getAttribute('data-id');
        let currentItem;
        for(let elem of records) {
            if(elem.id === itemId) {
                currentItem = elem;
                break;
            }
        }
        document.querySelector(`.total-sum-item-${itemId}`).innerHTML = currentItem.sum;
    }

    renderTotalSum = totalSum => {
        document.querySelector('.total-sum').innerHTML = totalSum;
    }

    renderSuccessSubmit = form => {
        form.innerHTML = `
            <h6>
                Thank you for order!
            </h6>
            <p>
                Our manager will contact you soon.
            </p>
        `;  
    }
}