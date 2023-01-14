import Layout from "../components/Layout";
import { addItem, removeItem, selectCart } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { BookCartItem } from "../types";
import Image from "next/image";
import Button from "../components/Button";
import CartItem from "../components/CartItem";

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

          return (
            <CartItem
              book={book}
              quantity={book.quantity}
              onPlusClick={() => dispatch(addItem(book))}
              onMinusClick={() => dispatch(removeItem(isbn))}
            />
          );
        })}
      </div>
    </Layout>
  );
}
