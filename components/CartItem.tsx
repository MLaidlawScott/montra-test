import Image from "next/image";
import { BookCartItem } from "../types";
import Button from "./Button";

type Props = {
  book: BookCartItem;
  quantity: number;
  onPlusClick: () => void;
  onMinusClick: () => void;
};

const CartItem = ({ book, quantity, onMinusClick, onPlusClick }: Props) => {
  const { description, price, thumbnailUri, title, isbn } = book;

  return (
    <div key={isbn} className="flex gap-4 overflow-hidden">
      <Image
        width={100}
        height={100}
        alt="book thumbnail"
        crossOrigin="anonymous"
        src={thumbnailUri}
      />
      <div className="flex flex-col gap-4">
        <span className="text-xl">{title}</span>
        <span className="overflow-ellipsis ">{description}</span>
      </div>
      <div className="flex flex-col gap-4 shrink-0">
        <span className="text-l">Price: ${(price * quantity) / 100}</span>
        <span>Quantity: {quantity}</span>
        <div className="flex gap-2">
          <Button onClick={onPlusClick} title="+" />
          <Button onClick={onMinusClick} title="-" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
