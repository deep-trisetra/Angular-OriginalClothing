import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { Product, Products } from '../../../types';
import { ProductsService } from '../../services/products.service';
import { CartproductsComponent } from '../../components/cartproducts/cartproducts.component';
import { CartProductsService } from '../../services/cart-products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TieredMenuModule,
    CartproductsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('menu') menu!: TieredMenu;
  items: MenuItem[];
  showTieredMenu: boolean = false;
  isHover = false;
  totalQuantity: number = 0;
  cartProducts: Product[] = [];

  constructor(private productsService: ProductsService, private cartProductService : CartProductsService) {
    this.items = [
      { label: 'Home', routerLink: '/' },
      { label: 'About', routerLink: '/about-us' },
      { label: 'Cart', routerLink: '/cart' },
    ];
    this.isHover = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.showTieredMenu = window.innerWidth <= 576;
  }

  toggleMenu(event: Event) {
    this.menu.toggle(event);
  }

  fetchCartProducts(page: number, perPage: number) {
    this.productsService
      .getProducts(`http://localhost:3000/cart`, { page, perPage })
      .subscribe({
        next: (data: Products) => {
          console.log(data);
          this.cartProducts = data.items;
          // this.totalQuantity = data.items.reduce(
          //   (acc, curr) => acc + curr.quantity,
          //   0
          // );
          this.cartProductService.cartCount.subscribe(count => {
            this.totalQuantity = count;
          });
          console.log(this.cartProducts);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  showCart() {
    this.fetchCartProducts(0, 12);
    this.isHover = true;
  }

  ngOnInit() {
    this.fetchCartProducts(0, 12);
  }
}
