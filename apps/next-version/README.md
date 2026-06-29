# MiniShop 🛍️

A full-stack e-commerce web application built with Next.js 15, featuring product browsing, cart management, Stripe payments, and an admin panel.

**Live Demo:** [mini-shop-flax.vercel.app](https://mini-shop-flax.vercel.app)

---

## Tech Stack

| Category      | Technology                 |
| ------------- | -------------------------- |
| Framework     | Next.js 16 (App Router)    |
| Language      | TypeScript                 |
| Styling       | Tailwind CSS + shadcn/ui   |
| Database      | Neon PostgreSQL + Prisma 6 |
| Auth          | Auth0 v4                   |
| Payments      | Stripe Elements            |
| State         | Zustand 5                  |
| Forms         | React Hook Form + Zod      |
| File Upload   | Uploadthing                |
| Carousel      | Embla Carousel             |
| Notifications | Sonner                     |
| Icons         | Lucide React               |
| Deployment    | Vercel                     |

---

## Features

### 🛒 Shopping

- Product grid with discount badges, ratings, and reviews
- Category filter (Electronics, Clothing, Home, Sports, Beauty)
- Autocomplete search with debounced API calls
- Product detail page
- Sliding cart drawer with quantity controls

### 💳 Checkout

- Stripe Elements payment form
- Order summary with item breakdown
- Success page after payment
- Full order history

### 🔐 Authentication

- Auth0 login (Google OAuth)
- Protected routes (orders, profile, checkout)
- Admin role via Auth0 custom claims

### 👤 User Pages

- Profile page with order stats
- Orders page with status timeline
- Catalogue with sorting (price, rating, reviews)
- Sales page (discounted products)
- Top Sales page (most popular)
- Help page with FAQ accordion + contact form

### ⚙️ Admin Panel

- Dashboard with revenue, orders, and product stats
- Full product CRUD (create, edit, delete)
- Image upload via Uploadthing
- Order management with inline status updates
- Protected by Auth0 admin role

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon recommended)
- Auth0 account
- Stripe account
- Uploadthing account

### Installation

```bash
# Clone the repository
git clone https://github.com/lcipaa789-wq/MiniShop-React.git
cd MiniShop-React/apps/next-version

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your keys (see Environment Variables section)

# Run database migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://...

# Auth0
AUTH0_SECRET=your-32-char-secret
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
APP_BASE_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Uploadthing
UPLOADTHING_TOKEN=your-token

# Admin
ADMIN_EMAIL=your-email@gmail.com
```

---

## Project Structure

```
app/
├── admin/              # Admin panel (protected)
│   ├── orders/         # Order management
│   └── products/       # Product CRUD
├── api/
│   ├── admin/          # Admin API routes
│   ├── orders/         # Orders API
│   ├── products/       # Products API
│   ├── stripe/         # Stripe PaymentIntent
│   └── uploadthing/    # File upload
├── catalogue/          # Product catalogue with filters
├── checkout/           # Stripe checkout + success page
├── help/               # FAQ + contact form
├── orders/             # User order history
├── products/[id]/      # Product detail page
├── profile/            # User profile + stats
├── sales/              # Discounted products
└── top-sales/          # Most popular products

components/
├── admin/              # Admin UI components
├── cart/               # CartDrawer, CartItem
├── checkout/           # CheckoutClient, PaymentForm
├── help/               # FAQAccordion, ContactForm
├── layout/             # Navbar, Footer, SideMenu, HeroBanner
└── products/           # ProductCard, ProductGrid, CategoryFilter

lib/
├── admin.ts            # isAdmin() helper
├── auth.ts             # Auth0 client
├── prisma.ts           # Prisma singleton
├── stripe.ts           # Stripe client
└── uploadthing.ts      # Uploadthing helpers

hooks/
└── useCartSore.ts      # Zustand cart store

prisma/
├── schema.prisma       # Database models
└── seed.ts             # Initial product data
```

---

## Database Schema

```prisma
model Product {
  id          String      @id @default(cuid())
  title       String
  description String
  image       String
  price       Float
  oldPrice    Float
  discount    Int
  rating      Float
  reviews     Int
  category    Category
  orderItems  OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Order {
  id        String      @id @default(cuid())
  userId    String
  status    OrderStatus @default(PENDING)
  total     Float
  items     OrderItem[]
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  title     String
  image     String
  price     Float
  quantity  Int
}
```

---

## Auth0 Setup

1. Create an Auth0 application (Regular Web Application)
2. Set callback URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-app.vercel.app/auth/callback`
3. Create an `admin` role and assign it to admin users
4. Create a Post Login Action to add roles to the token:

```js
exports.onExecutePostLogin = async (event, api) => {
  const namespace = "https://minishop.com";
  const roles = event.authorization?.roles ?? [];
  api.idToken.setCustomClaim(`${namespace}/roles`, roles);
  api.accessToken.setCustomClaim(`${namespace}/roles`, roles);
};
```

---

## Stripe Testing

Use these test card details:

| Field       | Value               |
| ----------- | ------------------- |
| Card Number | 4242 4242 4242 4242 |
| Expiry      | Any future date     |
| CVC         | Any 3 digits        |

---

## Deployment

This project is deployed on Vercel. To deploy your own:

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set Root Directory to `apps/next-version`
4. Add all environment variables
5. Deploy

---
