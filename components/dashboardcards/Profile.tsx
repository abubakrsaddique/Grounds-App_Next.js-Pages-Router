import React, { useState } from "react";
import Image from "next/image";
import EditButton from "../../public/edit.svg";
import ProfileCard from "./Profilecard";

interface ProfileProps {
  age: number;
  height: string;
  weight: string;
  goals: string;
  dailyMealAmount: number;
  onEdit: () => void;
  refetchProfile: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  age,
  height,
  weight,
  goals,
  dailyMealAmount,
  onEdit,
  refetchProfile,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };
  return (
    <div className="mt-8">
      <div className="pb-12">
        <div className="flex items-center justify-between">
          <h2 className="pl-1.5 text-2xl font-semibold leading-6">
            My Profile
          </h2>
          <Image
            src={EditButton}
            alt="Edit"
            className="cursor-pointer"
            onClick={onEdit}
          />
        </div>
        <div className="mt-4 w-full rounded-3xl bg-primary p-6">
          <div className="flex flex-wrap items-center justify-between">
            <p className="font-semibold leading-4 text-black text-base">Age</p>
            <p className="font-semibold leading-4 text-lightbrown text-base">
              {age}
            </p>
          </div>
          <div className="my-5 w-full border-t border-gray opacity-50"></div>
          <div className="flex flex-wrap items-center justify-between">
            <p className="font-semibold leading-4 text-black text-base">
              Height
            </p>
            <p className="font-semibold leading-4 text-lightbrown text-base">
              {height}
            </p>
          </div>
          <div className="my-5 w-full border-t border-gray opacity-50"></div>
          <div className="flex flex-wrap items-center justify-between">
            <p className="font-semibold leading-4 text-black text-base">
              Weight
            </p>
            <p className="font-semibold leading-4 text-lightbrown text-base">
              {weight}
            </p>
          </div>
          <div className="my-5 w-full border-t border-gray opacity-50"></div>
          <div className="flex flex-wrap items-center justify-between">
            <p className="break-all font-semibold leading-4 text-black text-base">
              Goals
            </p>
            <p className="font-semibold leading-4 text-lightbrown text-base">
              {goals}
            </p>
          </div>
          <div className="my-5 w-full border-t border-gray opacity-50"></div>
          <div className="flex flex-wrap items-center justify-between">
            <p className="font-semibold leading-4 text-black text-base">
              Daily Meal Amount
            </p>
            <p className="font-semibold leading-4 text-lightbrown text-base">
              {dailyMealAmount}
            </p>
          </div>
        </div>
      </div>
      {isEditing && (
        <ProfileCard onClose={handleClose} refetchProfile={refetchProfile} />
      )}
    </div>
  );
};

export default Profile;
