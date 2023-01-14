import Link from "next/link";

const Navbar = () => {
  return (
    <div className="border-b-2 flex flex-row justify-between px-4">
      <nav className="space-x-4 text-2xl">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
      </nav>
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col">
          <span>First Name</span>
          <span>Last Name</span>
        </div>
        <span>PROFILE IMAGE</span>
      </div>
    </div>
  );
};

export default Navbar;
