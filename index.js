class item {
    constructor(name, category, source, price, discount, promo = false){
        this.name = name;
        this.category = category; 
        this.source = source;
        this.price = price;
        this.disc = discount;
        this.promo = promo;
    }
}

let allItems = [
    new item("Power drill", "tool", "power-drill.jpg", "300.1", "17", true),
    new item("Paint brush", "tool", "paint-brush.jpg", "50.6", "5"),
    new item("Wheelbarrow", "tool", "wheelbarrow.jpg", "120.99", "23", true),
    new item("Saw", "saw.jpg", "tool", "75.0$", "9%"),
    new item("steel rods", "steel", "rods.jpg", "10.0", "0"),
    new item("iron rods", "steel", "rust rods.jpg", "9.2", "3"),
    new item("steel bars", "steel", "square bars.jpg", "15.5", "0", true),
    new item("steal weave", "steel", "metal weave.jpg", "15.0", "0"),
    new item("texture-1", "wood", "wood1.jpg", "20", "9"), 
    new item("texture-2", "wood", "wood2.jpg", "23.0", "3"),
    new item("texture-3", "wood", "wood3.jpg", "22.0", "0", true),
    new item("texture-4", "wood", "wood4.jpg", "25.0", "0")
];

let index = 0;
allItems.forEach(product => {
    if (product.promo){
        let carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        carouselItem.value = index;
        carouselItem.innerHTML = `
            <img class="item-image" src="/${product.source}" width="50%" value="${index}"> 
            <p>${product.name}<br>
                <button type="button" class="btn btn-success shop" value="${index}">Add to Cart/ ${product.price}</button>
            </p>`
        document.getElementById("promo-carousel").append(carouselItem);
    }

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-item");
    modalContent.value = index;
    modalContent.innerHTML = `
        <p class="cancel-modal" value="${index}">X</p>
        <img src="/${product.source}" width="50%">
        <p>${product.name}<br>
            <button type="button" class="btn btn-success shop" value="${index}">Add to Cart/ ${product.price}</button>
        </p>
    `
    document.getElementById("modal-overlay").append(modalContent);

    let itemContainer = document.createElement("div");
    itemContainer.classList.add("col-4", "thumbnail");
    itemContainer.innerHTML = `
        <button class="btn item-image" value="${index}">
            <img src="/${product.source}" style="width: 100%" alt="${product.name}">
        </button>
        <p class="text-dark">${product.name}</p>`

    if (product.category === "tool"){document.getElementById("tool-gallery").append(itemContainer)}
    else if(product.category === "steel"){document.getElementById("steel-gallery").append(itemContainer)}
    else if(product.category === "wood"){document.getElementById("wood-gallery").append(itemContainer)}

    index ++;
})

let carouselItems = document.querySelectorAll(".carousel-item");
let switchIndex = 0;
carouselItems[switchIndex].style.display = "block";
switchCarousel = function() {
    switchIndex = (switchIndex+1) % (carouselItems.length);
    carouselItems[switchIndex].style.display = "block";
    if (switchIndex === 0){
        let temp = carouselItems.length - 1;
        carouselItems[temp].style.display = "none";
    }
    else{
        carouselItems[switchIndex-1].style.display = "none";
    }
};
setInterval(switchCarousel, 4500);

let modalItems = document.querySelectorAll(".modal-item");
let itemImages = document.querySelectorAll(".item-image");
itemImages.forEach(itemImage => {
    itemImage.addEventListener("click", function(){
        modalItems.forEach(modalItem => {
            if (parseInt(modalItem.value) === parseInt(itemImage.getAttribute("value"))){
                document.getElementById("modal-overlay").style.display = "block";
                modalItem.style.display = "block";
                document.getElementById("nav").classList.remove("sticky-top");
                document.body.style.overflow = "hidden";
            }
            else {modalItem.style.display = "none"}
        })
    })
})

document.querySelectorAll(".cancel-modal").forEach(cancel => {
    cancel.addEventListener("click", function(){
        modalItems[parseInt(cancel.getAttribute("value"))].style.display = "none";
        document.getElementById("modal-overlay").style.display = "none";
        document.getElementById("nav").classList.add("sticky-top");
        document.body.style.overflow = "scroll";
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

document.getElementById("search").addEventListener("click", function(){
    allItems.forEach(_item => {
        let searchValue = document.getElementById("search-input").value;
        if (_item.name.toLowerCase() === searchValue.toLowerCase()){
            let index = allItems.indexOf(_item);
            document.getElementById("modal-overlay").style.display = "block";
            modalItems[index].style.display = "block";
            document.getElementById("nav").classList.remove("sticky-top");
            document.body.style.overflow = "hidden";
        }
    })
})