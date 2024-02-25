import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { PricePipe } from '../../pipes/price.pipe';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { HomeComponent } from '../../home/home.component';
import { CartProductsService } from '../../services/cart-products.service';

@Component({
  selector: 'app-cartproducts',
  standalone: true,
  imports: [
    RatingModule,
    TruncateNamePipe,
    PricePipe,
    FormsModule,
    ConfirmPopupModule,
    ButtonModule,
    InputNumberModule,
    HomeComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './cartproducts.component.html',
  styleUrl: './cartproducts.component.scss',
})
export class CartproductsComponent {
  constructor(private confirmationService: ConfirmationService, private cartProductService: CartProductsService) {}

  @ViewChild('removeFromCartButton') removeFromCartButton: any;

  @Input() product!: Product;
  @Input() value: number = this.product?.quantity;
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() update: EventEmitter<Product> = new EventEmitter<Product>();

  confirmCartRemove() {
    console.log('1');
    this.confirmationService.confirm({
      target: this.removeFromCartButton.nativeElement,
      message: 'Are you sure that you want to remove this product from cart?',
      accept: () => {
        this.removeProduct();
      },
    });
  }

  setQuantity(quantity: any) {
    // console.log(quantity);
    this.value = quantity;
  }

  addToCart(quantity: number) {
    this.update.emit({ ...this.product, quantity: quantity });
  }

  removeProduct() {
    console.log('2');
    this.cartProductService.updateHomeCartCount(this.product.quantity * -1);
    this.delete.emit(this.product);
  }

  ngOnInit() {
    this.setQuantity(this.product.quantity);
  }
}
