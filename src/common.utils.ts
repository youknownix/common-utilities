export function getMimeType(fileName: string): string | null {
  const extension = fileName.substring(fileName.lastIndexOf('.'));

  let mime: string | null;

  switch (extension) {
    case '.mp4':
      mime = 'video/mp4';
      break;
    case '.mpeg':
      mime = 'video/mpeg';
      break;
    case '.avi':
      mime = 'video/x-msvideo';
      break;
    case '.ogv':
      mime = 'video/ogg';
      break;
    case '.webm':
      mime = 'video/webm';
      break;
    case '.mov':
      mime = 'video/quicktime';
      break;
    case '.jpeg':
    case '.jpg':
    case '.jpe':
      mime = 'image/jpeg';
      break;
    case '.png':
      mime = 'image/png';
      break;
    case '.heic':
      mime = 'image/heic';
      break;
    case '.heif':
      mime = 'image/heif';
      break;
    default:
      mime = null;
  }

  return mime;
}

export function makeCancelablePromise<T>(promise: Promise<T>) {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(val => (hasCanceled_ ? reject(val) : resolve(val)));

    promise.catch(error => (hasCanceled_ ? reject(error) : reject(error)));
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
}
