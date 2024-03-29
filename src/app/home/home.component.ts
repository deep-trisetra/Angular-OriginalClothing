import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Carousel, Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CartProductsService } from '../services/cart-products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
    CarouselModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService, private cartProductService: CartProductsService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];
  carousel: Carousel[]=[];

  totalRecords: number = 0;
  rows: number = 12;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }

    this.deleteProduct(product.id);
  }

  toggleAddToCartPopup(product: Product) {
    if (!product.id) {
      return;
    }

    this.addToCart(product, product.id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
    quantity: 0,
  };

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      //(product, this.selectedProduct.id ?? 0) same work
      return;
    }

    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopoup(false);
  }

  displayEditPopoup(val: boolean) {
    this.displayEditPopup = val;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts(`http://localhost:3000/clothes`, { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
          this.cartProductService.updateHomeCartCount(this.products.reduce(
            (acc, curr) => acc + curr.quantity,
            0
          ));
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productsService
      .addProduct(`http://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addToCart(product: Product, id: number) {
    this.productsService
      .addProduct(`http://localhost:3000/cart/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
          this.cartProductService.updateHomeCartCount(product.quantity);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
    // this.fetchCartProducts(0, 12);

    this.carousel = [
      {
        image: "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-07022024-NC-Z20-P4-TommyHilfiger-Hidesign-UPTO60.jpg"
      },
      {
        image:"https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-07022024-NC-Z20-P2-MAC-Clinique-FLAT20.jpg"
      },
      {
        image: "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-07022024-NC-Z20-P5-Guess-CalvinKlein-UPTO85.jpg"
      }
    ]
  }
}
