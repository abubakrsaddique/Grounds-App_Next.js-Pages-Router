import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";

import { Button } from "@/components/ui/Button";

import Close from "@/public/videomodalclose.svg";
import useEditProfile from "../../hooks/useEditProfile";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../../Firebase";
import { useAuthContext } from "@/context/AuthContext";

interface ProfileCardProps {
  onClose: () => void;
  refetchProfile: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  onClose,
  refetchProfile,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    lengthUnit,
    weightUnit,
    feetInches,
    cmValue,
    height,
    age,
    weight,
    selectedGoal,
    selectedMeal,
    kgValue,
    lbsValue,
    setAge,
    setHeight,
    setLengthUnit,
    setFeetInches,
    setCmValue,
    setWeightUnit,
    setKgValue,
    setLbsValue,
    handleLengthUnitChange,
    handleWeightUnitChange,
    handleFeetInputChange,
    handleInchesInputChange,
    handleCmInputChange,
    handleKgInputChange,
    handleLbsInputChange,
    handleGoalChange,
    handleMealChange,
    formatHeight,
    formatWeight,
  } = useEditProfile();

  const { user } = useAuthContext();

  const mutation = useMutation(
    async () => {
      if (!user) {
        throw new Error("User is not authenticated");
      }

      const userDocRef = doc(firestore, `users/${user.uid}`);
      const profileData = {
        age,
        height: formatHeight(),
        weight: formatWeight(),
        selectedGoal,
        selectedMeal,
      };

      await setDoc(userDocRef, profileData, { merge: true });
    },
    {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        refetchProfile();
        onClose();
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update profile");
      },
      onSettled: () => {
        setLoading(false);
      },
    }
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        const userDocRef = doc(firestore, `users/${user.uid}`);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAge(data.age || 0);

          if (data.height) {
            const heightStr = data.height;
            if (heightStr.includes("ft")) {
              const [feet, inches] = heightStr.split("ft");
              setLengthUnit("ft");
              setFeetInches({
                feet: feet || "",
                inches: inches.replace("inch", "") || "",
              });
              setHeight([feet || "", inches.replace("inch", "") || ""]);
            } else if (heightStr.includes("cm")) {
              setLengthUnit("cm");
              setCmValue(heightStr.replace("cm", ""));
              setHeight([heightStr.replace("cm", ""), null]);
            }
          }

          if (data.weight) {
            const weightStr = data.weight;
            if (weightStr.includes("kg")) {
              setWeightUnit("kg");
              setKgValue(weightStr.replace("kg", ""));
            } else if (weightStr.includes("lbs")) {
              setWeightUnit("lbs");
              setLbsValue(weightStr.replace("lbs", ""));
            }
          }
          handleGoalChange(data.selectedGoal || "");
          handleMealChange(data.selectedMeal || 0);
        }
      }
    };
    fetchProfileData();
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    mutation.mutate();
  };

  return (
    <div className="bg-black w-screen top-0 fixed right-0 h-screen z-50 bg-opacity-50">
      <div className="fixed top-0 right-0 h-full overflow-y-auto no-scrollbar max-w-md bg-darkgray rounded-tl-3xl rounded-bl-3xl z-50 p-5">
        <div className="w-full px-5 pb-5 mob:pl-12 mob:pr-1">
          <div className="h-full w-full flex items-center ">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex justify-end w-full">
                <Image
                  src={Close}
                  alt=""
                  className="h-6 w-6 cursor-pointer border-2 border-lightbrown border-opacity-15"
                  onClick={onClose}
                />
              </div>
              <p className="text-darkbrown mb-4 font-semibold flex text-2xl">
                Edit My Profile
              </p>
              <input
                required
                name="age"
                type="number"
                min="0"
                placeholder="Age"
                className="mb-3 w-full rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black remove-arrow"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <div className="my-7 flex w-full h-12 items-center justify-center gap-2 rounded-3xl bg-primary p-4">
                {lengthUnit === "ft" && (
                  <>
                    <input
                      required
                      name="feet"
                      type="number"
                      placeholder="Feet"
                      className="w-[90px] rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black remove-arrow"
                      value={feetInches.feet}
                      onChange={handleFeetInputChange}
                    />
                    <input
                      required
                      name="inches"
                      type="number"
                      placeholder="Inches"
                      className="w-[90px] rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black remove-arrow"
                      value={feetInches.inches}
                      onChange={handleInchesInputChange}
                    />
                  </>
                )}
                {lengthUnit === "cm" && (
                  <input
                    required
                    name="cm"
                    type="number"
                    placeholder="Height (cm)"
                    className="w-full -mx-4 rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black remove-arrow"
                    value={cmValue}
                    onChange={handleCmInputChange}
                  />
                )}

                <div className="flex gap-2 ml-4">
                  <div
                    className={`flex h-9 w-16 cursor-pointer items-center justify-center rounded-2xl ${
                      lengthUnit === "cm"
                        ? "bg-primary text-darkbrown"
                        : "bg-[#1E2534] text-primary"
                    }`}
                    onClick={() => handleLengthUnitChange("ft")}
                  >
                    Ft
                  </div>
                  <div
                    className={`flex h-9 w-16 cursor-pointer items-center justify-center rounded-2xl ${
                      lengthUnit === "ft"
                        ? "bg-primary text-darkbrown"
                        : "bg-[#1E2534] text-primary"
                    }`}
                    onClick={() => handleLengthUnitChange("cm")}
                  >
                    Cm
                  </div>
                </div>
              </div>
              <div className="my-7 flex w-full h-12 justify-center items-center gap-2 rounded-3xl bg-primary">
                {weightUnit === "lbs" && (
                  <input
                    required
                    name="weightLbs"
                    type="number"
                    placeholder="Weight (lbs)"
                    className="w-full rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black remove-arrow"
                    value={lbsValue}
                    onChange={handleLbsInputChange}
                  />
                )}
                {weightUnit === "kg" && (
                  <input
                    required
                    name="weightKg"
                    type="number"
                    placeholder="Weight (kg)"
                    className="w-full rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black remove-arrow"
                    value={kgValue}
                    onChange={handleKgInputChange}
                  />
                )}

                <div className="mr-1 flex h-12 w-32 items-center rounded-3xl bg-primary">
                  <div
                    className={`ml-1 flex h-9 w-16 cursor-pointer items-center justify-center rounded-3xl ${
                      weightUnit === "kg"
                        ? "bg-primary text-darkbrown"
                        : "bg-[#1E2534] text-primary"
                    }`}
                    onClick={() => handleWeightUnitChange("lbs")}
                  >
                    Lbs
                  </div>
                  <div
                    className={`mr-1 flex h-9 w-16 cursor-pointer items-center justify-center rounded-3xl ${
                      weightUnit === "lbs"
                        ? "bg-primary text-darkbrown"
                        : "bg-[#1E2534] text-primary"
                    }`}
                    onClick={() => handleWeightUnitChange("kg")}
                  >
                    Kg
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold text-darkbrown font-semi mb-4 text-2xl">
                  Goal
                </div>
                <label
                  className={`mb-4 flex h-12 cursor-pointer items-center justify-between rounded-3xl ${
                    selectedGoal === "lose"
                      ? "bg-primary text-white"
                      : "bg-primary"
                  } px-5 py-4`}
                  onClick={() => handleGoalChange("lose")}
                >
                  <span>Lose Weight</span>
                  <div
                    className={`h-4 w-4 rounded-full border-2 border-lightbrown ${
                      selectedGoal === "lose" ? "bg-lightgreen border-none" : ""
                    }`}
                  ></div>
                </label>
                <label
                  className={`mb-4 flex h-12 cursor-pointer items-center justify-between rounded-3xl ${
                    selectedGoal === "maintain"
                      ? "bg-primary text-white"
                      : "bg-primary"
                  } px-5 py-4`}
                  onClick={() => handleGoalChange("maintain")}
                >
                  <span>Maintain Weight</span>
                  <div
                    className={`h-4 w-4 rounded-full border-2 border-lightbrown ${
                      selectedGoal === "maintain"
                        ? "bg-lightgreen border-none"
                        : ""
                    }`}
                  ></div>
                </label>
                <label
                  className={`mb-4 flex h-12 cursor-pointer items-center justify-between rounded-3xl ${
                    selectedGoal === "gain"
                      ? "bg-primary text-white"
                      : "bg-primary"
                  } px-5 py-4`}
                  onClick={() => handleGoalChange("gain")}
                >
                  <span>Gain Weight</span>
                  <div
                    className={`h-4 w-4 rounded-full border-2 border-lightbrown ${
                      selectedGoal === "gain" ? "bg-lightgreen border-none" : ""
                    }`}
                  ></div>
                </label>
                <label
                  className={`mb-4 flex h-12 cursor-pointer items-center justify-between rounded-3xl ${
                    selectedGoal === "explore"
                      ? "bg-primary text-white"
                      : "bg-primary"
                  } px-5 py-4`}
                  onClick={() => handleGoalChange("explore")}
                >
                  <span>Just Exploring</span>
                  <div
                    className={`h-4 w-4 rounded-full border-2 border-lightbrown ${
                      selectedGoal === "explore"
                        ? "bg-lightgreen border-none"
                        : ""
                    }`}
                  ></div>
                </label>
              </div>
              <div>
                <p className="font-semibold text-darkbrown font-semi text-2xl">
                  Daily Meal Amount
                </p>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <div
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xs font-semibold ${
                      selectedMeal === "3"
                        ? "bg-[#1E2534] text-primary"
                        : "bg-primary"
                    }`}
                    onClick={() => handleMealChange("3")}
                  >
                    3
                  </div>
                  <div
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xs font-semibold ${
                      selectedMeal === "4"
                        ? "bg-[#1E2534] text-primary"
                        : "bg-primary"
                    }`}
                    onClick={() => handleMealChange("4")}
                  >
                    4
                  </div>
                  <div
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xs font-semibold ${
                      selectedMeal === "5"
                        ? "bg-[#1E2534] text-primary"
                        : "bg-primary"
                    }`}
                    onClick={() => handleMealChange("5")}
                  >
                    5
                  </div>
                  <div
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xs font-semibold ${
                      selectedMeal === "6"
                        ? "bg-[#1E2534] text-primary"
                        : "bg-primary"
                    }`}
                    onClick={() => handleMealChange("6")}
                  >
                    6
                  </div>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                type="submit"
                disabled={loading}
                className="hover:bg-darkbrown"
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <span className="relative z-10">Save Changes</span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
