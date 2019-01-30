import config from '../config';

const initialState = {
  photosLoading: false,
  photoLoading: false,
  photos: [],
  photo: {},
};

export function gallery(state = initialState, action) {
  switch (action.type) {
    case 'GALLERY/FETCH_PHOTOS':
      return {
        ...state,
        photosLoading: true,
      };
    case 'GALLERY/FETCH_PHOTOS_SUCCESS':
      return {
        ...state,
        photosLoading: false,
        photos: action.payload,
      };
    case 'GALLERY/FETCH_PHOTO':
      return {
        ...state,
        photoLoading: true,
      };
    case 'GALLERY/FETCH_PHOTO_SUCCESS':
      return {
        ...state,
        photoLoading: false,
        photo: action.payload,
      };
    case 'GALLERY/FETCH_PHOTO_FAILED':
      return {
        ...state,
        photoLoading: false,
      };
    default:
      return state;
  }
}
