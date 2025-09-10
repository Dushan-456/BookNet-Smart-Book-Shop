// AllProducts.jsx
import { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import ProductItem from "./ProductItem"; // adjust path as needed

// const allProducts = [
//    {
//       ProductID: 1,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/smartwatch-digital-device_53876-96804.jpg?w=740",
//       ProductTitle:
//          "Apple Watchddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
//       Price: 12500,
//       Discount: 12,
//       ratings: 1.5,
//       itemSold: 2500,
//    },
//    {
//       ProductID: 2,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/wireless-headphones-digital-device_53876-96810.jpg?w=740",
//       ProductTitle: "Wireless Headphones",
//       Price: 8900,
//       Discount: 20,
//       ratings: 2.2,
//       itemSold: 3100,
//    },
//    {
//       ProductID: 3,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/laptop-digital-device_53876-96802.jpg?w=740",
//       ProductTitle: "Dell Inspiron Laptop",
//       Price: 175000,
//       Discount: 10,
//       ratings: 4.7,
//       itemSold: 1200,
//    },
//    {
//       ProductID: 4,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/cosmetic-beauty-product-makeup_53876-96813.jpg?w=740",
//       ProductTitle: "Beauty Cream",
//       Price: 2250,
//       Discount: 18,
//       ratings: 5,
//       itemSold: 980,
//    },
//    {
//       ProductID: 5,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/modern-shoes_53876-96808.jpg?w=740",
//       ProductTitle: "Nike Running Shoes",
//       Price: 14500,
//       Discount: 25,
//       ratings: 2,
//       itemSold: 4500,
//    },
//    {
//       ProductID: 6,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/smartphone-digital-device_53876-96811.jpg?w=740",
//       ProductTitle: "Samsung Galaxy S22",
//       Price: 225000,
//       Discount: 15,
//       ratings: 4.4,
//       itemSold: 1800,
//    },
//    {
//       ProductID: 7,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/stylish-backpack_53876-96806.jpg?w=740",
//       ProductTitle: "Travel Backpack",
//       Price: 4200,
//       Discount: 30,
//       ratings: 4.3,
//       itemSold: 2100,
//    },
//    {
//       ProductID: 8,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/camera-digital-device_53876-96803.jpg?w=740",
//       ProductTitle: "Canon DSLR Camera",
//       Price: 225000,
//       Discount: 8,
//       ratings: 4.8,
//       itemSold: 950,
//    },
//    {
//       ProductID: 9,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/gaming-mouse-digital-device_53876-96807.jpg?w=740",
//       ProductTitle: "Gaming Mouse",
//       Price: 3900,
//       Discount: 22,
//       ratings: 4.4,
//       itemSold: 4000,
//    },
//    {
//       ProductID: 10,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/bluetooth-speaker-digital-device_53876-96809.jpg?w=740",
//       ProductTitle: "Bluetooth Speaker",
//       Price: 6900,
//       Discount: 17,
//       ratings: 4.5,
//       itemSold: 3000,
//    },
//    {
//       ProductID: 1,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/smartwatch-digital-device_53876-96804.jpg?w=740",
//       ProductTitle:
//          "Apple Watchddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
//       Price: 12500,
//       Discount: 12,
//       ratings: 1.5,
//       itemSold: 2500,
//    },
//    {
//       ProductID: 2,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/wireless-headphones-digital-device_53876-96810.jpg?w=740",
//       ProductTitle: "Wireless Headphones",
//       Price: 8900,
//       Discount: 20,
//       ratings: 2.2,
//       itemSold: 3100,
//    },
//    {
//       ProductID: 3,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/laptop-digital-device_53876-96802.jpg?w=740",
//       ProductTitle: "Dell Inspiron Laptop",
//       Price: 175000,
//       Discount: 10,
//       ratings: 4.7,
//       itemSold: 1200,
//    },
//    {
//       ProductID: 4,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/cosmetic-beauty-product-makeup_53876-96813.jpg?w=740",
//       ProductTitle: "Beauty Cream",
//       Price: 2250,
//       Discount: 18,
//       ratings: 5,
//       itemSold: 980,
//    },
//    {
//       ProductID: 5,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/modern-shoes_53876-96808.jpg?w=740",
//       ProductTitle: "Nike Running Shoes",
//       Price: 14500,
//       Discount: 25,
//       ratings: 2,
//       itemSold: 4500,
//    },
//    {
//       ProductID: 6,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/smartphone-digital-device_53876-96811.jpg?w=740",
//       ProductTitle: "Samsung Galaxy S22",
//       Price: 225000,
//       Discount: 15,
//       ratings: 4.4,
//       itemSold: 1800,
//    },
//    {
//       ProductID: 7,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/stylish-backpack_53876-96806.jpg?w=740",
//       ProductTitle: "Travel Backpack",
//       Price: 4200,
//       Discount: 30,
//       ratings: 4.3,
//       itemSold: 2100,
//    },
//    {
//       ProductID: 8,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/camera-digital-device_53876-96803.jpg?w=740",
//       ProductTitle: "Canon DSLR Camera",
//       Price: 225000,
//       Discount: 8,
//       ratings: 4.8,
//       itemSold: 950,
//    },
//    {
//       ProductID: 9,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/gaming-mouse-digital-device_53876-96807.jpg?w=740",
//       ProductTitle: "Gaming Mouse",
//       Price: 3900,
//       Discount: 22,
//       ratings: 4.4,
//       itemSold: 4000,
//    },
//    {
//       ProductID: 10,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/bluetooth-speaker-digital-device_53876-96809.jpg?w=740",
//       ProductTitle: "Bluetooth Speaker",
//       Price: 6900,
//       Discount: 17,
//       ratings: 4.5,
//       itemSold: 3000,
//    },
//    {
//       ProductID: 1,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/smartwatch-digital-device_53876-96804.jpg?w=740",
//       ProductTitle:
//          "Apple Watchddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
//       Price: 12500,
//       Discount: 12,
//       ratings: 1.5,
//       itemSold: 2500,
//    },
//    {
//       ProductID: 2,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/wireless-headphones-digital-device_53876-96810.jpg?w=740",
//       ProductTitle: "Wireless Headphones",
//       Price: 8900,
//       Discount: 20,
//       ratings: 2.2,
//       itemSold: 3100,
//    },
//    {
//       ProductID: 3,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/laptop-digital-device_53876-96802.jpg?w=740",
//       ProductTitle: "Dell Inspiron Laptop",
//       Price: 175000,
//       Discount: 10,
//       ratings: 4.7,
//       itemSold: 1200,
//    },
//    {
//       ProductID: 4,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/cosmetic-beauty-product-makeup_53876-96813.jpg?w=740",
//       ProductTitle: "Beauty Cream",
//       Price: 2250,
//       Discount: 18,
//       ratings: 5,
//       itemSold: 980,
//    },
//    {
//       ProductID: 5,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/modern-shoes_53876-96808.jpg?w=740",
//       ProductTitle: "Nike Running Shoes",
//       Price: 14500,
//       Discount: 25,
//       ratings: 2,
//       itemSold: 4500,
//    },
//    {
//       ProductID: 6,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/smartphone-digital-device_53876-96811.jpg?w=740",
//       ProductTitle: "Samsung Galaxy S22",
//       Price: 225000,
//       Discount: 15,
//       ratings: 4.4,
//       itemSold: 1800,
//    },
//    {
//       ProductID: 7,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/stylish-backpack_53876-96806.jpg?w=740",
//       ProductTitle: "Travel Backpack",
//       Price: 4200,
//       Discount: 30,
//       ratings: 4.3,
//       itemSold: 2100,
//    },
//    {
//       ProductID: 8,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/camera-digital-device_53876-96803.jpg?w=740",
//       ProductTitle: "Canon DSLR Camera",
//       Price: 225000,
//       Discount: 8,
//       ratings: 4.8,
//       itemSold: 950,
//    },
//    {
//       ProductID: 9,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/gaming-mouse-digital-device_53876-96807.jpg?w=740",
//       ProductTitle: "Gaming Mouse",
//       Price: 3900,
//       Discount: 22,
//       ratings: 4.4,
//       itemSold: 4000,
//    },
//    {
//       ProductID: 10,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/bluetooth-speaker-digital-device_53876-96809.jpg?w=740",
//       ProductTitle: "Bluetooth Speaker",
//       Price: 6900,
//       Discount: 17,
//       ratings: 4.5,
//       itemSold: 3000,
//    },
//    {
//       ProductID: 1,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/smartwatch-digital-device_53876-96804.jpg?w=740",
//       ProductTitle:
//          "Apple Watchddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
//       Price: 12500,
//       Discount: 12,
//       ratings: 1.5,
//       itemSold: 2500,
//    },
//    {
//       ProductID: 2,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/wireless-headphones-digital-device_53876-96810.jpg?w=740",
//       ProductTitle: "Wireless Headphones",
//       Price: 8900,
//       Discount: 20,
//       ratings: 2.2,
//       itemSold: 3100,
//    },
//    {
//       ProductID: 3,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/laptop-digital-device_53876-96802.jpg?w=740",
//       ProductTitle: "Dell Inspiron Laptop",
//       Price: 175000,
//       Discount: 10,
//       ratings: 4.7,
//       itemSold: 1200,
//    },
//    {
//       ProductID: 4,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/cosmetic-beauty-product-makeup_53876-96813.jpg?w=740",
//       ProductTitle: "Beauty Cream",
//       Price: 2250,
//       Discount: 18,
//       ratings: 5,
//       itemSold: 980,
//    },
//    {
//       ProductID: 5,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/modern-shoes_53876-96808.jpg?w=740",
//       ProductTitle: "Nike Running Shoes",
//       Price: 14500,
//       Discount: 25,
//       ratings: 2,
//       itemSold: 4500,
//    },
//    {
//       ProductID: 6,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/smartphone-digital-device_53876-96811.jpg?w=740",
//       ProductTitle: "Samsung Galaxy S22",
//       Price: 225000,
//       Discount: 15,
//       ratings: 4.4,
//       itemSold: 1800,
//    },
//    {
//       ProductID: 7,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/stylish-backpack_53876-96806.jpg?w=740",
//       ProductTitle: "Travel Backpack",
//       Price: 4200,
//       Discount: 30,
//       ratings: 4.3,
//       itemSold: 2100,
//    },
//    {
//       ProductID: 8,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/camera-digital-device_53876-96803.jpg?w=740",
//       ProductTitle: "Canon DSLR Camera",
//       Price: 225000,
//       Discount: 8,
//       ratings: 4.8,
//       itemSold: 950,
//    },
//    {
//       ProductID: 9,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/gaming-mouse-digital-device_53876-96807.jpg?w=740",
//       ProductTitle: "Gaming Mouse",
//       Price: 3900,
//       Discount: 22,
//       ratings: 4.4,
//       itemSold: 4000,
//    },
//    {
//       ProductID: 10,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/bluetooth-speaker-digital-device_53876-96809.jpg?w=740",
//       ProductTitle: "Bluetooth Speaker",
//       Price: 6900,
//       Discount: 17,
//       ratings: 4.5,
//       itemSold: 3000,
//    },
//    {
//       ProductID: 1,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/smartwatch-digital-device_53876-96804.jpg?w=740",
//       ProductTitle:
//          "Apple Watchddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
//       Price: 12500,
//       Discount: 12,
//       ratings: 1.5,
//       itemSold: 2500,
//    },
//    {
//       ProductID: 2,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/wireless-headphones-digital-device_53876-96810.jpg?w=740",
//       ProductTitle: "Wireless Headphones",
//       Price: 8900,
//       Discount: 20,
//       ratings: 2.2,
//       itemSold: 3100,
//    },
//    {
//       ProductID: 3,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/laptop-digital-device_53876-96802.jpg?w=740",
//       ProductTitle: "Dell Inspiron Laptop",
//       Price: 175000,
//       Discount: 10,
//       ratings: 4.7,
//       itemSold: 1200,
//    },
//    {
//       ProductID: 4,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/cosmetic-beauty-product-makeup_53876-96813.jpg?w=740",
//       ProductTitle: "Beauty Cream",
//       Price: 2250,
//       Discount: 18,
//       ratings: 5,
//       itemSold: 980,
//    },
//    {
//       ProductID: 5,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/modern-shoes_53876-96808.jpg?w=740",
//       ProductTitle: "Nike Running Shoes",
//       Price: 14500,
//       Discount: 25,
//       ratings: 2,
//       itemSold: 4500,
//    },
//    {
//       ProductID: 6,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/smartphone-digital-device_53876-96811.jpg?w=740",
//       ProductTitle: "Samsung Galaxy S22",
//       Price: 225000,
//       Discount: 15,
//       ratings: 4.4,
//       itemSold: 1800,
//    },
//    {
//       ProductID: 7,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/stylish-backpack_53876-96806.jpg?w=740",
//       ProductTitle: "Travel Backpack",
//       Price: 4200,
//       Discount: 30,
//       ratings: 4.3,
//       itemSold: 2100,
//    },
//    {
//       ProductID: 8,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/camera-digital-device_53876-96803.jpg?w=740",
//       ProductTitle: "Canon DSLR Camera",
//       Price: 225000,
//       Discount: 8,
//       ratings: 4.8,
//       itemSold: 950,
//    },
//    {
//       ProductID: 9,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/gaming-mouse-digital-device_53876-96807.jpg?w=740",
//       ProductTitle: "Gaming Mouse",
//       Price: 3900,
//       Discount: 22,
//       ratings: 4.4,
//       itemSold: 4000,
//    },
//    {
//       ProductID: 10,
//       ProductImgURL:
//          "https://img.freepik.com/free-photo/bluetooth-speaker-digital-device_53876-96809.jpg?w=740",
//       ProductTitle: "Bluetooth Speaker",
//       Price: 6900,
//       Discount: 17,
//       ratings: 4.5,
//       itemSold: 3000,
//    },
// ];

const allProducts = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/seed/great-gatsby/400/300",
    title: "The Great Gatsby - Classic Novel by F. Scott Fitzgerald",
    price: 2500,
    salePrice: 2000,
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/seed/math-textbook/400/300",
    title: "Mathematics for Grade 10 - School Textbook",
    price: 3500,
    salePrice: 3200,
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/seed/hardcover-notebook/400/300",
    title: "Premium Hardcover Notebook - 200 Pages",
    price: 1200,
    salePrice: 999,
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/seed/harry-potter/400/300",
    title: "Harry Potter and the Philosopher's Stone",
    price: 2800,
    salePrice: 2500,
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/seed/ballpoint-pens/400/300",
    title: "Pack of 10 Blue Ink Ballpoint Pens",
    price: 500,
    salePrice: null,
  },
  {
    id: 6,
    imageUrl: "https://picsum.photos/seed/geometry-box/400/300",
    title: "Mathematical Instruments Geometry Box",
    price: 1500,
    salePrice: 1300,
  },
  {
    id: 7,
    imageUrl: "https://picsum.photos/seed/magazine/400/300",
    title: "National Geographic Magazine - Monthly Edition",
    price: 800,
    salePrice: null,
  },
  {
    id: 8,
    imageUrl: "https://picsum.photos/seed/oxford-dictionary/400/300",
    title: "Oxford English Dictionary - Compact Edition",
    price: 6000,
    salePrice: 5500,
  },
  {
    id: 9,
    imageUrl: "https://picsum.photos/seed/marvel-comic/400/300",
    title: "Marvel Avengers Comic Book - Collector’s Edition",
    price: 1800,
    salePrice: 1500,
  },
  {
    id: 10,
    imageUrl: "https://picsum.photos/seed/colored-paper/400/300",
    title: "A4 Size Colored Papers - Pack of 100 Sheets",
    price: 900,
    salePrice: null,
  },
  {
    id: 11,
    imageUrl: "https://picsum.photos/seed/science-guide/400/300",
    title: "Science Revision Guide for O/L Students",
    price: 2200,
    salePrice: 2000,
  },
  {
    id: 12,
    imageUrl: "https://picsum.photos/seed/color-pencils/400/300",
    title: "Faber-Castell Color Pencils - 24 Pack",
    price: 3500,
    salePrice: 3200,
  },
  {
    id: 13,
    imageUrl: "https://picsum.photos/seed/pride-prejudice/400/300",
    title: "Pride and Prejudice by Jane Austen",
    price: 2700,
    salePrice: 2300,
  },
  {
    id: 14,
    imageUrl: "https://picsum.photos/seed/sticky-notes/400/300",
    title: "Sticky Notes Set - 5 Colors (100 Sheets Each)",
    price: 700,
    salePrice: null,
  },
  {
    id: 15,
    imageUrl: "https://picsum.photos/seed/past-papers/400/300",
    title: "Past Paper Collection - Advanced Level Physics",
    price: 4000,
    salePrice: 3500,
  },
  {
    id: 16,
    imageUrl: "https://picsum.photos/seed/childrens-book/400/300",
    title: "Children’s Picture Book - Illustrated Stories",
    price: 1600,
    salePrice: 1400,
  },
  {
    id: 17,
    imageUrl: "https://picsum.photos/seed/book-light/400/300",
    title: "LED Clip-On Book Light - Rechargeable",
    price: 900,
    salePrice: 799,
  },
  {
    id: 18,
    imageUrl: "https://picsum.photos/seed/reading-pillow/400/300",
    title: "Comfort Reading Pillow with Armrest",
    price: 4500,
    salePrice: 3999,
  },
  {
    id: 19,
    imageUrl: "https://picsum.photos/seed/bookmarks/400/300",
    title: "Leather Bookmark Set (5 pcs)",
    price: 600,
    salePrice: null,
  },
  {
    id: 20,
    imageUrl: "https://picsum.photos/seed/bookends/400/300",
    title: "Heavy Metal Bookends - Pair",
    price: 1800,
    salePrice: 1600,
  },
];

const AllProducts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProducts = allProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {paginatedProducts.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
            salePrice={product.salePrice}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <TablePagination
          rowsPerPageOptions={[20, 25, 30, 35, 40]}
          component="div"
          count={allProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default AllProducts;
