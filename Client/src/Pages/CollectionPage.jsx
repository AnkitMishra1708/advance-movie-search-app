import React, { useEffect, useState } from "react";
import { getMyCollections } from "../Helper/CollectionApi.jsx";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import MoviePoster from "../Components/MoviePoster.jsx";

const CollectionPage = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    async function fetchCollection() {
      const res = await getMyCollections();
      const data = res?.data?.data;
      const found = data?.find((c) => c._id === collectionId);
      setCollection(found);
    }

    fetchCollection();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-10 pb-15 py-5 bg-black text-white">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold mb-10">{collection?.name}</h1>
        </div>
        {collection?.items?.length === 0 ? (
          <>
            <p className="text-gray-400">No movies in this collection</p>
          </>
        ) : (
          <div className="flex flex-wrap gap-12">
            {collection?.items?.map((item, i) => (
              <MoviePoster key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionPage;
