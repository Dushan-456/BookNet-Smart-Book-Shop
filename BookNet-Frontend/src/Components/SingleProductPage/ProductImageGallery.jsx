import { Alert, Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';

// Replaced mock images with stable links for various product types
const mockImages =  [
        {
            "url": "https://picsum.photos/seed/STAT001-1/600/400",
            "isPrimary": true
        },
        {
            "url": "https://picsum.photos/seed/STAT001-2/400/300",
            "isPrimary": false
        }
    ]

const ProductImageGallery = ({ images = mockImages }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(true); // New state to track if the main image is loading
    const [imageError, setImageError] = useState(false); // New state to track if the main image failed

    // Set the initial selected image when the component mounts or when images change
    useEffect(() => {
        if (images && images.length > 0) {
            const primaryImage = images.find(img => img.isPrimary) || images[0];
            setSelectedImage(primaryImage);
            setImageLoading(true); // Reset loading state for new image
            setImageError(false); // Reset error state for new image
        }
    }, [images]);

    // Handle initial selected image loading state
    useEffect(() => {
        if (selectedImage) {
            setImageLoading(true);
            setImageError(false);
        }
    }, [selectedImage]);

    // Fallback for when there are no images at all
    if (!images || images.length === 0) {
        return (
            <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                
                <Alert severity="error">No Images Available</Alert>
            </div>
        );
    }

    // Fallback if no selected image yet (e.g., images prop is set but selectedImage is still null)
    if (!selectedImage) {
        return (
            <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                <span>Loading Gallery...</span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Main Image Display */}
            <div className="relative w-full aspect-square mb-4 border rounded-lg overflow-hidden shadow-sm flex items-center justify-center bg-gray-100">
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <Skeleton/>
                    </div>
                )}
                {imageError && !imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-100 z-10">
                        <Alert severity="error">Failed to load image</Alert>
                    </div>
                )}
                <img
                    key={selectedImage.url} // Use key to force re-render on change
                    src={selectedImage.url}
                    alt={selectedImage.altText || 'Product Image'}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading || imageError ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => { setImageLoading(false); setImageError(true); }}
                />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`relative aspect-square border-2 rounded-md overflow-hidden cursor-pointer transition-all duration-200 
                            ${selectedImage.url === image.url ? 'border-blue-500' : 'border-transparent'}
                            ${image.url === 'invalid-url' ? 'opacity-50 cursor-not-allowed' : ''} {/* Example: visually disable bad thumbnails */}
                        `}
                        onClick={() => {
                            if (image.url !== 'invalid-url') { // Prevent selecting invalid thumbnails
                                setSelectedImage(image);
                                setImageLoading(true); // Start loading for the new main image
                                setImageError(false); // Reset error state
                            }
                        }}
                    >
                        <img
                            src={image.url}
                            alt={image.altText || `Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            // No loading/error state for thumbnails, just display or show broken icon
                            // You could add a small placeholder here if preferred
                        />
                         {/* Overlay to show which thumbnail is not selected */}
                        <div className={`absolute inset-0 bg-white transition-opacity duration-200 ${
                            selectedImage.url === image.url ? 'opacity-0' : 'opacity-40 hover:opacity-10'
                        }`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImageGallery;