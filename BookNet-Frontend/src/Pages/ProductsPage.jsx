// src/Pages/ProductsPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Box,
  Typography,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid, // For
} from "@mui/material";
import ProductItem from "./ProductItem";
import API from "../../API/api";

const staticProductTypes = [
  { value: "", label: "All Types" },
  { value: "BOOK", label: "Books" },
  { value: "EBOOK", label: "E-Books" },
  { value: "STATIONERY", label: "Stationery" },
  { value: "PHYSICAL", label: "Physical Goods" }, // Ensure this matches your Prisma enum if applicable
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // --- State for Filters and Sorting ---
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState(""); // Uses staticProductTypes for now
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // --- New State for dynamic Categories ---
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  // --- Effect to fetch Categories once on component mount ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        setCategoriesError(null);
        const res = await API.get("/categories"); // This call will get your provided JSON response
        // Add "All Categories" option at the beginning
        // CORRECTED: res.data is the array directly, not res.data.data
        setCategories([{ id: "", name: "All Categories" }, ...res.data]);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategoriesError("Failed to load categories.");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this runs once on mount

  const fetchProducts = useCallback(async () => {
    if (loading && page > 1) {
      console.log("Already loading, skipping fetch for page", page);
      return;
    }

    if (!hasMore && page > 1) {
      console.log("No more products, stopping fetch for page", page);
      setLoading(false);
      return;
    }

    console.log("Fetching products for page:", page, "with filters:", {
      selectedCategory,
      selectedType,
      sortBy,
      sortOrder,
    });
    setLoading(true);
    setError(null);

    try {
      const res = await API.get(`/products?page=${page}&limit=24`);

      const transformedProducts = res.data.data.map((product) => {
        const primaryImage =
          product.images.find((img) => img.isPrimary)?.url ||
          product.images[0]?.url ||
          "https://via.placeholder.com/280x280?text=No+Image";
        const parsedPrice = parseFloat(product.price);
        const parsedSalePrice = product.salePrice
          ? parseFloat(product.salePrice)
          : null;

        let discountPercentage = 0;
        if (parsedSalePrice !== null && parsedSalePrice < parsedPrice) {
          discountPercentage = Math.round(
            ((parsedPrice - parsedSalePrice) / parsedPrice) * 100
          );
        }

        const defaultRatings = 0;
        const defaultItemSold = 0;

        return {
          id: product.id,
          title: product.title,
          imageUrl: primaryImage,
          price: parsedPrice,
          salePrice: parsedSalePrice,
          ratings: defaultRatings,
          itemSold: defaultItemSold,
          Discount: discountPercentage,
        };
      });

      const totalPages = res.data.pagination.totalPages;

      setProducts((prevProducts) => {
        // Create a Set of existing product IDs for efficient lookup
        const existingProductIds = new Set(prevProducts.map((p) => p.id));

        // Filter out any new products that already exist in prevProducts
        const uniqueNewProducts = transformedProducts.filter(
          (p) => !existingProductIds.has(p.id)
        );

        return [...prevProducts, ...uniqueNewProducts];
      });
      setHasMore(page < totalPages);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]); // Removed 'loading' from dependencies, as discussed

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && page === 1 && products.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error && page === 1 && products.length === 0) {
    return (
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h1>

      {products.length === 0 && !loading && !error && (
        <Typography variant="h6" color="textSecondary" align="center">
          No products found.
        </Typography>
      )}

      <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
            salePrice={product.salePrice}
            ratings={product.ratings}
            itemSold={product.itemSold}
            Discount={product.Discount}
          />
        ))}
      </div>

      {loading && page > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress size={30} />
        </Box>
      )}

      {!loading && hasMore && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            disabled={loading}
            size="large"
          >
            Load More Products
          </Button>
        </Box>
      )}

      {!loading && !hasMore && products.length > 0 && (
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 6 }}
        >
          You've reached the end of the product list!
        </Typography>
      )}
    </div>
  );
};

export default ProductsPage;
