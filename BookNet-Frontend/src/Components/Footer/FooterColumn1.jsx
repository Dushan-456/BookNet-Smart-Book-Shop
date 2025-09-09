import logo from "../../assets/Images/BookNet-Logo-Small-without-BG.png";

const FooterColumn1 = () => {
  return (
    <div className=" md:flex-3 flex flex-col items-center p-5 gap-5 ">
      <img src={logo} alt="BookNet Logo" className="w-3xs" />
      <p className="text-center md:text-justify">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ducimus
        obcaecati et quam pariatur eveniet nihil fugit quisquam labore possimus
        vel facere ratione nesciunt ad architecto, nostrum nam quo perspiciatis.
      </p>
    </div>
  );
};

export default FooterColumn1;
