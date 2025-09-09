
const Footer = () => {
  return (
    <footer className="">
      <div className="md:flex md:container mx-auto">
        <div className=" md:flex-3 bg-cyan-700"><h2>About Us
        </h2></div>
        <div className=" md:flex-3 bg-red-500"><h2>Services</h2></div>
        <div className=" md:flex-3 bg-amber-300"><h2>Quick Links</h2></div>
        <div className=" md:flex-3 bg-blue-700"><h2>fkbbjfbv</h2></div>
      </div>
      <div className=" bg-gray-800 text-white p-4   text-center">
        <p>&copy; {new Date().getFullYear()} BookNet. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
