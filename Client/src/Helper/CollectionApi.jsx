import api from "../Helper/Api.jsx";

export const createCollectionApi = (payload) =>
  api.post(`/collection/create-collection`, payload);

export const getMyCollections = () => api.get("/collection/get-collection");

export const addToCollection = (collectionId, payload) =>
  api.post(`/collection/${collectionId}/add-to-collection`, payload);

export const removeFromCollection = (collectionId, payload) =>
  api.post(`/collection/${collectionId}/remove-from-collection`, payload);

export const deleteCollection = (collectionId) =>
  api.delete(`/collection/${collectionId}/delete-collection`);
