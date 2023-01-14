import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";

import { BooksByIsbnResponse, client } from "../../api/supabase";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import { addItem, selectCart } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BookCartItem } from "../../types";

type Data = {
  book?: NonNullable<BooksByIsbnResponse["data"]>[number];
};

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async ({
  query,
}) => {
  const { isbn } = query;

  if (typeof isbn != "string") {
    return { props: { data: { book: undefined } } };
  }

  const book = await client.book.getBookByIsbn(isbn);

  return { props: { data: { book: book.data?.[0] } } };
};

export default function Item({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useAppDispatch();

  if (!data.book) {
    return <Layout>Something went wrong</Layout>;
  }

  const cart = useAppSelector(selectCart);

  const { price, title, description, thumbnail_uri, Author, isbn } = data.book;

  const addBookToCart = () => {
    const book: BookCartItem = {
      isbn,
      price,
      thumbnailUri: thumbnail_uri,
      title,
      description,
    };

    dispatch(addItem(book));
  };

  const authorName = Author && !Array.isArray(Author) ? Author.name : "";
  const quantity = cart.items.filter((book) => book.isbn === isbn).length;

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="flex flex-col p-4 gap-4 max-w-2xl">
          <span className="text-lg">{title}</span>
          <span>{authorName}</span>
          <span>{description}</span>
        </div>
        <div className="flex flex-col p-4 gap-2">
          <Image
            width={200}
            height={200}
            alt="book thumbnail"
            crossOrigin="anonymous"
            src={thumbnail_uri}
          />
          <span>Price: ${price / 100}</span>
          <span>Quantity: {quantity}</span>
          <span>Total: ${(quantity * price) / 100}</span>
          <Button onClick={addBookToCart} title="Add to Cart" />
        </div>
      </div>
    </Layout>
  );
}
