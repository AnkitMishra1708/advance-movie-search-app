import Api from "../Helper/Api.jsx";

const AddReviews = async (payload) => Api.post(`review/add-review`, payload);

const RemoveReview = async (reviewId) =>
  Api.post(`review/${reviewId}/remove-review`);

const GetReview = async (type, mediaId) =>
  Api.get(`review/get-review/${type}/${mediaId}`);

const GetMyReview = async () => Api.get(`review/get-my-review`);

export { AddReviews, RemoveReview, GetReview, GetMyReview };
