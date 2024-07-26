import React from "react";
import Image from "next/image";
import Close from "../../public/close.png";
import PIImage from "../../public/piimage.svg";

interface ProfileImageProps {
  onClose: () => void;
}

const ImageCard: React.FC<ProfileImageProps> = ({ onClose }) => {
  return (
    <div className="bg-black w-screen top-0 fixed right-0 h-screen z-50 bg-opacity-50">
      <div className="fixed right-0 top-0 h-full flex items-center justify-center z-50">
        <div className="w-full max-w-[500px] transform overflow-hidden rounded-tl-2xl rounded-bl-2xl bg-primary h-full p-6 text-left align-middle shadow-xl transition-all opacity-100 scale-100">
          <div className="mt-12 flex justify-between items-center">
            <p className="text-xl font-bold leading-6 text-darkbrown">
              Profile Image
            </p>
            <button
              type="button"
              className="inline-flex justify-center "
              onClick={onClose}
            >
              <Image
                alt="Close"
                src={Close}
                width={24}
                height={24}
                loading="lazy"
                decoding="async"
              />
            </button>
          </div>
          <div className="mt-6">
            <div className="w-[350px] relative h-[40vh] bg-black flex justify-center items-center rounded-xl ">
              <Image
                src={PIImage}
                alt="Default"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <br />
            <input id="image-upload" className="hidden" type="file" />
            <div className="flex w-[100%] justify-between items-center">
              <label
                htmlFor="image-upload"
                className="bg-brown flex justify-center items-center rounded-full w-[47%] h-14 mb-3 mt-6 py-3 cursor-pointer text-primary font-semibold text-base leading-6"
              >
                Select Image
              </label>
              <button className="bg-brown flex justify-center items-center rounded-full w-[47%] h-14 mb-3 mt-6 py-3 cursor-pointer text-primary font-semibold text-base leading-6">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
