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
let steels = [
    new item("steel rods", "rods.jpg", "10.0$", "0%"),
    new item("iron rods", "rust rods.jpg", "9.2$", "3%"),
    new item("steel bars", "square bars.jpg", "15.5$", "0%"),
    new item("steal weave", "metal weave.jpg", "15.0$", "0%")
]
let woods = [
    new item("texture-1", "wood1.jpg", "20$", "9%"), 
    new item("texture-2", "wood2.jpg", "23.0$", "3%"),
    new item("texture-3", "wood3.jpg", "22.$", "0%"),
    new item("texture-4", "wood4.jpg", "25.0$", "0%")
]
let allItems = promo.concat(steels, woods);

let index = 0;
promo.forEach(_item => {
    let itemContainer = document.createElement("div");
    itemContainer.classList.add("col-md-3");
    itemContainer.innerHTML = `<div class="thumbnail">
    <img src="/${_item.source}" style="width: 100%" alt="${_item.name}">
    <div class="card">
        <div class="row card-footer">
            <h5 class="col-5 text-primary">${_item.name}</h5>
            <p class="col-7">${_item.price}/ <span class="text-success">${_item.disc} off</span></p>
            <button type="button" class="btn btn-success shop" value="${index}">shop item<button>
        </div>
    </div>
</div>`
document.getElementById("promo-section").append(itemContainer);
index ++;
})
steels.forEach(steel => {
    let itemContainer = document.createElement("div");
    itemContainer.classList.add("col-md-3");
    itemContainer.innerHTML = `
    <div class="thumbnail">
        <img src="/${steel.source}" alt="${steel.name}" style="width: 100%;">
        <div class="card">
            <div class="row card-footer">
                <h5 class="col-5 text-primary">${steel.name}</h5>
                <p class="col-7">${steel.price}/m<span class="text-success"> ${steel.disc} off</span></p>
                <button type="button" class="btn btn-success shop" value="${index}">shop item<button>
            </div>
        </div> 
    </div>
    `;
    document.getElementById("steel-section").append(itemContainer);
    index ++;
})
woods.forEach(wood => {
    let itemContainer = document.createElement("div");
    itemContainer.classList.add("col-md-3");
    itemContainer.innerHTML = `
    <div class="thumbnail">
        <img src="/${wood.source}" alt="${wood.name}" style="width: 100%;">
        <div class="card">
            <div class="row card-footer">
                <h5 class="col-5 text-primary">${wood.name}</h5>
                <p class="col-7">${wood.price}/m<sup>2</sup> <span class="text-success"> ${wood.disc} off</span></p>
                <button type="button" class="btn btn-success shop" value="${index}">shop item<button>
            </div>
        </div> 
    </div>
    `;
    document.getElementById("wood-section").append(itemContainer);
    index ++;
})

function toogle(parameter){
    if(parameter){
        return false;
    }
    else{
        return true;
    }
}


let cartToogle = false;
const cartMenu = document.getElementById("cart");
cartMenu.addEventListener('click', function(){
    cartToogle = toogle(cartToogle);
    if(cartToogle){document.getElementById("cart-items").style.display = "block";}
    else{document.getElementById("cart-items").style.display = "none";}
})

let shopedItems = [];
const shop = document.querySelectorAll(".shop");
    shop.forEach(shopedItem => {
        shopedItem.addEventListener("click", function(event){
            shopedItems.push(allItems[parseInt(event.target.value)]);
            console.log(shopedItems);

            shopedItems.forEach(shopedItem => {
                let shopedItemRow = document.createElement("tr");
                shopedItemRow.classList.add("shoped-item");
                shopedItemRow.innerHTML = `
                    <td>${shopedItem.name}</td>
                    <td>${shopedItem.price}</td>
                    <td><button class="btn btn-danger">remove</button></td>
                </tr>
                `
                document.getElementById("table-body").prepend(shopedItemRow);
            })
        })
})