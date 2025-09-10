import { Avatar } from "antd";
import React, { useState, useEffect } from "react";
// import { useRequest } from "../../hooks/useRequest";
// import { imageUploadRoute } from "../../repositories";

interface ProfileimgProps {
  onChange?: (e: any) => void;
  initialImgSrc?: string;
  sizeText?: string;
}

const ImageUploader = ({
  onChange,
  initialImgSrc,
  sizeText,
}: ProfileimgProps) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  console.log(sizeText, "sizeText");

  // const { execute } = useRequest(
  //   imageUploadRoute.url,
  //   imageUploadRoute.method,
  //   {
  //     type: "delay",
  //   }
  // );

  const onFileChange = (event: any) => {
    const file = event.target.files?.[0];
    onChange?.(event.target.files[0]);
    if (file) {
      const img = new Image();
      const objectURL = URL.createObjectURL(file);
      setImgSrc(objectURL);
      img.src = objectURL;
    }

    // execute({
    //   body: {
    //     image: event.target.files[0],
    //     mode: "single",
    //   },
    //   body_type: "formData",
    //   cbSuccess: (res) => {
    //     // @ts-ignore
    //     onChange?.(res?.data?.attachment);
    //     console.log(res);
    //   },
    // });
  };

  useEffect(() => {
    if (initialImgSrc) {
      setImgSrc(initialImgSrc);
    }
  }, [initialImgSrc]);

  return (
    <div className="text-center mx-auto">
      <label>
        {imgSrc ? (
          <Avatar
            size={60}
            src={imgSrc}
            alt="Profile"
            className="cursor-pointer"
          />
        ) : (
          <Avatar
            size={60}
            className="mx-auto cursor-pointer"
            src="/images/uploader.png"
            alt="Upload icon"
          />
        )}
        <input className="!hidden" type="file" onChange={onFileChange} />
      </label>
      <p className="inter-regular text-gray-500 text-xs mt-3">{sizeText}</p>
    </div>
  );
};

export default React.memo(ImageUploader);
