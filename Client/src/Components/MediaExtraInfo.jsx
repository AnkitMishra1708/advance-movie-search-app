import React from "react";
import Card from "./Card";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

function MediaExtraInfo({ media, cast, flatrate, rent, buy, ads, type }) {
  if (!media) return null;

  return (
    <div className="min pl-6 bg-black py-7 text-white">
      {type === "tv" && (
        <>
          <Section title="Seasons">
            <div className="flex flex-wrap gap-6">
              {media.seasons?.map((seasons, i) => (
                <SeasonsItem key={i} seasons={seasons} />
              ))}
            </div>
          </Section>
        </>
      )}

      <Section title="Cast">
        <div className="flex flex-wrap gap-3">
          <CastItem key={cast.id} cast={cast.cast} />
        </div>
      </Section>

      <Section title="Crew">
        <div className="flex flex-wrap gap-6">
          <CastItem key={cast.id} cast={cast.crew} />
        </div>
      </Section>

      <Section title="Production Companies">
        <div className="flex flex-wrap gap-6">
          {media.production_companies?.map((company) => (
            <CompanyItem key={company.id} company={company} />
          ))}
        </div>
      </Section>

      <Section title="Watch On">
        <div className="flex flex-wrap gap-6">
          <WatchOn flatrate={flatrate} rent={rent} buy={buy} ads={ads} />
        </div>
      </Section>
    </div>
  );
}

const Section = ({ title, children }) => (
  <section className="mb-14">
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    <div className="space-y-4 overflow-y-auto scrollbar-hide">{children}</div>
  </section>
);

const CompanyItem = ({ company }) => (
  <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-lg">
    {company.logo_path ? (
      <img
        src={imgBaseUrl + company.logo_path}
        alt={company.name}
        className="h-10 object-contain"
      />
    ) : (
      <div className="h-10 w-10 bg-gray-700 rounded flex items-center justify-center text-sm">
        N/A
      </div>
    )}
    <span className="text-sm text-gray-300">{company.name}</span>
  </div>
);

const SeasonsItem = ({ seasons }) => (
  <div className="bg-black px-4 py-3 cursor-pointer space-y-3 rounded-lg hover:bg-gray-950 transition duration-300">
    {seasons.poster_path ? (
      <img
        src={imgBaseUrl + seasons.poster_path}
        alt={seasons.name}
        className="h-70 object-contain"
      />
    ) : (
      <div className="h-10 w-10 bg-gray-700 rounded flex items-center justify-center text-sm">
        N/A
      </div>
    )}
    <center>
      <span className="text-lg text-gray-300">{seasons.name}</span>
    </center>
  </div>
);

const CastItem = ({ cast }) => (
  <div>
    <div className="flex gap-15 pb-3">
      {cast &&
        Array.isArray(cast) &&
        cast.map((cast, i) => (
          <div key={i} className="shrink-0 mt-3">
            <Card title={cast.name} image={cast.profile_path} isCircle />
            <center>
              <p className="mt-5 text-lg font-semibold">{cast.name}</p>
              <p className="mt-1 text-sm text-gray-300 font-semibold">
                {cast.job || cast.character}
              </p>
            </center>
          </div>
        ))}
    </div>
  </div>
);

const WatchOn = ({ flatrate, rent, buy, ads }) => {
  if (flatrate.length === 0 && rent.length === 0 && buy.length === 0) {
    return <p className="text-gray-400">Not available for streaming</p>;
  }

  return (
    <div className="">
      {flatrate.length > 0 && (
        <>
          <h3 className="mb-2 text-green-400">Included with subscription</h3>
          <div className="flex gap-4">
            {flatrate.map((p, i) => (
              <a
                key={i}
                target=" "
                href={`https://www.google.com/search?q=${p.provider_name}`}
              >
                <img
                  src={imgBaseUrl + p.logo_path}
                  alt={p.provider_name}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                />
              </a>
            ))}
          </div>
        </>
      )}

      {rent.length > 0 && (
        <>
          <h3 className="mt-4 mb-2 text-yellow-400">Rent</h3>
          <div className="flex gap-4">
            {rent.map((p, i) => (
              <a
                key={i}
                target=" "
                href={`https://www.google.com/search?q=${p.provider_name}`}
              >
                <img
                  src={imgBaseUrl + p.logo_path}
                  alt={p.provider_name}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                />
              </a>
            ))}
          </div>
        </>
      )}

      {buy.length > 0 && (
        <>
          <h3 className="mt-4 mb-2 text-blue-400">Buy</h3>
          <div className="flex gap-4">
            {buy.map((p, i) => (
              <a
                key={i}
                target=" "
                href={`https://www.google.com/search?q=${p.provider_name}`}
              >
                <img
                  src={imgBaseUrl + p.logo_path}
                  alt={p.provider_name}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                />
              </a>
            ))}
          </div>
        </>
      )}

      {ads?.length > 0 && (
        <>
          <h3 className="mt-4 mb-2 text-purple-400">Free with Ads</h3>
          <div className="flex gap-4">
            {ads.map((p, i) => (
              <a
                key={i}
                target=" "
                href={`https://www.google.com/search?q=${p.provider_name}`}
              >
                <img
                  src={imgBaseUrl + p.logo_path}
                  alt={p.provider_name}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                />
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MediaExtraInfo;
