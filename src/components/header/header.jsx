import UserTag from "../userData/userData.jsx";

function Header() {
  return (
    <header className="fixed w-full top-0 left-0 z-50  flex items-center justify-between px-6 py-6 bg-c1 shadow-2xl">
      <h1 onClick={() => {
            window.location.href = "";
          }} className="cursor-pointer text-c4 font-bold text-4xl">Hotel Management System</h1>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-14 text-xl">
        <a
          href="#gallery"
          className="text-white hover:text-c2 transition font-semibold"
        >
          Gallery
        </a>
        <a
          href="#reviews"
          className="text-white hover:text-c2 transition font-semibold"
        >
          Reviews
        </a>
        <a
          href="#contact"
          className="text-white hover:text-c2 transition font-semibold"
        >
          Inquiries
        </a>
        <a
          href="#rooms"
          
          className="text-white hover:text-c2 transition font-semibold"
        >
          Rooms
        </a>
        <a
          href="#contact"
          className="text-white hover:text-c2 transition font-semibold"
        >
          Contact Us
        </a>
      </nav>

      {/* User Info */}
      <UserTag
        imageLink="person.png"
      />
    </header>
  );
}

export default Header;