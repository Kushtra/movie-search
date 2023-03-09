import axios from '@/libs/axios';
import { HTTPStatus } from '@/constants';

export const apiUpdateRating = async (id, oldRating, newRating) => {
  const { status } = await axios.put(`/api/uma/${id}/rating`, { rating: newRating });
  return status === HTTPStatus.OK ? newRating : oldRating;
};

export const apiUpdateWatched = async (id, watched) => {
  const { status } = await axios.put(`/api/uma/${id}/watched`, { watched });
  return status === HTTPStatus.OK ? watched : !watched;
};

export const apiUpdateWatchLater = async (id, watchLater) => {
  const { status } = await axios.put(`/api/uma/${id}/watchLater`, { watchLater });
  return status === HTTPStatus.OK ? watchLater : !watchLater;
};

export const apiUpdateReview = async (id, oldReview, newReview) => {
  const { status } = await axios.put(`/api/uma/${id}/review`, { review: newReview });
  return status === HTTPStatus.OK ? newReview : oldReview;
};
