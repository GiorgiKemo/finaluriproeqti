import { Routes } from '@angular/router';
import { Dishes } from './dishes/dishes';
import { Cart } from './cart/cart';

export const routes: Routes = [
  { path: '', redirectTo: '/dishes', pathMatch: 'full' },
  { path: 'dishes', component: Dishes },
  { path: 'cart', component: Cart }
];
