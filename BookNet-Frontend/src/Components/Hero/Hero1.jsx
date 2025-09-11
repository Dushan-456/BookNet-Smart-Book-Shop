import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { Autoplay, Pagination, Navigation } from "swiper/modules";

const AdsElement = [
   {
      imgURL:
         "https://edmondsbookshop.com/sites/default/files/styles/homepage_slider/public/2025-09/slider2025hugonebula.jpg?itok=1jhCYzl5",
   },
   {
      imgURL:
         "https://www.cabidigitallibrary.org/pb-assets/Books/Bookshop/cdl-bookshop-banner-2000x600-v2-1730191398.webp",
   },
   {
      imgURL:
         "https://www.shutterstock.com/image-vector/business-stationery-brand-identity-mockup-260nw-2504861047.jpg",
   },
   {
      imgURL:
         "https://cdn.create.vista.com/downloads/0ead94e0-870a-4fca-b541-cd1e8e994b18_1024.jpeg",
   },
   {
      imgURL:
         "https://images.unsplash.com/opengraph/1x1.png?mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-w=64&mark-align=top%2Cleft&mark-pad=50&h=630&w=1200&blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1569728723358-d1a317aa7fba%3Fcrop%3Dfaces%252Cedges%26h%3D630%26w%3D1200%26blend%3D000000%26blend-mode%3Dnormal%26blend-alpha%3D10%26mark-w%3D750%26mark-align%3Dmiddle%252Ccenter%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fw%253D750%2526h%253D84%2526txt%253Dbook%252Bstore%2526txt-pad%253D80%2526txt-align%253Dmiddle%25252Cleft%2526txt-color%253D%252523000000%2526txt-size%253D40%2526txt-width%253D660%2526txt-clip%253Dellipsis%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8M3x8Ym9vayUyMHN0b3JlfGVufDB8fHx8MTc1NjkzMzA4N3ww%26ixlib%3Drb-4.1.0&blend-w=1&auto=format&fit=crop&q=60",
   },
   {
      imgURL:
         "https://bookshop-uk-prod-images.storage.googleapis.com/spree/affiliate_profiles/banner_images/12784/original/bookshop.jpg?1692267712",
   },
];

const Hero1 = () => {
   return (
      <Swiper
         spaceBetween={30}
         centeredSlides={true}
         autoplay={{
            delay: 2500,
            disableOnInteraction: false,
         }}
         pagination={{
            clickable: true,
         }}
         navigation={false}
         modules={[Autoplay, Pagination, Navigation]}>
         {AdsElement.map(({ imgURL }, index) => (
            <SwiperSlide key={index}>
               <Images imgURL={imgURL} id={index} />
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

export default Hero1;

const Images = ({ imgURL, id }) => (
   <img className="w-full h-50 md:h-130 object-cover" src={imgURL} alt={`ad${id}`} />
);
