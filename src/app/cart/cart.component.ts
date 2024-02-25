import { Component } from '@angular/core';
import { Product, Products } from '../../types';
import { ProductsService } from '../services/products.service';

import { CommonModule } from '@angular/common';
import { CartproductsComponent } from '../components/cartproducts/cartproducts.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartproductsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private productsService: ProductsService) {}
  products: Product[] = [];
  totalAmount: number = 0;

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      console.log('3');
      return;
    }

    console.log('4', product.id);
    this.deleteProduct(product.id);
  }

  toggleAddToCartPopup(product: Product) {
    if (!product.id) {
      console.log('3');
      return;
    }

    this.addToCart(product, product.id);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts(`http://localhost:3000/cart`, { page, perPage })
      .subscribe({
        next: (data: Products) => {
          console.log(data);
          this.products = data.items;
          this.totalAmount = data.items.reduce(
            (acc, curr) => acc + curr.quantity * parseInt(curr.price),
            0
          );
          console.log(this.products);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addToCart(product: Product, id: number) {
    console.log(product, id);

    this.productsService
      .addProduct(`http://localhost:3000/updateCartItem/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, 12);
          // this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    console.log('5');
    this.productsService
      .deleteProduct(`http://localhost:3000/cart/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, 12);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.fetchProducts(0, 12);
  }
}
