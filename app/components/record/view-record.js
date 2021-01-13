export default class ViewRecord {
    cardsField = document.getElementById('cardsField');

    renderCardsField = arr => {
        this.cardsField.innerHTML = arr.map(item => this.renderCard(item)).join('');
    }
    
    renderCard = arr => {
        return `
            <div class="card col-xxl-3 col-xl-3 col-lg-4 col-md-5 col-sm-10 col-xs-10 text-center d-flex justify-content-between">
                <img src="${arr.img}" alt="pic" class="img-fluid">
                <div class="card-info flex-grow-1">
                    <h5 class="card-name">${arr.name}</h5>
                    <p class="card-description">Category: ${arr.category}</p>
                    <p class="card-price fw-bold">${arr.units} | Price: ${arr.price} ₴</p>
                </div> 
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#id${arr.id}">
                    Details
                </button>
                <button class="btn btn-success add-btn" data-id="${arr.id}">Add to card</button>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="id${arr.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${arr.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <img src="${arr.img}" alt="pic" class="img-fluid">
                            <p class="card-description">Category: ${arr.category}</p>
                            <p class="">Ingridients: ${arr.ingridients}</p>
                            <p class="">Manufacture: ${arr.manufacture}</p>
                            <p class="card-price fw-bold">${arr.units} | Price: ${arr.price} ₴</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success add-btn" data-id="${arr.id}">Add to card</button>
                    </div>
                    </div>
                </div>
            </div>
        `

    }

}