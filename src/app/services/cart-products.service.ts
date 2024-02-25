import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  private cartCountSource = new BehaviorSubject<number>(0); // BehaviorSubject with initial value 0
  cartCount = this.cartCountSource.asObservable(); // Observable to subscribe to changes

  constructor() { }

  // Function to update home cart count
  updateHomeCartCount(count: number): void {
    this.cartCountSource.next(this.cartCountSource.value + count);
  }

  updateCartCount(count: number): void {
    this.cartCountSource.next(count);
  }

  emptyCartCount(): void{
    this.cartCountSource.next(0);
  }
}