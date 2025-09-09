// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

const sampleproducts = [
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

// import required modules
import { Grid, Mousewheel, Navigation } from "swiper/modules";
import ProductItem from "./ProductItem";

const ProductSlider = ({ topic, rows, slidesPerView }) => {
   return (
      <section>
         <h1 className="products-topic">{topic}</h1>

         <Swiper
            slidesPerView={slidesPerView}
            grid={{
               rows: rows,
            }}
            spaceBetween={10}
            pagination={{
               clickable: true,
            }}
            mousewheel={true}
            navigation={true}
            modules={[Grid, Mousewheel, Navigation]}>
            {sampleproducts.map(
               (
                  {
                     ProductImgURL,
                     ProductTitle,
                     Price,
                     Discount,
                     ratings,
                     
                  },
                  index
               ) => (
                  <SwiperSlide key={index}>
                     <ProductItem
                        ProductImgURL={ProductImgURL}
                        ProductTitle={ProductTitle}
                        Price={Price}
                        Discount={Discount}
                        ratings={ratings}
                     />
                  </SwiperSlide>
               )
            )}
         </Swiper>
      </section>
   );
};

export default ProductSlider;

// const ProductItem = ({
//    ProductImgURL,
//    ProductTitle,
//    Price,
//    Discount,
//    ratings,
//    itemSold,
// }) => (
//    <div className="product-card">
//       <img className="product-img" src={ProductImgURL} alt={ProductTitle}  style={{
//     width: '250px',
//     height: '250px',
//     objectFit: 'cover',
//     borderRadius: '8px',
//   }}/>
//       <p className="product-title w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">{ProductTitle}</p>
//       <p className="price">
//          <span className="currency">LKR </span>
//          {(Price * (100 - Discount)) / 100}.00{" "}
//          <span className="old-price">{Price}.00</span>
//          <span className="discount"> -{Discount}%</span>
//       </p>

//       <div>
//          <Rating
//             name="half-rating-read"
//             defaultValue={ratings}
//             precision={0.5}
//             readOnly
//             size="small"
//          />
//          <span className="rate">{ratings}</span>
//          <span className="sold"> | {itemSold}+ sold</span>
//       </div>
//    </div>
// );
