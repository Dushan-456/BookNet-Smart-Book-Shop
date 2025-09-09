import logo from "../../assets/Images/BookNet-Logo-Small-without-BG.png";

const Footer = () => {
  return (
    <footer className="bg-gray-300 pt-10">
      <div className="md:flex md:container mx-auto pb-5">
        <div className=" md:flex-3 flex flex-col items-center p-5 ">
          <img src={logo} alt="BookNet Logo" className="w-3xs" />
          <p className="text-center md:text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
            ducimus obcaecati et quam pariatur eveniet nihil fugit quisquam
            labore possimus vel facere ratione nesciunt ad architecto, nostrum
            nam quo perspiciatis.
          </p>
        </div>
        <div className=" md:flex-3 flex flex-col items-center p-5 ">
          <h2 className="text-2xl text-center font-semibold">Services</h2>
        </div>
        <div className=" md:flex-3 flex flex-col items-center p-5 ">
          <h2 className="text-2xl text-center font-semibold">Quick Links</h2>
        </div>
        <div className=" md:flex-3 flex flex-col items-center p-5 ">
          <h2 className="text-2xl text-center font-semibold">fkbbjfbv</h2>
        </div>
      </div>
      <div className=" bg-gray-800 text-white p-3  text-center">
        <p>&copy; {new Date().getFullYear()} BookNet. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
