/* eslint-disable */

export const initializeCastApi = () => {
  return new Promise((resolve, reject) => {
    const { cast, chrome } = window;
    if (cast) {
      const context = cast.framework.CastContext.getInstance();
      context.setOptions({
        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      });
      resolve(context);
    }
  });
};

export const loadMusic = (mediaUrl, contentType) => {
  const { chrome, cast } = window;
  const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  const mediaInfo = new chrome.cast.media.MediaInfo(mediaUrl, contentType);
  const request = new chrome.cast.media.LoadRequest(mediaInfo);
  return castSession.loadMedia(request);
};

export const unloadMusic = () => {};
