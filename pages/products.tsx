import Layout from "../components/Layout";
import { BooksResponse, client } from "../api/supabase";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Products() {
  const [books, setBooks] = useState<BooksResponse["data"]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    setLoading(true);
    const books = await client.book.getBooks();
    setLoading(false);
    setBooks(books.data);
  };
  return (
    <Layout>
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="flex gap-8 flex-wrap justify-center m-8">
          {books?.map((book) => {
            return (
              <Link href={`/item/${book.isbn}`}>
                <Image
                  key={book.isbn}
                  width={200}
                  height={200}
                  alt="book thumbnail"
                  crossOrigin="anonymous"
                  src={book.thumbnail_uri}
                />
              </Link>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
