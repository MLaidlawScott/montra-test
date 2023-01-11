import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
      </nav>
      <div>
        <div>
          <span>First Name</span>
          <span>Last Name</span>
        </div>
        <span>PROFILE IMAGE</span>
      </div>
    </div>
  );
};

export default Navbar;
