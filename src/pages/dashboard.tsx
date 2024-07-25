import React from "react";
import Image from "next/image";
import AddImage from "../../public/addimage.webp";
import AddButton from "../../public/add.svg";
import Apple from "../../public/apple.svg";
import PlayStore from "../../public/playstore.svg";
import Account from "../../components/dashboardcards/Account";
import Accountcard from "../../components/dashboardcards/Accountcard";
import useModal from "../../hooks/useModal";

const Dashboard: React.FC = () => {
  const { isModalOpen, toggleModal } = useModal();

  return (
    <div className="min-h-screen bg-gray w-full mob:no-scrollbar">
      {/* Navbar */}
      <div className="flex items-center justify-between px-40 py-11 mob:px-4 mob:py-8 tab:px-4 tab:py-8">
        <p className="text-darkbrown font-bold leading-10 text-[38px] cursor-pointer">
          Grounds
        </p>
        <p className="cursor-pointer text-base font-semibold leading-5 text-black">
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
                <Image
                  alt="ProfileImage"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover"
                  src={AddImage}
                />
              </div>
              <Image
                src={AddButton}
                alt="Add Button"
                width={24}
                height={24}
                className="ml-[-49px] mt-[68px] z-[1] cursor-pointer mob:ml-[69px] mob:mt-[-48px] tab:ml-[70px] tab:mt-[-48px]"
              />
              <p className="text-xl font-semibold leading-7 text-brown">
                Welcome
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
            <Account email="email@gmail.com" onEdit={toggleModal} />
          </div>
          {isModalOpen && <Accountcard onClose={toggleModal} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
