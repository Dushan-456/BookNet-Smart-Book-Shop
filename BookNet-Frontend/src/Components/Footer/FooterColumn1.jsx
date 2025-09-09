import logo from "../../assets/Images/BookNet-Logo-Small-without-BG.png";

const FooterColumn1 = () => {
  return (
    <div className=" md:flex-3 flex flex-col items-center p-5 gap-5 ">
      <div className="flex flex-col items-center">
        <img src={logo} alt="BookNet Logo" className="w-3xs" />
        <h3 className="text-center font-bold text-xl">
          “Your One-Stop Online Bookshop & Service Center”
        </h3>
      </div>
      <p className="text-center md:text-justify">
        Whether you’re a student looking for textbooks, a professional needing
        quick document printing, or someone shopping for stationery, BookNet has
        you covered. Simple, fast, and reliable
      </p>
    </div>
  );
};

export default FooterColumn1;
