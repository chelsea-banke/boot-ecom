class item {
    constructor(name, source, price, discount){
        this.name = name;
        this.source = source;
        this.price = price;
        this.disc = discount;
    }
}
let promo = [
    new item("Power drill", "power-drill.jpg", "300.1", "17"),
    new item("Paint brush", "paint-brush.jpg", "50.6", "5"),
    new item("Wheelbarrow", "wheelbarrow.jpg", "120.99", "23"),
    new item("Saw", "saw.jpg", "75.0$", "9%")
]
let steels = [
    new item("steel rods", "rods.jpg", "10.0", "0"),
    new item("iron rods", "rust rods.jpg", "9.2", "3"),
    new item("steel bars", "square bars.jpg", "15.5", "0"),
    new item("steal weave", "metal weave.jpg", "15.0", "0")
]
let woods = [
    new item("texture-1", "wood1.jpg", "20", "9"), 
    new item("texture-2", "wood2.jpg", "23.0", "3"),
    new item("texture-3", "wood3.jpg", "22.0", "0"),
    new item("texture-4", "wood4.jpg", "25.0", "0")
]
let allItems = promo.concat(steels, woods);
let index = 0;
promo.forEach(_item => {
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    carouselItem.value = index;
    carouselItem.innerHTML = `
        <img src="/${_item.source}" width="50%"> 
        <p>${_item.name}<br>
            <button type="button" class="btn btn-success shop" value="${index}">Add to Cart/ ${_item.price}</button>
        </p>`
    document.getElementById("carousel").append(carouselItem);

    let itemContainer = document.createElement("div");
    itemContainer.classList.add("col-4", "thumbnail");
    itemContainer.innerHTML = `
        <button class="btn item-image" value="${index}">
            <img src="/${_item.source}" style="width: 100%" alt="${_item.name}">
        </button>`
    document.getElementById("promo-gallery").append(itemContainer);

    index ++;
})

steels.forEach(steel => {
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    carouselItem.value = index;
    carouselItem.innerHTML = `
        <img src="/${steel.source}" width="50%"> 
        <p>${steel.name}<br>
            <button type="button" class="btn btn-success shop" value="${index}">Add to Cart/ ${steel.price}</button>
        </p>`
    document.getElementById("carousel").append(carouselItem);

    let itemContainer = document.createElement("div");
    itemContainer.classList.add("col-4", "thumbnail");
    itemContainer.innerHTML = `
        <button class="btn item-image" value="${index}">
            <img src="/${steel.source}" style="width: 100%" alt="${steel.name}">
        </button>`
    document.getElementById("steel-gallery").append(itemContainer);

    index ++;
})
woods.forEach(wood => {
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    carouselItem.value = index;
    carouselItem.innerHTML = `
        <img src="/${wood.source}" width="50%"> 
        <p>${wood.name}<br>
            <button type="button" class="btn btn-success shop" value="${index}">Add to Cart/ ${wood.price}</button>
        </p>`
    document.getElementById("carousel").append(carouselItem);

    let itemContainer = document.createElement("div");
    itemContainer.classList.add("col-4", "thumbnail");
    itemContainer.innerHTML = `
        <button class="btn item-image" value="${index}">
            <img src="/${wood.source}" style="width: 100%" alt="${wood.name}">
        </button>`
    document.getElementById("wood-gallery").append(itemContainer);

    index ++;
    
})

let carouselItems = document.querySelectorAll(".carousel-item");
carouselItems.forEach(carouselItem => {
    if (parseInt(carouselItem.value) === 0){
        carouselItem.style.display = "block";
    }
})

let itemImages = document.querySelectorAll(".item-image");
itemImages.forEach(itemImage => {
    itemImage.addEventListener("click", function(){
        carouselItems.forEach(carouselItem => {
            if (parseInt(carouselItem.value) === parseInt(itemImage.value)){
                carouselItem.style.display = "block";
                document.getElementById("banner").scrollIntoView({behavior: "smooth", block: "start"});
            }
            else {carouselItem.style.display = "none"}
        })
    })
})

function toogle(parameter){
    if(parameter){
        return false;
    }
    else{
        return true;
    }
}

let menuToogle = false;
document.getElementById("toogle-menu").addEventListener("click", function(){
    menuToogle = toogle(menuToogle);
    if (menuToogle){
        document.getElementById("toogle-items").style.display = "block";
    }
    else {
        document.getElementById("toogle-items").style.display = "none";      
    }
})

let cartToogle = false;
const cartMenu = document.getElementById("cart");
cartMenu.addEventListener('click', function(){
    cartToogle = toogle(cartToogle);
    if(cartToogle){document.getElementById("cart-items").style.display = "block";}
    else{document.getElementById("cart-items").style.display = "none";}
})

let cartDismiss = document.getElementById("cart-dismiss");
cartDismiss.addEventListener('click', function(){
    document.getElementById("cart-items").style.display = "none";
    cartToogle = false;
})

function displayCart(){
    shopedItems.forEach(shopedItem => {
        let shopedItemRow = document.createElement("tr");
        shopedItemRow.classList.add("shoped-item");
        shopedItemRow.innerHTML = `
            <td>${shopedItem.name}</td>
            <td>${shopedItem.price}$</td>
            <td><button class="btn btn-danger remove" value="${shopedItems.indexOf(shopedItem)}">remove</button></td>
        </tr>
        `
        total += parseFloat(shopedItem.price)
        document.getElementById("table-body").prepend(shopedItemRow);
    })
}

let shopedItems;
if(localStorage.getItem('cart') === null){
    shopedItems = [];
} else{
    shopedItems = JSON.parse(localStorage.getItem('cart'));
    displayCart();
}

let shopedItemIndex = 0;
let shop = document.querySelectorAll(".shop");
shop.forEach(shopedItem => {
    shopedItem.addEventListener("click", function(event){
        shopedItems.push(allItems[parseInt(event.target.value)]);

        document.getElementById("table-body").innerHTML="";
        total=0
        displayCart();
        document.getElementById("total").innerHTML = total.toFixed(2)+'$';
        localStorage.setItem('cart', JSON.stringify(shopedItems));
    })
})

document.getElementById("table-body").addEventListener('click', function(event){
    if (event.target.classList.contains("remove")){
        let removedItem = event.target;
        shopedItems.splice(parseInt(removedItem.value), 1);

        document.getElementById("table-body").innerHTML="";
        total=0
        displayCart();
        document.getElementById("total").innerHTML = total.toFixed(2)+'$';
        localStorage.setItem('cart', JSON.stringify(shopedItems));
    }
})

document.getElementById('purchase').addEventListener("click", function(){
    shopedItems = [];
    localStorage.setItem('cart', JSON.stringify(shopedItems));
    displayCart();
    window.alert("purchase complete");
})