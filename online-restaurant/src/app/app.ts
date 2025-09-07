import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast';
import { CartService } from './cart/cart.service';
import { Observable } from 'rxjs';
import { Api } from './api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  title = 'Savory Bites';
  isScrolled = false;
  cartItemCount$: Observable<number> | undefined;

  constructor(private cartService: CartService, private api: Api) {}

  ngOnInit() {
    this.cartItemCount$ = this.cartService.cartItemCount$;
    this.clearPhantomItems();
  }

  clearPhantomItems() {
    this.api.getBasket().subscribe(basketItems => {
      const phantomItem = basketItems.find(item => item.product.name === 'Laab kai chicken salad');
      if (phantomItem) {
        const phantomItemId = phantomItem.id;
        for (let i = 0; i < 10; i++) {
          this.api.deleteProduct(phantomItemId).subscribe({
            next: () => {},
            error: () => {}
          });
        }
        setTimeout(() => {
          this.cartService.loadCart();
        }, 2000);
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
