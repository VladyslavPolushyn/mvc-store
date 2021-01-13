export default class ViewHeader {
    mainHeader = document.querySelector('.main-header');

    constructor(cbOrdersOpen) {
        this.renderHeader = () => {
            this.mainHeader.innerHTML = `
                <div class="container">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                        <a class="navbar-brand mt-2" href="index.html">Yeda</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse mt-2" id="navbarSupportedContent">
                            <button class="btn btn-warning mt-2 me-2 order-btn" data-bs-toggle="modal" data-bs-target="#ordersModal">Orders <i class="fa fa-list-alt" aria-hidden="true"></i></button>
                            <!-- Modal -->
                            <div class="modal fade" id="ordersModal" tabindex="-1" aria-labelledby="ordersModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="ordersModalLabel">Your Orders</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="orders-body modal-body"></div>
                                </div>
                            </div>
                            </div>
                            <div class="cart-container"></div>
                        </div>
                        </div>
                    </nav>
                </div>        
            `
    
            this.ordersBtn = document.querySelector('.order-btn');
            this.ordersBtn.addEventListener('click', cbOrdersOpen);
        }

        this.renderOrders = () => {
            const ordersBody = document.querySelector('.orders-body');
            const orders = JSON.parse(localStorage.getItem('orders'));

            if(orders) {
                ordersBody.innerHTML = orders.map(order => this.renderOrder(order)).join('');
            }else {
                ordersBody.innerHTML = 'Your order history is empty.'
            }
            
        }

        this.renderOrder = order => {
            return `
                <div class="orders-item">
                    ${ order.map(orderItem => this.renderOrderItem(orderItem)).join('') }
                    <hr>
                </div>
            `
        }

        this.renderOrderItem = orderItem => {

            if (orderItem.hasOwnProperty('buyerName')) {
                return `
                    <p>
                        <strong>Order date:</strong> ${orderItem.date}
                    </p>
                    <p>
                        <strong>Total order sum:</strong> ${orderItem.totalSum} ₴
                    </p>
                `
            }

            return `
                <p>
                    &#10003; <strong>${orderItem.name}</strong> <br> ${orderItem.units} | Price per item: ${orderItem.price} ₴ | Quantity: ${orderItem.count} | Total sum: ${orderItem.sum} ₴
                </p>
            `
        }

    }

}