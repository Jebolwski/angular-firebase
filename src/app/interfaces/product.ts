export interface Product {
  id: string;
  brand: string;
  category: string;
  name: string;
  price: number;
  description: string;
  photos: string[];
  createdAt: Date;
  count?: number;
}
