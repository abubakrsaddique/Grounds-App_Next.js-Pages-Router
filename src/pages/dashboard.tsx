import { NextPage } from "next";
import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import AddImage from "../../public/addimage.webp";
import AddButton from "../../public/add.svg";
import Apple from "../../public/apple.svg";
import PlayStore from "../../public/playstore.svg";
import Account from "../../components/dashboardcards/Account";
import Profile from "../../components/dashboardcards/Profile";
import Plan from "../../components/dashboardcards/Plan";
import AccountCard from "../../components/dashboardcards/Accountcard";
import ProfileCard from "../../components/dashboardcards/Profilecard";
import ImageCard from "../../components/dashboardcards/Imagecard";
import useModal from "../../hooks/useModal";
import Payment from "../../components/dashboardcards/Payment";
import { useRouter } from "next/router";
import { firestore, auth } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useAuth } from "../../hooks/useAuth";
import PrivateLayout from "../../components/layouts/private/PrivateLayout";

const fetchProfileData = async (uid: string) => {
  const userDocRef = doc(firestore, `users/${uid}`);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  throw new Error("Profile data not found");
};

const Dashboard: NextPage = () => {
  const {
    isModalOpen,
    modalType,
    openModal,
    closeModal,
    isImageCardOpen,
    openImageCard,
    closeImageCard,
  } = useModal();
  const router = useRouter();
  const { firstName, email } = router.query;

  const { data: user, refetch: refetchUser } = useAuth();

  const {
    data: profileData,
    refetch,
    isError,
  } = useQuery(
    ["profileData", user?.uid],
    () =>
      user?.uid ? fetchProfileData(user.uid) : Promise.reject("No user UID"),
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  useEffect(() => {
    if (!user) {
      refetchUser();
    }
  }, [user, refetchUser]);

  const handleImageUpdate = () => {
    refetch();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isError) return <p>Error fetching profile data.</p>;

  return (
    <div className="min-h-screen bg-gray w-full mob:no-scrollbar">
      {/* Navbar */}
      <div className="flex items-center justify-between px-40 py-11 mob:px-4 mob:py-8 tab:px-4 tab:py-8">
        <Link href="/">
          <p className="text-darkbrown font-bold leading-10 text-[38px] cursor-pointer">
            Grounds
          </p>
        </Link>
        <p
          className="cursor-pointer text-base font-semibold leading-5 text-black"
          onClick={handleLogout}
        >
          Log out
        </p>
      </div>
      {/* Main Container */}
      <div className="mx-auto max-w-[60rem] px-5">
        {/* Profile Picture */}
        <div className="mb-20 mt-5">
          <div className="flex items-center justify-between flex-row mob:flex-col tab:flex-col">
            <div className="flex items-center gap-6 flex-row mob:flex-col tab:flex-col">
              <div className="relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full">
                {profileData?.profileImage ? (
                  <Image
                    src={profileData.profileImage}
                    alt="Profile Image"
                    width={96}
                    height={96}
                    className="rounded-full w-[100%] h-[100%]"
                  />
                ) : (
                  <Image
                    src={AddImage}
                    alt="Add Image"
                    width={96}
                    height={96}
                    className="rounded-full cursor-pointer"
                    onClick={openImageCard}
                  />
                )}
              </div>
              <Image
                src={AddButton}
                alt="Add Button"
                width={24}
                height={24}
                onClick={openImageCard}
                className="ml-[-49px] mt-[68px] z-[1] cursor-pointer mob:ml-[69px] mob:mt-[-48px] tab:ml-[70px] tab:mt-[-48px]"
              />
              {isImageCardOpen && (
                <ImageCard
                  onClose={closeImageCard}
                  onImageUpdate={handleImageUpdate}
                />
              )}

              <p className="text-xl font-semibold leading-7 text-brown">
                Welcome , {profileData?.firstName}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-center text-base font-normal leading-5 mt-0 w-[400px] text-lightbrown">
                Download the app below and log in with the same credentials you
                just used to create your account
              </p>
              <div className="mt-5 flex items-center justify-center gap-5 cursor-pointer">
                <Image src={Apple} alt="Apple" width={150} height={50} />
                <Image
                  src={PlayStore}
                  alt="Play Store"
                  width={150}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-8 w-full mob:flex-col tab:flex-col ">
          {/* Left side */}
          <div className="w-[50%] flex flex-shrink-0 flex-col mob:w-full tab:w-full">
            <Account
              email={profileData?.email as string}
              onEdit={() => openModal("account")}
            />
            {isModalOpen && modalType === "account" && (
              <AccountCard onClose={closeModal} />
            )}

            {profileData && (
              <Profile
                age={profileData.age || "Not Provided"}
                height={profileData.height || "Not Provided"}
                weight={profileData.weight || "Not Provided"}
                goals={profileData.selectedGoal || ""}
                dailyMealAmount={parseInt(profileData.selectedMeal) || 0}
                onEdit={() => openModal("profile")}
                refetchProfile={refetch}
              />
            )}
            {isModalOpen && modalType === "profile" && (
              <ProfileCard refetchProfile={refetch} onClose={closeModal} />
            )}
          </div>
          {/* Right Side */}
          <div className="w-[50%] flex-shrink-0 flex flex-col pb-10 mob:w-full mob:pb-10 mob:-mt-10 tab:w-full tab:pb-10 tab:-mt-10">
            <Plan />
            <div className="mt-8"></div>
            <Payment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.privateLayout = function (page: ReactNode) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
