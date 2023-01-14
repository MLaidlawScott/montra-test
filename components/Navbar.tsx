import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectProfile, updateThumbnail } from "../store/profileSlice";

const PROFILE_LOCAL_STORAGE = "profile-image";

const Navbar = () => {
  const { firstName, lastName, profileThumbnailUri } =
    useAppSelector(selectProfile);

  const dispatch = useAppDispatch();

  // This shouldnt live here but for times sake it does
  useEffect(() => {
    const localPhoto = localStorage.getItem(PROFILE_LOCAL_STORAGE);
    if (localPhoto) {
      dispatch(updateThumbnail(localPhoto));
    }
  }, []);

  return (
    <div className="border-b-2 flex flex-row justify-between px-4 items-center">
      <nav className="space-x-4 text-2xl flex">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
      </nav>
      <Link href={"/account"}>
        <div className="flex flex-row space-x-4 items-center p-4">
          <div className="flex flex-col">
            <span>{firstName}</span>
            <span>{lastName}</span>
          </div>
          <Image
            className="rounded-full aspect-square overflow-hidden"
            width={80}
            height={80}
            alt="profile Thumbnail"
            crossOrigin="anonymous"
            src={profileThumbnailUri}
          />{" "}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
