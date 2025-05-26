# React Native Product Catalog

A clean-architecture React Native app to browse and filter products by category, using the [DummyJSON API](https://dummyjson.com/).

## ✨ Features

- Product listing with image, title, price, and rating
- Filter products by category (fetched dynamically from API)
- Sort products by price or rating
- Product detail view with brand, description, and stock info
- Decoupled architecture: UI, domain, and data layers separated
- State management with Zustand
- Data fetching and caching with React Query
- Error and loading states handled gracefully

## 🛠️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eshinkawa/products-app.git
   cd products-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run the app:**
Launch an emulator or simulator (iOS)
   ```bash
   npx expo run:ios
   ```

## 🗂️ Project Structure

```
app/
├── index.tsx                  # Main screen (UI only)
├── hooks/useProductFilters.ts # Handles filtering, sorting, and data fetching
├── repositories/              # API integration layer
│   └── productRepository.ts
├── core/productMapper.ts      # Transforms API response into domain models
├── services/api.ts            # Axios API client
components/
├── ProductCard.tsx            # UI component for individual product
store/
├── store.ts                   # Zustand store for filter state
```

## 📦 Architecture

- **UI Layer**: Renders screens and components. No business logic.
- **Custom Hooks**: Encapsulate data fetching, filtering, and sorting logic.
- **Repository Layer**: Responsible for API calls and data transformation.
- **Mappers**: Convert raw API data into clean, internal app models.
- **Store**: Global state for category filters using Zustand.
- **API**: Axios instance for handling API requests.
