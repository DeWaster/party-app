export const fetchPhotos = () => ({
  type: 'GALLERY/FETCH_PHOTOS',
});

export const fetchPhotosSuccess = photos => ({
  type: 'GALLERY/FETCH_PHOTOS_SUCCESS',
  payload: photos,
});

export const fetchPhotosFailed = () => ({
  type: 'SHOW_ERROR',
  payload: 'Kuvien haku epäonnistui',
});

export const fetchPhoto = sharecode => ({
  type: 'GALLERY/FETCH_PHOTO',
  payload: sharecode,
});

export const fetchPhotoSuccess = photo => ({
  type: 'GALLERY/FETCH_PHOTO_SUCCESS',
  payload: photo,
});

export const fetchPhotoFailed = () => ({
  type: 'SHOW_ERROR',
  payload: 'Kuvan haku epäonnistui',
});
