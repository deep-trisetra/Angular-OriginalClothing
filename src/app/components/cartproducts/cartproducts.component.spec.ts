import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartproductsComponent } from './cartproducts.component';

describe('CartproductsComponent', () => {
  let component: CartproductsComponent;
  let fixture: ComponentFixture<CartproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
