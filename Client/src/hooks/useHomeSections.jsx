import { useEffect, useState } from "react";

export const useHomeSections = (sections) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchSections = async () => {
      for (const section of sections) {
        try {
          setLoading((prev) => ({ ...prev, [section.key]: true }));

          const res = await section.api();          
          
          setData((prev) => ({
            ...prev,
            [section.key]: res,
          }));
        } catch (err) {
          setError((prev) => ({
            ...prev,
            [section.key]: err.message || "Something went wrong",
          }));
        } finally {
          setLoading((prev) => ({ ...prev, [section.key]: false }));
        }
      }
    };

    fetchSections();
  }, [sections]);

  return { data, loading, error };
};
