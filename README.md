Your `README.md` file was incomplete and had formatting issues. Here is a complete, well-formatted version with all Markdown blocks and setup instructions.

```markdown
# React Native Product Catalog

A clean-architecture React Native app to browse and filter products by category, using [dummyjson.com](https://dummyjson.com/) as the API source.

## Features

- Product listing with images, price, and rating
- Filter products by category using a modal
- Clean architecture: UI decoupled from API via repository and mappers
- Error and loading state handling
- State management with Zustand
- Data fetching with React Query

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npx expo start
   ```

4. **Run on your device or emulator:** 
    - Use the Expo Go app (iOS/Android) or an emulator.

## Project Structure

- `app/index.tsx`: Main screen, UI only, uses custom hook for data.
- `app/hooks/useProductFilters.ts`: Encapsulates all product/category fetching, sorting, and filter logic.
- `app/repositories/productRepository.ts`: Repository layer for API calls and mapping.
- `app/core/productMapper.ts`: Maps API data to app models.
- `app/services/api.ts`: API client using Axios.
- `store/store.ts`: Zustand store for filter state.
- `components/ProductCard.tsx`: Product card UI component.

## Code Explanation

- **UI Layer** (`app/index.tsx`): Renders product list and filter modal. All business logic is abstracted away.
- **Custom Hook** (`useProductFilters`): Handles fetching, sorting, and filter state.
- **Repository Layer**: Fetches data from the API and maps it to app models.
- **Mappers**: Convert API data to internal types for decoupling.
- **Error/Loading Handling**: Managed at each layer, with user feedback in the UI.

## Running the App

Make sure you have Node.js and npm installed. Start the app with:

```sh
npx expo start
```
