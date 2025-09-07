import { Component, OnInit } from '@angular/core';
import { Api } from '../api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private api: Api, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  updateQuantity(item: any): void {
    this.api.updateBasket(item).subscribe(() => {
      this.calculateTotal();
    });
  }

  deleteItem(item: any): void {
    this.cartService.deleteItem(item.productId);
    this.api.deleteProduct(item.productId).subscribe({
      next: () => {
        console.log('Item deleted successfully from backend.');
      },
      error: (err: any) => {
        console.error('Error deleting item from backend:', err);
      }
    });
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
