const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id) {
    // fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      // if there is error, create a file
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // read cart
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id: id,
          quantity: 1,
        };
        cart.products = [...cart.products];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(
        p,
        JSON.stringify(cart, (err) => {
          console.log(err);
        })
      );
    });
  }
};
