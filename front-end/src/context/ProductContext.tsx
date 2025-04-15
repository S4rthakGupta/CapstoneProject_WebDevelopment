"use client";

import { createContext, useContext, useState } from "react";

// Define the Product type
type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  location?: string;
  category?: string;
  condition?: string;
  username?: string;
};

// Define the context type
type ProductContextType = {
  product: Product | null;
  setProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [product, setProduct] = useState<Product | null>(null);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
