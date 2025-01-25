 My Cart App

A shopping cart application built with Next.js (App Router), TypeScript, Redux Toolkit, and Framer Motion. The app demonstrates modular design, state management, and responsive UI design.

Features

- Product Listing: Displays items fetched from an external API (`https://dummyjson.com/products`).
- Add to Cart: Users can add items to the cart with quantity control.
- Cart Management:
  - Update item quantities.
  - Remove items from the cart.
  - View cart summary (total price, total quantity).
- Cart Persistence: Cart state is saved in `localStorage` to persist across page reloads.
- Cart Sidebar: Slide-in cart sidebar with a responsive design.
- Global Notification System: Toast notifications for user actions (e.g., adding items to the cart).
- Reusable Components: Modular and reusable components for a scalable application.



 Tech Stack

- Framework: [Next.js 13 (App Router)](https://nextjs.org/)
- State Management: [Redux Toolkit](https://redux-toolkit.js.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- TypeScript: Strict type checking for robust development.
- Animations: [Framer Motion](https://www.framer.com/motion/)
- API: DummyJSON for product data.


 Project Structure

```
src/
├── app/
│   ├── api/                       API routes (if applicable)
│   ├── cart/                      Cart page
│   │   └── page.tsx               Cart management
│   ├── items/                     Product listing page
│   │   ├── page.tsx               Items page
│   │   ├── layout.tsx             Items page layout
│   │   └── globals.css            Global styles
├── components/                    Reusable components
│   ├── CartButton.tsx             Cart button with badge
│   ├── CartItem.tsx               Individual cart item
│   ├── CartSideBar.tsx            Slide-in cart sidebar
│   ├── CartSummary.tsx            Cart summary component
│   └── Navbar.tsx                 Navigation bar
├── notifications/                 Global notification system
│   └── NotificationContext.tsx    Notification context provider
├── store/                         Redux state management
│   ├── cartSlice.ts               Cart slice for Redux Toolkit
│   └── reducer.ts                 Combined reducers
├── types/                         Shared TypeScript interfaces
│   └── interfaces.ts              Centralized type definitions
```

 Setup Instructions

 Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
    or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
    or
   yarn dev
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000).



 Usage

 Items Page
- Navigate to `/items` to view the product list.
- Use the `+` and `-` buttons to adjust the quantity of an item.
- Click Add to Cart to add the item to your cart.

 Cart Page
- Navigate to `/cart` to view your cart.
- Update quantities using the `+` and `-` buttons.
- Remove items by clicking the delete button.
- View the total price and quantity in the summary.

 Cart Sidebar
- Click the cart icon in the navigation bar to open the cart sidebar.
- View and manage cart items directly from the sidebar.



 To-Do

- [ ] Add user authentication for personalized cart management.
- [ ] Implement server-side API routes for product data.
- [ ] Add unit and integration tests.
- [ ] Enhance accessibility (ARIA attributes).


Contributing

Feel free to fork the repository and submit pull requests for any improvements or bug fixes. Contributions are always welcome!


 License

This project is licensed under the MIT License.

