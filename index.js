class item {
    constructor(name, source, price, discount){
        this.name = name;
        this.source = source;
        this.price = price;
        this.disc = discount;
    }
}

let promo = [
    new item("Power drill", "power-drill.jpg", "300.1$", "17%"),
    new item("Paint brush", "paint-brush.jpg", "50.6$", "5%"),
    new item("Wheelbarrow", "wheelbarrow.jpg", "120.99$", "23%"),
    new item("Saw", "saw.jpg", "75.0$", "9%")
]
promo.forEach(_item => {
    let itemContainer = document.createElement("div");
    itemContainer.classList.add("col-md-3");
    itemContainer.innerHTML = `<div class="thumbnail">
    <a href="">
        <img src="/${_item.source}" style="width: 100%" alt="${_item.name}">
        <div class="card">
            <div class="row card-footer">
                <h5 class="col-5">${_item.name}</h5>
                <p class="col-7">${_item.price}/ <span class="text-success">${_item.disc} off</span></p>
                <button type="button" class="btn btn-success">shop item<button>
            </div>
        </div>
    </a>
</div>`
document.getElementById("promo-section").append(itemContainer);
})