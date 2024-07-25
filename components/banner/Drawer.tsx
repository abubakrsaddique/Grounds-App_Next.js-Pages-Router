import React from "react";
import Image from "next/image";
import Close from "../../public/close.png";
import MobileIcon from "../../public/mobileicon.svg";
import Instagram from "../../public/insta.svg";
import Facebook from "../../public/fb.svg";
import Youtube from "../../public/yt.svg";
import Dot from "../../public/dot.svg";
import Apple from "../../public/apple.svg";
import PlayStore from "../../public/playstore.svg";
import useModal from "../../hooks/useModal";

interface DrawerProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ menuOpen, toggleMenu }) => {
  const { toggleModal } = useModal();

  const handleMenuToggle = () => {
    toggleModal();
    toggleMenu();
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 mob:flex tab:flex w-full items-center justify-between px-5 hidden">
        <p className="text-3xl font-bold leading-none text-primary cursor-pointer">
          GROUNDS
        </p>
        <button onClick={toggleModal}>
          <Image src={MobileIcon} alt="Toggle Menu" />
        </button>
      </div>

      <div
        className={`fixed left-0 top-0 z-[999] h-screen w-full transform overflow-x-hidden bg-gray transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px" }}
      >
        <div className="mt-6 flex items-center justify-between px-5">
          <a href="/">
            <p className="text-darkbrown text-3xl font-bold leading-7">
              GROUNDS
            </p>
          </a>
          <button onClick={toggleMenu}>
            <Image alt="closeIcon" src={Close} width={32} height={32} />
          </button>
        </div>
        <div className="mt-16 h-full w-full bg-gray">
          <div className="px-5">
            <div className="flex flex-col gap-8 cursor-pointer">
              <span className="text-2xl font-semibold leading-7 text-darkbrown">
                Home
              </span>
              <span className="text-2xl font-semibold leading-7 text-darkbrown">
                Coaches
              </span>
              <span className="text-2xl font-semibold leading-7 text-darkbrown">
                Pricing
              </span>
              <span className="text-2xl font-semibold leading-7 text-darkbrown">
                Programs
              </span>
              <span className="text-2xl font-semibold leading-7 text-darkbrown">
                Support
              </span>
            </div>

            <div className="mt-12 flex h-[56px] w-full items-center text-primary justify-center rounded-3xl bg-darkbrown text-xl font-bold leading-6">
              Get Started
            </div>

            <p className="mt-4 text-center text-base font-normal text-lightbrown leading-5 ">
              Already have an account?{" "}
              <a className="text-darkbrown underline">Log In</a>
            </p>
          </div>
          <div className="w-full border-t-[0.5px] border-caption opacity-50 my-0 mb-10 mt-10"></div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a className="text-sm font-medium leading-6">
              <Image src={Instagram} alt="Instagram" />
            </a>
            <span className="text-sm font-medium leading-6 ">
              <Image src={Dot} alt="Dot" />
            </span>
            <a className="text-sm font-medium leading-6 ">
              <Image src={Facebook} alt="Facebook" />
            </a>
            <span className="text-sm font-medium leading-6 text-[#302A25]">
              <Image src={Dot} alt="Dot" />
            </span>
            <a className="text-sm font-medium leading-6 ">
              <Image src={Youtube} alt="Youtube" />
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-5">
            <Image src={Apple} alt="Apple Store" />
            <Image src={PlayStore} alt="Play Store" />
          </div>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <div className="absolute top-0 left-0 right-0 mob:flex tab:flex w-full items-center justify-between px-5 hidden">
        <p className="text-3xl font-bold leading-none text-primary cursor-pointer">
          GROUNDS
        </p>
        <button onClick={handleMenuToggle}>
          <Image src={MobileIcon} alt="Toggle Menu" />
        </button>
      </div>
    </>
  );
};

export default Drawer;
