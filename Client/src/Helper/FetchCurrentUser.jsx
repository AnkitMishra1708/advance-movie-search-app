import Api from "./Api";

async function FetchCurrentUser() {
  try {
    const response = await Api.get("/users/current-user", {
      method: "GET",
      credentials: "include",
    });

    return response.data.data;
  } catch (err) {
    console.error("Error fetching current user:", err);
  }
}

async function FetchLogoutUser() {
  try {
    const data = await Api.post("/users/logout");
    return data;
  } catch (err) {
    console.error("Error fetching current user:", err);
  }
}

const toggleWatchedApi = async (mediaId, type) => {
  try {
    const response = await Api.post("/users/mark-as-watched", {
      mediaId,
      type,
    });
    console.log("API RESPONSE:", response.data);
    return response;
  } catch (error) {
    console.error("Error markaswatched:", error);
    throw error;
  }
};

const toggleFavouriteListApi = async ( mediaId, type ) => {
  try {
    const response = await Api.post("/users/favourite-list", { mediaId, type });
    return response;
  } catch (error) {
    console.error("Error favoutite list:", error);
    throw error;
  }
};

const toggleWatchListApi = async (mediaId,type) => {
  try {
    const response = await Api.post("/users/watch-list", { mediaId, type });
    return response;
  } catch (error) {
    console.error("Error watch list:", error);
    throw error;
  }
};

export {
  FetchCurrentUser,
  FetchLogoutUser,
  toggleWatchedApi,
  toggleFavouriteListApi,
  toggleWatchListApi,
};
