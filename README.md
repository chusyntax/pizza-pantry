# 🍕 Pizza Pantry Inventory App

A modern inventory management app for pizza restaurants, built with Next.js, TypeScript, MongoDB, and Clerk authentication.

---

## 🏗️ Tech Choices & Architecture Overview

- **Framework:** Next.js 13+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** Clerk
- **Notifications:** react-toastify
- **UI:** Modular React components (ItemCard, EditItemModal, AdjustQuantityModal, AuditLogModal, AddItemForm)
- **API:** RESTful endpoints via Next.js API routes
- **State Management:** React hooks (useInventory)

### Folder Structure

```
├── src/
│   ├── app/           # Next.js pages & routing
│   ├── components/    # Modular React components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility libraries (e.g., mongoose)
│   ├── models/        # Mongoose models
│   └── public/        # Static assets
├── scripts/           # Seed script
├── .env.local         # Environment variables
```

---

## 🚀 Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/chusyntax/pizza-pantry.git
cd pizza-pantry/pizzapantry
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory. Example:

```ini
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y29tbXVuYWwtY2FyZGluYWwtMzIuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_uZqJA0NNxyb54pngpWXsMb22hMUslSTm7Eu2z8dE2M
MONGODB_URI=mongodb+srv://ttheko:P1zzaP%40ntry@pizzapantry.ynx0rz9.mongodb.net/?retryWrites=true&w=majority&appName=PizzaPantry
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

Note: For demo purposes, the environment variables have been given to you above

### 4. Seed the Database (Optional)

To populate your database with sample items:

```bash
npm run ts-node scripts/seed.ts
# or
npx ts-node scripts/seed.ts
```

---

## 🖥️ Running the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Authentication

- Uses Clerk for sign-in, sign-up, and session management.
- Configure Clerk keys in `.env.local`.

---

## 🧩 Key Features

- Inventory CRUD (add, edit, delete, adjust quantity)
- Audit log per item (with user attribution)
- Running total and value calculations
- Category filtering, search, sorting, pagination
- Toast notifications for all actions
- Responsive, modern UI with dark modals

---

## 📸 Screenshots

### Welcome Page

![Welcome Page](./public/screenshots/WelcomePage.png)

### Landing Page

![Landing Page](./public/screenshots/LandingPage.png)

### Sign In Page

![Sign In Page](./public/screenshots/SignInPage.png)

### Inventory Page

![Inventory Page](./public/screenshots/InventoryPage.png)

### Add Item Page

![Add Item Page](./public/screenshots/AddItemPage.png)

### Audit Log Modal

![Audit Log Modal](./public/screenshots/AuditLogModal.png)

---

## ⚠️ Known Limitations

- No image upload for items
- No mobile app (responsive web only)
- Audit log is per item, not global
- No granular permissions or activity analytics

---

## 🛠️ Next Steps / Improvements

- Item image upload & preview
- Export inventory to CSV/PDF
- Global audit log & analytics dashboard
- Mobile app (React Native or PWA)
- Automated low-stock notifications

---

## 📋 How to Use the App

1. **Sign Up / Sign In**

   - Visit the home page and create an account or sign in using Clerk authentication.

2. **View Inventory**

   - Click the "Go to Inventory" button to see all items in your inventory.
   - Use the search bar, category filter, and sorting options to find items quickly.

3. **Add a New Item**

   - Click the "Add Item" button or navigate to `/add-item`.
   - Fill out the item details and submit the form to add it to your inventory.

4. **Edit an Item**

   - In the inventory list, click the "Edit" button on any item card.
   - Update the item details in the modal and save changes.

5. **Adjust Quantity**

   - Click "Adjust Qty" on an item card to increase or decrease stock.
   - Enter the amount (+/-) and confirm to update quantity.

6. **Delete an Item**

   - Click "Delete" on an item card. Confirm the action in the alert to remove the item.

7. **View Audit Log**

   - Click "View Audit Log" on an item card to see a history of changes, including who made them.

8. **Sign Out**
   - Use the "Sign Out" button to securely log out of your account.

---

## Demo

To demo the app, use the following credentials to Log In:

Email: radioactivep2@gmail.com
Password: TestingDev@123.com

## 📚 Repository

[https://github.com/chusyntax/pizza-pantry](https://github.com/chusyntax/pizza-pantry)

---
