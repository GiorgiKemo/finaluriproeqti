import { Component, OnInit } from '@angular/core';
import { Api } from '../api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, Category } from '../models';
import { ToastService } from '../toast/toast.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-dishes',
  imports: [CommonModule, FormsModule],
  templateUrl: './dishes.html',
  styleUrl: './dishes.css'
})
export class Dishes implements OnInit {
  categories: Category[] = [];
  filteredProducts: Product[] = [];

  selectedCategories: { [key: number]: boolean } = {};
  spiciness: number = 0;
  nuts: boolean = false;
  vegetarian: boolean = false;

  constructor(private api: Api, private toastService: ToastService, private cartService: CartService) { }

  ngOnInit(): void {
    this.filterProducts();
    this.api.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  filterByCategory(id: number): void {
    this.selectedCategories = { [id]: true };
    this.filterProducts();
  }

  resetFilters(): void {
    this.selectedCategories = {};
    this.spiciness = 0;
    this.nuts = false;
    this.vegetarian = false;
    this.filterProducts();
  }

  filterProducts(): void {
    let params: any = {};
    const selectedCategoryIds = Object.keys(this.selectedCategories).filter(key => this.selectedCategories[+key]).map(Number);
    if (selectedCategoryIds.length > 0) {
      params.categoryId = selectedCategoryIds[0];
    }
    if (this.spiciness > 0) {
      params.spiciness = this.spiciness;
    }
    this.api.getFilteredProducts(params).subscribe(data => {
      let products = data;
      if (this.nuts) {
        products = products.filter(p => !p.nuts);
      }
      if (this.vegetarian) {
        products = products.filter(p => p.vegetarian);
      }
      this.filteredProducts = products;
    });
  }

  isAllCategoriesSelected(): boolean {
    return Object.keys(this.selectedCategories).length === 0;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    const basketProduct = {
      productId: product.id,
      price: product.price,
      quantity: 1
    };
    this.api.addToBasket(basketProduct).subscribe(() => {
      this.toastService.showToast('Product added to cart!');
    });
  }
}
