import Image from "next/image";
import { getClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

async function loadData() {
  const { data } = await getClient().query({
    query: gql`
      query {
        characters(page: 1) {
          results {
            id
            name
            image
          }
        }
      }
    `,
  });

  return data;
}

export default async function Home() {
  const {
    characters: { results },
  } = await loadData();

  return (
    <main className="mx-5 my-5 pl-20">
      <h1 className="flex justify-center mb-10">Next.js + Apollo Client</h1>
      <div className="grid grid-cols-3">
        {results.map((result: { id: string; image: string; name: string }) => (
          <div key={result.id}>
            <Image
              src={result.image}
              alt={result.name}
              width={200}
              height={200}
            />
            <p>{result.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
