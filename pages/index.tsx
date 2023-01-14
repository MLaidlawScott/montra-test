import { Canvas } from "@react-three/fiber";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AuthorResponse, client } from "../api/supabase";
import { AuthorCanvas } from "../components/AuthorCanvas";
import Layout from "../components/Layout";

export default function Home() {
  const [author, setAuthor] = useState<
    NonNullable<AuthorResponse["data"]>[number] | null
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuthor();
  }, []);

  const getAuthor = async () => {
    setLoading(true);
    const author = await client.author.getAuthor();
    setLoading(false);
    setAuthor(author.data?.[0]);
  };

  return (
    <>
      <Head>
        <title>Montra Test</title>
        <meta name="description" content="Tech test for Montra" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {loading ? (
          <>loading!</>
        ) : (
          author && (
            <Canvas className="h-full bg-red-300">
              <AuthorCanvas
                thumbnailUri={author.thumbnail_uri}
                description={author.description}
              />
            </Canvas>
          )
        )}
      </Layout>
    </>
  );
}
