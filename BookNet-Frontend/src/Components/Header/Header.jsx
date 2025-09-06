import { Link } from 'react-router-dom';

const Header = () => {
   return (
      <header className="bg-blue-600 text-white p-4 shadow-md">
         <nav className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
               BookNet
            </Link>
            <div>
               <Link to="/login" className="mr-4 hover:underline">
                  Login
               </Link>
               <Link to="/register" className="hover:underline">
                  Register
               </Link>
               <Link to="/cart" className="ml-6 font-semibold">
                  Cart
               </Link>
            </div>
         </nav>
      </header>
   );
};

export default Header;
