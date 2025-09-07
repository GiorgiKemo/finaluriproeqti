export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  spiciness: number;
  nuts: boolean;
  vegetarian: boolean;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface BasketPostDto {
  productId: number;
  price: number;
  quantity: number;
}
