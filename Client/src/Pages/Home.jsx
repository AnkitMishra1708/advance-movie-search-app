import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import { FetchCurrentUser } from "../Helper/FetchCurrentUser.jsx";
import UpcomingVerticalSlider from "../Components/UpcomingHorizontalSlider.jsx";
import HorizontalRow from "../Components/HorizontalRow.jsx";
import { HomeSections } from "../config/HomeSections.jsx";
import { useHomeSections } from "../hooks/useHomeSections.jsx";

export default function Home() {
  const [user, setUser] = useState(null);
  const { data, loading, error } = useHomeSections(HomeSections);

  useEffect(() => {
    async function currentUser() {
      const response = await FetchCurrentUser();
      const data = response;
      setUser(data);
    }
    currentUser();
  }, []);

  return (
    <>
      <div className=" bg-black pb-6 text-white">
        <Navbar />

        <div className="p-6">
          <h2 className="text-3xl font-bold">
            Hey, {user?.fullName}
            <span className="animate-pulse"></span>
          </h2>
          <p className="text-gray-300 mt-2">
            Explore top rated movies, series and manage your watchlist & reviews
            and don't forget to enjoyyy!
          </p>
        </div>

        <UpcomingVerticalSlider />

        <div className="mb-3 border border-gray-500"></div>
        {HomeSections.map((section) => (
          <HorizontalRow
            key={section.key}
            type={section.type}
            title={section.title}
            items={data[section.key] || []}
            loading={loading[section.key]}
            error={error[section.key]}
          />
        ))}

        <div className="flex justify-center">
          <p className="text-xl mt-5 text-gray-400">
            ---Nothing to see more---
          </p>
        </div>
      </div>
    </>
  );
}
