import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";

import { BooksByIsbnResponse, client } from "../../api/supabase";
import Layout from "../../components/Layout";

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
  if (!data.book) {
    return <Layout>Something went wrong</Layout>;
  }

  const { price, title, description, thumbnail_uri, Author } = data.book;

  const authorName = Author && !Array.isArray(Author) ? Author.name : "";

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="flex flex-col p-4 gap-4 max-w-2xl">
          <span className="text-lg">{title}</span>
          <span>{authorName}</span>
          <span>{description}</span>
        </div>
        <div className="flex flex-col p-4">
          <Image
            width={200}
            height={200}
            alt="book thumbnail"
            crossOrigin="anonymous"
            src={thumbnail_uri}
          />
          <span>Price: {price / 100}</span>
          <span>Quantity: </span>
        </div>
      </div>
    </Layout>
  );
}
