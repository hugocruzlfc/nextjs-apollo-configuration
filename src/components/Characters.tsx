"use client";
import React from "react";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export const Characters: React.FC = () => {
  const { data } = useSuspenseQuery(query);
  return (
    <section>
      <h1 className="flex justify-center mb-10">
        Next.js + Apollo Client: SSR
      </h1>
      <div className="grid grid-cols-3">
        {(
          (
            data as {
              characters: {
                results: { id: string; image: string; name: string }[];
              };
            }
          ).characters.results || []
        ).map((result: { id: string; image: string; name: string }) => (
          <div key={result.id}>
            <img
              src={result.image}
              alt={result.name}
              width={200}
              height={200}
            />
            <p>{result.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
