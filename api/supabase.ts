import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// hardcoded value as we only have 1 author for this example
const AUTHOR_ID = "1";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const getAuthor = async () => {
  const res = await supabase.from("Author").select("*").eq("id", AUTHOR_ID);

  if (res.error) {
    console.error("something went wrong");
  }

  return res;
};

const getBooks = async () => {
  const res = await supabase.from("Book").select("*");

  if (res.error) {
    console.error("something went wrong");
  }

  return res;
};

export type AuthorResponse = Awaited<ReturnType<typeof getAuthor>>;
export type BooksResponse = Awaited<ReturnType<typeof getBooks>>;

export const client = {
  book: { getBooks },
  author: { getAuthor },
};
