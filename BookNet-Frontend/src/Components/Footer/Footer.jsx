import FooterColumn1 from "./FooterColumn1";
import FooterColumn2 from "./FooterColumn2";
import FooterColumn3 from "./FooterColumn3";
import FooterColumn4 from "./FooterColumn4";

const Footer = () => {
  return (
    <footer className="bg-gray-300 pt-5">
      <div className="md:flex md:container mx-auto pb-5">
        <FooterColumn1 />
        <FooterColumn2 />
        <FooterColumn3 />
        <FooterColumn4 />
      </div>
      <div className=" bg-gray-800 text-white p-3  text-center">
        <p>&copy; {new Date().getFullYear()} BookNet. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
