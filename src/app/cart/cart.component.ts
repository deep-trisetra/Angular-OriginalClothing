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

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      console.log("3")
      return;
    }

    console.log("4", product.id);
    this.deleteProduct(product.id);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts(`http://localhost:3000/cart`, { page, perPage })
      .subscribe({
        next: (data: Products) => {
          console.log(data)
          this.products = data.items;
          console.log(this.products);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    console.log("5")
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
