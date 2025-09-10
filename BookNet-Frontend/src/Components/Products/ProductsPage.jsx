// src/Pages/ProductsPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Alert, Box, Typography, Button, CircularProgress } from "@mui/material";
import API from "../../API/api";
import ProductItem from "./ProductItem";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchProducts = useCallback(async () => {
        // Condition to prevent fetching if already loading for "Load More" scenario
        // On initial load (page === 1), we always want to set loading and fetch
        if (loading && page > 1) { // This `loading` refers to the state from the closure, before current fetch might change it
            console.log("Already loading, skipping fetch for page", page);
            return;
        }

        // Condition to prevent fetching if no more pages are available
        if (!hasMore && page > 1) {
            console.log("No more products, stopping fetch for page", page);
            setLoading(false); // Ensure loading is off if we're done
            return;
        }

        console.log("Fetching products for page:", page);
        setLoading(true); // Always set loading to true when starting a fetch
        setError(null);

        try {
            const res = await API.get(`/products?page=${page}&limit=12`);
            
            const transformedProducts = res.data.data.map(product => {
                const primaryImage = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || 'https://via.placeholder.com/280x280?text=No+Image';
                const parsedPrice = parseFloat(product.price);
                const parsedSalePrice = product.salePrice ? parseFloat(product.salePrice) : null;

                let discountPercentage = 0;
                if (parsedSalePrice !== null && parsedSalePrice < parsedPrice) {
                    discountPercentage = Math.round(((parsedPrice - parsedSalePrice) / parsedPrice) * 100);
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
                    Discount: discountPercentage
                };
            });

            const totalPages = res.data.pagination.totalPages;

            setProducts(prevProducts => [...prevProducts, ...transformedProducts]);
            setHasMore(page < totalPages);
            
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products. Please try again later.");
            setHasMore(false); // If there's an error, assume no more pages for now
        } finally {
            setLoading(false); // Always stop loading after attempt
        }
    }, [page, hasMore]); // <-- REMOVED 'loading' from dependencies

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    // --- Loading and Error States for Initial Page Load ---
    if (loading && page === 1 && products.length === 0) { // Add products.length === 0 to ensure it only shows if no products yet
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error && page === 1 && products.length === 0) { // Add products.length === 0
        return (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Products</h1>

            {products.length === 0 && !loading && !error && (
                <Typography variant="h6" color="textSecondary" align="center">
                    No products found.
                </Typography>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

            {/* --- "Load More" Button and Inline Loading --- */}
            {loading && page > 1 && ( // Show inline loading indicator for "Load More" when new page is being fetched
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress size={30} />
                </Box>
            )}

            {!loading && hasMore && ( // Only show "Load More" if there are more products and not currently loading
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Button variant="contained" onClick={handleLoadMore} disabled={loading} size="large">
                        Load More Products
                    </Button>
                </Box>
            )}

            {!loading && !hasMore && products.length > 0 && ( // Message when all products are loaded
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 6 }}>
                    You've reached the end of the product list!
                </Typography>
            )}
        </div>
    );
};

export default ProductsPage;