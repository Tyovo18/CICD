// Adapté à votre structure products.json
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface ArticlePanier {
  product: Product;
  quantity: number;
}

export interface Panier {
  id: string;
  articles: ArticlePanier[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}