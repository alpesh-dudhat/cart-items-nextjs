
export interface CartItems {
    id: number;
    name: string;
    price: number;
    qty: number;
  }
  
  export interface CartSummaryProps {
    total: number;
    totalQty: number;
  }
  
  export interface CartSideBarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  }
  
  export interface CartItemProps {
    item: CartItems;
    onQuantityChange: (id: number, qty: number) => void;
    onRemove: (id: number) => void;
  }
  