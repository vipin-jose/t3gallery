import Link from "next/link";
import { mock } from "node:test";

import { db } from "../server/db";
export const dynamic = 'force-dynamic';

const mockUrls = [
  "https://utfs.io/f/5a100b1e-ac5d-47b1-8492-416a79998182-18f.png",
  "https://utfs.io/f/cd633310-fbdb-4894-a0ca-fa38f098d3d4-1h.png",
  "https://utfs.io/f/3d149abf-1c26-4b97-a5ff-36114bd708c0-18e.png",
  "https://utfs.io/f/1399b1ac-c4ae-469c-abef-d33bd36f628b-17k.png",
  "https://utfs.io/f/eca37c4b-6315-4612-8589-a4833c6f678a-18h.png",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}));

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id)
  });
  console.log(images);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {/*images.map((image) => {
          return (
            <div key={image.id}>{image.name}</div>
          );

        })*/}
        {images.map((image) => (
          <div key={image.id} className="flex w-48 flex-col">
            <img
              src={image.url}
              alt="mock"
              className="w-full object-cover"
            />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
