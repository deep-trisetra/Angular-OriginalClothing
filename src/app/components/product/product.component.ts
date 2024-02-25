import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    PricePipe,
    TruncateNamePipe,
    InputNumberModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @ViewChild('deleteButton') deleteButton: any;
  @Input() value: number = 1;
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() add: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct() {
    this.edit.emit(this.product);
  }

  setQuantity(quantity: any) {
    console.log(quantity);

    this.product.quantity = quantity;
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      },
    });
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }

  addToCart() {
    this.add.emit(this.product);
  }
}
