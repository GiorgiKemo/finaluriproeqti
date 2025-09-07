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
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
