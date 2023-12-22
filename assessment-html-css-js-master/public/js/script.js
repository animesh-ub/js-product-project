var data = [];
fetchProducts();
var forLater=[];
 
async function fetchProducts() {
  const response = await fetch("http://localhost:3000/products");
  data = await response.json();
  for (let i = 0; i < data.length; i++) {
    document.getElementById("products").innerHTML += `
    <div class="productCard" style="width:400px">
       <div class="productBody">
         <h4 class="product-title">Product Title : ${data[i].title}</h4>
         <p class="card-text">Description : : ${data[i].description}.</p>
         <h4 class="price">Product Title : ${data[i].price}</h4>
         <h4 class="rating">Product Title : ${data[i].rating}</h4>
         <h4 class="stock">Stock : ${data[i].stock}</h4>
         <h4 class="category">Category : ${data[i].category}</h4>
         <img id="img1" class="card-img-top" src="${data[i].thumbnail}" alt="Card image">
         <a href="#" id="${data[i].id}" onclick="saveForLater(this.id)" class="btn btn-primary">For Later</a>
       </div>
     </div>
`;
  }
}
async function saveForLater(id) {
    debugger;
    // alert("hello")
    // // var item=data.find(item=> item.id===id);
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].id === id) {
    //     var item = data[i];
    //     console.log(item)
    //   }
    // }
    // console.log(item);
    // alert(item.movieCode);
    const responseprod = await fetch("http://localhost:3000/products/"+id)
    var item = await responseprod.json();
    if (forLater.find((temp) => temp.title === item.title) != null) {
        alert("Product already exists");
      }
      else{
   
      const response = await fetch("http://localhost:3000/saveforLater", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          rating: item.rating,
          thumbnail: item.thumbnail,
          description: item.description,
          price: item.price,
          stock: item.stock,
          category: item.category
        }),
      });
      fetchFavourites();
    }
}
 
  async function fetchFavourites() {
    const response1 = await fetch("http://localhost:3000/saveforLater");
    forLater = await response1.json();
    for (let i = 0; i < forLater.length; i++) {
        document.getElementById("saveforlater").innerHTML +=
        `
             <div class="productCard" style="width:400px">
                <div class="productBody">
                  <h4 class="product-title">Product Title : ${forLater[i].title}</h4>
                  <p class="card-text">Description : : ${forLater[i].description}.</p>
                  <h4 class="price">Product Title : ${forLater[i].price}</h4>
                  <h4 class="rating">Product Title : ${forLater[i].rating}</h4>
                  <h4 class="stock">Stock : ${forLater[i].stock}</h4>
                  <h4 class="category">Category : ${forLater[i].category}</h4>
                  <img id="img1" class="card-img-top" src="${forLater[i].thumbnail}" alt="Card image">
                  <a href="#" id="${forLater[i].id}" onclick="deleteFromForLater(this.id)" class="btn btn-primary">Delete</a>
                </div>
            </div>
        `;
    }
  }
 
  fetchFavourites();