import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <main className="h-full">{children}</main>
    </div>
  );
};

export default Layout;
