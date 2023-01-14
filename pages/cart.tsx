import Layout from "../components/Layout";
import { addItem, removeItem, selectCart } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { BookCartItem } from "../types";
import Image from "next/image";
import Button from "../components/Button";

export default function Cart() {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const cartTotals = cart.items.reduce<{
    [k: string]: BookCartItem & { quantity: number };
  }>((prev, cur) => {
    const isbn = cur.isbn;

    if (prev[isbn]) {
      return {
        ...prev,
        [isbn]: { ...prev[isbn], quantity: prev[isbn].quantity + 1 },
      };
    }

    return { ...prev, [isbn]: { ...cur, quantity: 1 } };
  }, {});

  return (
    <Layout>
      <div className="flex flex-col gap-5 m-8">
        {Object.keys(cartTotals).map((isbn) => {
          const book = cartTotals[isbn];
          const { description, price, quantity, thumbnailUri, title } = book;

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
                <span className="text-l">
                  Price: ${(price * quantity) / 100}
                </span>
                <span>Quantity: {quantity}</span>
                <div>
                  <Button onClick={() => dispatch(addItem(book))} title="+" />
                  <Button
                    onClick={() => dispatch(removeItem(isbn))}
                    title="-"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
