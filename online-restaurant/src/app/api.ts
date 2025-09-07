import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, Category, BasketPostDto } from './models';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private apiUrl = 'https://restaurant.stepprojects.ge/api';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Products/GetAll`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product[]>(`${this.apiUrl}/Products/GetFiltered`, { params: { id } }).pipe(
      map(products => products[0])
    );
  }

  getFilteredProducts(params: any): Observable<Product[]> {
    const vegetarianDishes = [
      "Tom yam vegetarian",
      "Tom kha vegetarian",
      "Green curry veggies",
      "Tofu cashew",
      "Red curry veggies",
      "Krapau tofu",
      "Mini vegetarian spring rolls"
    ];
    const nuttyDishes = [
      "Chicken cashew",
      "Tofu cashew",
      "Chicken satay",
      "Satay sauce"
    ];
    return this.http.get<Product[]>(`${this.apiUrl}/Products/GetFiltered`, { params }).pipe(
      map(products => products.map(p => ({
        ...p,
        vegetarian: vegetarianDishes.includes(p.name),
        nuts: nuttyDishes.includes(p.name)
      })))
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/Categories/GetAll`);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/Categories/GetCategory/${id}`);
  }

  addToBasket(product: BasketPostDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/Baskets/AddToBasket`, product);
  }

  getBasket(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Baskets/GetAll`);
  }

  updateBasket(product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Baskets/UpdateBasket`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Baskets/DeleteProduct/${id}`);
  }
}
