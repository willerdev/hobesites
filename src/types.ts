export interface Product {
  id: string;
  userId: string;  // Add this line
  // Add other product properties here
  title: string;
  name?: string;  // Add this optional property
  price: number;
  description: string;
  createdAt: string | number;
  // ... other properties
  location: string;
  userName: string;
  userAvatar: string;  
  images: string[];
}


export interface ProductData {
  title: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  location: string;
  userId: string;     // Add this
  userName: string;   // Add this
}
