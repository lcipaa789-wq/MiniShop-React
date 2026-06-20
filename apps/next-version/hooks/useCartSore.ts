//global cart state management using Zustand
//replaces the need for Context API + Provider wraper
//can be used in any component without wrapping the app in a Provider
import { create } from "zustand";
//represents a single item inside the cart
//extends the product with a quantity field
interface CartItem {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number; //how many of this product the user has added
}
//defines all the state and actions available the cart store
interface CartStore {
  items: CartItem[]; //all items currently in the cart
  addItem: (product: Omit<CartItem, "quantity">) => void; //add or increment
  removeItem: (id: string) => void; //remove item completely from cart
  updateQuantity: (id: string, quantity: number) => void; // change quantity
  clearCart: () => void; //epmty entire cart
  totalItems: () => number; //total count (for navbar badge)
  totalPrice: () => number; //total price (for cart summary)
}
export const useCartStore = create<CartStore>((set, get) => ({
  //initial state - empty cart
  items: [],
  //add item to cart
  //if the product already exists in the cart , increment its quantity
  //if its new, add it with quantity: 1
  addItem: (product) =>
    set((state) => {
      const existin = state.items.find((item) => item.id === product.id);

      if (existin) {
        //product already in the cart - just increase quantity
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      // new product - add to cart with quantity 1
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }),
  //remove a product completely from the cart by its idd
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  //update the quantity of a specific item
  //if quantity reaches 0, remoce the item from cart entirely
  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.id !== id) };
      }
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      };
    }),
  //remove all items from the cart (used after order is placed)
  clearCart: () => set({ items: [] }),

  //returns the total number of indicidual items in the cart
  //used for the badge on the nacbar cart icon
  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  //returns the total price of all items in the cart
  //used in the cart drawer summary
  totalPrice: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
