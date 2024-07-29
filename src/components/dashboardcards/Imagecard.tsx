import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "@/context/AuthContext";
import Close from "@/public/close.png";
import PIImage from "@/public/piimage.svg";

import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, firestore } from "../../../Firebase";

interface ProfileImageProps {
  onClose: () => void;
  onImageUpdate: () => void;
}

const ImageCard: React.FC<ProfileImageProps> = ({ onClose, onImageUpdate }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { data: user } = useAuth();

  useEffect(() => {
    const fetchCurrentImage = async () => {
      if (user) {
        try {
          const userDocRef = doc(firestore, `users/${user.uid}`);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.profileImage) {
              setPreviewUrl(userData.profileImage);
            }
          }
        } catch (error) {
          console.error("Error fetching current image:", error);
        }
      }
    };

    fetchCurrentImage();
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSave = async () => {
    if (selectedImage && user) {
      setIsUploading(true);
      try {
        const imageRef = ref(
          storage,
          `profileImages/${user.uid}/${selectedImage.name}`
        );
        await uploadBytes(imageRef, selectedImage);
        const imageUrl = await getDownloadURL(imageRef);

        const userDocRef = doc(firestore, `users/${user.uid}`);
        await updateDoc(userDocRef, { profileImage: imageUrl });

        toast.success("Image uploaded successfully!");
        onImageUpdate();
        onClose();
      } catch (error) {
        toast.error("Error uploading image.");
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

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
              className="inline-flex justify-center"
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
            <div className="w-[350px] relative h-[40vh] bg-black flex justify-center items-center rounded-xl">
              <Image
                src={previewUrl || PIImage}
                alt="Profile"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <br />
            <input
              id="image-upload"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="flex w-[100%] justify-between items-center">
              <label
                htmlFor="image-upload"
                className="bg-brown flex justify-center items-center rounded-full w-[47%] h-14 mb-3 mt-6 py-3 cursor-pointer text-primary font-semibold text-base leading-6"
              >
                Select Image
              </label>
              <button
                className="bg-brown flex justify-center items-center rounded-full w-[47%] h-14 mb-3 mt-6 py-3 cursor-pointer text-primary font-semibold text-base leading-6"
                onClick={handleSave}
                disabled={isUploading}
              >
                {isUploading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
