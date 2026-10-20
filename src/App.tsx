import { FavoritesProvider } from "./components/Favorites";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LoadingState } from "./components/PropertyCard";
import Home from "./pages/Home";
const Favorites = lazy(() => import("./pages/Favorites"));
const Catalog = lazy(() => import("./pages/Catalog"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
      <Suspense fallback={<LoadingState />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="imoveis" element={<Catalog />} />
            <Route path="imoveis/:slug" element={<PropertyDetails />} />
            <Route path="favoritos" element={<Favorites />} />
            <Route path="sobre" element={<Navigate to="/#sobre" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </FavoritesProvider>
    </BrowserRouter>
  );
}
