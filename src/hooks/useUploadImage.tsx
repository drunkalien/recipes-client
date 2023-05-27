import { useState } from "react";

export const useUploadImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  function removeImage() {
    setImageUrl("");
  }

  const onSuccess = (res: any) => {
    if (res.url) {
      setImageUrl(res.url);
      setIsImageLoading(false);
    }
  };

  const onUploadStart = () => {
    setIsImageLoading(true);
  };

  const onError = () => {
    setIsImageLoading(false);
  };

  return {
    imageUrl,
    isImageLoading,
    removeImage,
    onSuccess,
    onUploadStart,
    onError,
  };
};
