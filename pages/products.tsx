import Layout from "../components/Layout";
import { BooksResponse, client } from "../api/supabase";
import { useEffect, useState } from "react";

const mockProducts = ["1", "2", "3"];

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
        <div className="flex flex-row">
          {books?.map((book) => {
            console.log("book", book);
            return <div key={book.isbn}>{book.title}</div>;
          })}
        </div>
      )}
    </Layout>
  );
}
