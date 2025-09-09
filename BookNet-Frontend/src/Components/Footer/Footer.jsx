// import logo from "../../assets/ImagesBookNet-Logo-Small-without-BG.png"

const Footer = () => {
  return (
    <footer className="">
      <div className="md:flex md:container mx-auto">
        <div className=" md:flex-3 ">
          <img src="" alt="" />
        </div>
        <div className=" md:flex-3 ">
          <h2 className="text-2xl text-center font-semibold">Services</h2>
        </div>
        <div className=" md:flex-3 ">
          <h2 className="text-2xl text-center font-semibold">Quick Links</h2>
        </div>
        <div className=" md:flex-3 ">
          <h2 className="text-2xl text-center font-semibold">fkbbjfbv</h2>
        </div>
      </div>
      <div className=" bg-gray-800 text-white p-4   text-center">
        <p>&copy; {new Date().getFullYear()} BookNet. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
