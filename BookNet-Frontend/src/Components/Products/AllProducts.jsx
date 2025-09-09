// AllProducts.jsx
import { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import ProductItem from "./ProductItem"; // adjust path as needed

const allProducts = [
   {
      ProductID: 1,
      ProductImgURL:
         "https://img.freepik.com/free-photo/smartwatch-digital-device_53876-96804.jpg?w=740",
      ProductTitle:
         "Apple Watchddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      Price: 12500,
      Discount: 12,
      ratings: 1.5,
      itemSold: 2500,
   },
   {
      ProductID: 2,
      ProductImgURL:
         "https://img.freepik.com/free-photo/wireless-headphones-digital-device_53876-96810.jpg?w=740",
      ProductTitle: "Wireless Headphones",
      Price: 8900,
      Discount: 20,
      ratings: 2.2,
      itemSold: 3100,
   },
   {
      ProductID: 3,
      ProductImgURL:
         "https://img.freepik.com/free-photo/laptop-digital-device_53876-96802.jpg?w=740",
      ProductTitle: "Dell Inspiron Laptop",
      Price: 175000,
      Discount: 10,
      ratings: 4.7,
      itemSold: 1200,
   },
   {
      ProductID: 4,
      ProductImgURL:
         "https://img.freepik.com/free-photo/cosmetic-beauty-product-makeup_53876-96813.jpg?w=740",
      ProductTitle: "Beauty Cream",
      Price: 2250,
      Discount: 18,
      ratings: 5,
      itemSold: 980,
   },
   {
      ProductID: 5,
      ProductImgURL:
         "https://img.freepik.com/free-photo/modern-shoes_53876-96808.jpg?w=740",
      ProductTitle: "Nike Running Shoes",
      Price: 14500,
      Discount: 25,
      ratings: 2,
      itemSold: 4500,
   },
   {
      ProductID: 6,
      ProductImgURL:
         "https://img.freepik.com/free-photo/smartphone-digital-device_53876-96811.jpg?w=740",
      ProductTitle: "Samsung Galaxy S22",
      Price: 225000,
      Discount: 15,
      ratings: 4.4,
      itemSold: 1800,
   },
   {
      ProductID: 7,
      ProductImgURL:
         "https://img.freepik.com/free-photo/stylish-backpack_53876-96806.jpg?w=740",
      ProductTitle: "Travel Backpack",
      Price: 4200,
      Discount: 30,
      ratings: 4.3,
      itemSold: 2100,
   },
   {
      ProductID: 8,
      ProductImgURL:
         "https://img.freepik.com/free-photo/camera-digital-device_53876-96803.jpg?w=740",
      ProductTitle: "Canon DSLR Camera",
      Price: 225000,
      Discount: 8,
      ratings: 4.8,
      itemSold: 950,
   },
   {
      ProductID: 9,
      ProductImgURL:
         "https://img.freepik.com/free-photo/gaming-mouse-digital-device_53876-96807.jpg?w=740",
      ProductTitle: "Gaming Mouse",
      Price: 3900,
      Discount: 22,
      ratings: 4.4,
      itemSold: 4000,
   },
   {
      ProductID: 10,
      ProductImgURL:
         "https://img.freepik.com/free-photo/bluetooth-speaker-digital-device_53876-96809.jpg?w=740",
      ProductTitle: "Bluetooth Speaker",
      Price: 6900,
      Discount: 17,
      ratings: 4.5,
      itemSold: 3000,
   },
   {
      ProductID: 1,
      ProductImgURL:
         "https://img.freepik.com/free-photo/smartwatch-digital-device_53876-96804.jpg?w=740",
      ProductTitle:
         "Apple Watchddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      Price: 12500,
      Discount: 12,
      ratings: 1.5,
      itemSold: 2500,
   },
   {
      ProductID: 2,
      ProductImgURL:
         "https://img.freepik.com/free-photo/wireless-headphones-digital-device_53876-96810.jpg?w=740",
      ProductTitle: "Wireless Headphones",
      Price: 8900,
      Discount: 20,
      ratings: 2.2,
      itemSold: 3100,
   },
   {
      ProductID: 3,
      ProductImgURL:
         "https://img.freepik.com/free-photo/laptop-digital-device_53876-96802.jpg?w=740",
      ProductTitle: "Dell Inspiron Laptop",
      Price: 175000,
      Discount: 10,
      ratings: 4.7,
      itemSold: 1200,
   },
   {
      ProductID: 4,
      ProductImgURL:
         "https://img.freepik.com/free-photo/cosmetic-beauty-product-makeup_53876-96813.jpg?w=740",
      ProductTitle: "Beauty Cream",
      Price: 2250,
      Discount: 18,
      ratings: 5,
      itemSold: 980,
   },
   {
      ProductID: 5,
      ProductImgURL:
         "https://img.freepik.com/free-photo/modern-shoes_53876-96808.jpg?w=740",
      ProductTitle: "Nike Running Shoes",
      Price: 14500,
      Discount: 25,
      ratings: 2,
      itemSold: 4500,
   },
   {
      ProductID: 6,
      ProductImgURL:
         "https://img.freepik.com/free-photo/smartphone-digital-device_53876-96811.jpg?w=740",
      ProductTitle: "Samsung Galaxy S22",
      Price: 225000,
      Discount: 15,
      ratings: 4.4,
      itemSold: 1800,
   },
   {
      ProductID: 7,
      ProductImgURL:
         "https://img.freepik.com/free-photo/stylish-backpack_53876-96806.jpg?w=740",
      ProductTitle: "Travel Backpack",
      Price: 4200,
      Discount: 30,
      ratings: 4.3,
      itemSold: 2100,
   },
   {
      ProductID: 8,
      ProductImgURL:
         "https://img.freepik.com/free-photo/camera-digital-device_53876-96803.jpg?w=740",
      ProductTitle: "Canon DSLR Camera",
      Price: 225000,
      Discount: 8,
      ratings: 4.8,
      itemSold: 950,
   },
   {
      ProductID: 9,
      ProductImgURL:
         "https://img.freepik.com/free-photo/gaming-mouse-digital-device_53876-96807.jpg?w=740",
      ProductTitle: "Gaming Mouse",
      Price: 3900,
      Discount: 22,
      ratings: 4.4,
      itemSold: 4000,
   },
   {
      ProductID: 10,
      ProductImgURL:
         "https://img.freepik.com/free-photo/bluetooth-speaker-digital-device_53876-96809.jpg?w=740",
      ProductTitle: "Bluetooth Speaker",
      Price: 6900,
      Discount: 17,
      ratings: 4.5,
      itemSold: 3000,
   },
   {
      ProductID: 1,
      ProductImgURL:
         "https://img.freepik.com/free-photo/smartwatch-digital-device_53876-96804.jpg?w=740",
      ProductTitle:
         "Apple Watchddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      Price: 12500,
      Discount: 12,
      ratings: 1.5,
      itemSold: 2500,
   },
   {
      ProductID: 2,
      ProductImgURL:
         "https://img.freepik.com/free-photo/wireless-headphones-digital-device_53876-96810.jpg?w=740",
      ProductTitle: "Wireless Headphones",
      Price: 8900,
      Discount: 20,
      ratings: 2.2,
      itemSold: 3100,
   },
   {
      ProductID: 3,
      ProductImgURL:
         "https://img.freepik.com/free-photo/laptop-digital-device_53876-96802.jpg?w=740",
      ProductTitle: "Dell Inspiron Laptop",
      Price: 175000,
      Discount: 10,
      ratings: 4.7,
      itemSold: 1200,
   },
   {
      ProductID: 4,
      ProductImgURL:
         "https://img.freepik.com/free-photo/cosmetic-beauty-product-makeup_53876-96813.jpg?w=740",
      ProductTitle: "Beauty Cream",
      Price: 2250,
      Discount: 18,
      ratings: 5,
      itemSold: 980,
   },
   {
      ProductID: 5,
      ProductImgURL:
         "https://img.freepik.com/free-photo/modern-shoes_53876-96808.jpg?w=740",
      ProductTitle: "Nike Running Shoes",
      Price: 14500,
      Discount: 25,
      ratings: 2,
      itemSold: 4500,
   },
   {
      ProductID: 6,
      ProductImgURL:
         "https://img.freepik.com/free-photo/smartphone-digital-device_53876-96811.jpg?w=740",
      ProductTitle: "Samsung Galaxy S22",
      Price: 225000,
      Discount: 15,
      ratings: 4.4,
      itemSold: 1800,
   },
   {
      ProductID: 7,
      ProductImgURL:
         "https://img.freepik.com/free-photo/stylish-backpack_53876-96806.jpg?w=740",
      ProductTitle: "Travel Backpack",
      Price: 4200,
      Discount: 30,
      ratings: 4.3,
      itemSold: 2100,
   },
   {
      ProductID: 8,
      ProductImgURL:
         "https://img.freepik.com/free-photo/camera-digital-device_53876-96803.jpg?w=740",
      ProductTitle: "Canon DSLR Camera",
      Price: 225000,
      Discount: 8,
      ratings: 4.8,
      itemSold: 950,
   },
   {
      ProductID: 9,
      ProductImgURL:
         "https://img.freepik.com/free-photo/gaming-mouse-digital-device_53876-96807.jpg?w=740",
      ProductTitle: "Gaming Mouse",
      Price: 3900,
      Discount: 22,
      ratings: 4.4,
      itemSold: 4000,
   },
   {
      ProductID: 10,
      ProductImgURL:
         "https://img.freepik.com/free-photo/bluetooth-speaker-digital-device_53876-96809.jpg?w=740",
      ProductTitle: "Bluetooth Speaker",
      Price: 6900,
      Discount: 17,
      ratings: 4.5,
      itemSold: 3000,
   },
   {
      ProductID: 1,
      ProductImgURL:
         "https://img.freepik.com/free-photo/smartwatch-digital-device_53876-96804.jpg?w=740",
      ProductTitle:
         "Apple Watchddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      Price: 12500,
      Discount: 12,
      ratings: 1.5,
      itemSold: 2500,
   },
   {
      ProductID: 2,
      ProductImgURL:
         "https://img.freepik.com/free-photo/wireless-headphones-digital-device_53876-96810.jpg?w=740",
      ProductTitle: "Wireless Headphones",
      Price: 8900,
      Discount: 20,
      ratings: 2.2,
      itemSold: 3100,
   },
   {
      ProductID: 3,
      ProductImgURL:
         "https://img.freepik.com/free-photo/laptop-digital-device_53876-96802.jpg?w=740",
      ProductTitle: "Dell Inspiron Laptop",
      Price: 175000,
      Discount: 10,
      ratings: 4.7,
      itemSold: 1200,
   },
   {
      ProductID: 4,
      ProductImgURL:
         "https://img.freepik.com/free-photo/cosmetic-beauty-product-makeup_53876-96813.jpg?w=740",
      ProductTitle: "Beauty Cream",
      Price: 2250,
      Discount: 18,
      ratings: 5,
      itemSold: 980,
   },
   {
      ProductID: 5,
      ProductImgURL:
         "https://img.freepik.com/free-photo/modern-shoes_53876-96808.jpg?w=740",
      ProductTitle: "Nike Running Shoes",
      Price: 14500,
      Discount: 25,
      ratings: 2,
      itemSold: 4500,
   },
   {
      ProductID: 6,
      ProductImgURL:
         "https://img.freepik.com/free-photo/smartphone-digital-device_53876-96811.jpg?w=740",
      ProductTitle: "Samsung Galaxy S22",
      Price: 225000,
      Discount: 15,
      ratings: 4.4,
      itemSold: 1800,
   },
   {
      ProductID: 7,
      ProductImgURL:
         "https://img.freepik.com/free-photo/stylish-backpack_53876-96806.jpg?w=740",
      ProductTitle: "Travel Backpack",
      Price: 4200,
      Discount: 30,
      ratings: 4.3,
      itemSold: 2100,
   },
   {
      ProductID: 8,
      ProductImgURL:
         "https://img.freepik.com/free-photo/camera-digital-device_53876-96803.jpg?w=740",
      ProductTitle: "Canon DSLR Camera",
      Price: 225000,
      Discount: 8,
      ratings: 4.8,
      itemSold: 950,
   },
   {
      ProductID: 9,
      ProductImgURL:
         "https://img.freepik.com/free-photo/gaming-mouse-digital-device_53876-96807.jpg?w=740",
      ProductTitle: "Gaming Mouse",
      Price: 3900,
      Discount: 22,
      ratings: 4.4,
      itemSold: 4000,
   },
   {
      ProductID: 10,
      ProductImgURL:
         "https://img.freepik.com/free-photo/bluetooth-speaker-digital-device_53876-96809.jpg?w=740",
      ProductTitle: "Bluetooth Speaker",
      Price: 6900,
      Discount: 17,
      ratings: 4.5,
      itemSold: 3000,
   },
   {
      ProductID: 1,
      ProductImgURL:
         "https://img.freepik.com/free-photo/smartwatch-digital-device_53876-96804.jpg?w=740",
      ProductTitle:
         "Apple Watchddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      Price: 12500,
      Discount: 12,
      ratings: 1.5,
      itemSold: 2500,
   },
   {
      ProductID: 2,
      ProductImgURL:
         "https://img.freepik.com/free-photo/wireless-headphones-digital-device_53876-96810.jpg?w=740",
      ProductTitle: "Wireless Headphones",
      Price: 8900,
      Discount: 20,
      ratings: 2.2,
      itemSold: 3100,
   },
   {
      ProductID: 3,
      ProductImgURL:
         "https://img.freepik.com/free-photo/laptop-digital-device_53876-96802.jpg?w=740",
      ProductTitle: "Dell Inspiron Laptop",
      Price: 175000,
      Discount: 10,
      ratings: 4.7,
      itemSold: 1200,
   },
   {
      ProductID: 4,
      ProductImgURL:
         "https://img.freepik.com/free-photo/cosmetic-beauty-product-makeup_53876-96813.jpg?w=740",
      ProductTitle: "Beauty Cream",
      Price: 2250,
      Discount: 18,
      ratings: 5,
      itemSold: 980,
   },
   {
      ProductID: 5,
      ProductImgURL:
         "https://img.freepik.com/free-photo/modern-shoes_53876-96808.jpg?w=740",
      ProductTitle: "Nike Running Shoes",
      Price: 14500,
      Discount: 25,
      ratings: 2,
      itemSold: 4500,
   },
   {
      ProductID: 6,
      ProductImgURL:
         "https://img.freepik.com/free-photo/smartphone-digital-device_53876-96811.jpg?w=740",
      ProductTitle: "Samsung Galaxy S22",
      Price: 225000,
      Discount: 15,
      ratings: 4.4,
      itemSold: 1800,
   },
   {
      ProductID: 7,
      ProductImgURL:
         "https://img.freepik.com/free-photo/stylish-backpack_53876-96806.jpg?w=740",
      ProductTitle: "Travel Backpack",
      Price: 4200,
      Discount: 30,
      ratings: 4.3,
      itemSold: 2100,
   },
   {
      ProductID: 8,
      ProductImgURL:
         "https://img.freepik.com/free-photo/camera-digital-device_53876-96803.jpg?w=740",
      ProductTitle: "Canon DSLR Camera",
      Price: 225000,
      Discount: 8,
      ratings: 4.8,
      itemSold: 950,
   },
   {
      ProductID: 9,
      ProductImgURL:
         "https://img.freepik.com/free-photo/gaming-mouse-digital-device_53876-96807.jpg?w=740",
      ProductTitle: "Gaming Mouse",
      Price: 3900,
      Discount: 22,
      ratings: 4.4,
      itemSold: 4000,
   },
   {
      ProductID: 10,
      ProductImgURL:
         "https://img.freepik.com/free-photo/bluetooth-speaker-digital-device_53876-96809.jpg?w=740",
      ProductTitle: "Bluetooth Speaker",
      Price: 6900,
      Discount: 17,
      ratings: 4.5,
      itemSold: 3000,
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
               <ProductItem key={product.ProductID} {...product} />
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
