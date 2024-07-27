import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BannerImage1 from "../../public/banner1.svg";
import Close from "../../public/close.png";
import VideoSvg from "../../public/video.svg";
import BannerImage2 from "../../public/banner2.svg";
import Arrow from "../../public/arrow.svg";
import InstantAccess from "../../public/instantaccess.svg";
import Drawer from "../../components/banner/Drawer";
import useModal from "../../hooks/useModal";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

const Banner: React.FC = () => {
  const { isModalOpen, toggleModal } = useModal();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { data: user } = useAuth();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    toggleModal();
  };

  return (
    <div className="relative h-full min-h-screen w-full bg-gray py-10">
      <video
        className="absolute top-0 h-full w-full object-cover mob:h-[70vh] tab:h-[72vh] rounded-b-3xl"
        src="/banner.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <Image
        src={VideoSvg}
        alt="Play Video"
        onClick={toggleModal}
        className="absolute left-[50%] top-[45%] tab:mt-[25%] z-10 h-auto w-[100px] translate-x-[-50%] translate-y-[-50%] cursor-pointer transition-transform hover:scale-110"
      />
      {/* Main Screen */}
      <div className="relative top-0 h-full w-full px-28">
        {/* Nav_Bar */}
        <nav className="flex relative mob:hidden tab:hidden rounded-[77px] w-full h-[74px] items-center justify-between px-[50px] bg-gray py-4">
          <div>
            <p className="text-3xl font-bold leading-[45px] text-darkbrown cursor-pointer">
              GROUNDS
            </p>
          </div>
          <div className="flex justify-center items-center cursor-pointer">
            <Link href="/">
              <p className="z-[10] mr-9 text-base font-medium leading-6 text-darkbrown">
                Home
              </p>
            </Link>
            <Link href="/">
              <p className="z-[10] mr-9 text-base font-medium leading-6 text-darkbrown">
                Coaches
              </p>
            </Link>

            <Link href="/">
              <p className="z-[10] mr-9 text-base font-medium leading-6 text-darkbrown">
                Pricing
              </p>
            </Link>

            <Link href="/">
              <p className="z-[10] mr-9 text-base font-medium leading-6 text-darkbrown">
                Programs
              </p>
            </Link>

            <Link href="/">
              <p className="z-[10] mr-9 text-base font-medium leading-6 text-darkbrown">
                Support
              </p>
            </Link>
          </div>
          {user ? (
            <Link href="/dashboard">
              <Button variant="default" className="px-14">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="default">Login</Button>
            </Link>
          )}
        </nav>
        <Drawer menuOpen={menuOpen} toggleMenu={toggleMenu} />
        {/* For Mobile */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-end justify-center bg-gray bg-opacity-75">
            <div className="z-[200] h-full min-w-full bg-primary">
              <div className="relative h-full py-14 mob:py-0 tab:py-0">
                <button
                  className="absolute top-8 tab:top-16 mob:top-16 mob:text-primary tab:text-primary left-6 cursor-pointer"
                  onClick={toggleModal}
                >
                  <Image src={Close} alt="Close" className="w-[10%]" />
                </button>
                <div className="my-8 mx-16 mob:my-0 mob:mx-0 tab:mx-0 tab:my-0 mob:relative mob:z-[-1] tab:relative tab:z-[-1]">
                  <iframe
                    className="w-full h-[70vh] mob:h-screen tab:h-screen"
                    src="https://www.youtube.com/embed/4hLgD_vPrgY?si=oXuBOH-PFV4HdmTW"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Main Heading */}
        <div className="grid min-h-[82vh] items-center mob:flex mob:flex-row-reverse mob:pt-[325%] tab:flex tab:pt-[136%]">
          <div className="flex h-full flex-col mt-20 justify-center mob:mr-7 tab:-ml-14">
            <h1 className="text-7xl flex flex-col font-bold text-primary mob:text-5xl mob:-mt-5 mob:text-darkbrown tab:text-5xl tab:text-darkbrown">
              <span className="pb-4 mob:pb-2 tab:pb-2">Stand</span>
              <span className="pb-4 mob:pb-2 tab:pb-2">Your</span>
              <span className="pb-4 mob:pb-2 tab:pb-2">Ground</span>
            </h1>
            <p className="mt-6 text-xl font-normal text-primary mob:text-sm mob:text-lightbrown mob:mt-3 tab:mt-3 tab:text-lightbrown mob:w-[111%]">
              <span>
                Register now for the Grounds app
                <br />
                and get{" "}
              </span>
              <span className="relative text-xl font-bold leading-8 mob:text-xl mob:text-darkbrown tab:text-darkbrown">
                INSTANT ACCESS!
                <Image
                  src={InstantAccess}
                  alt="Instant Access"
                  className="absolute -right-[2px] w-full mob:text-black"
                />
              </span>
            </p>
            <div>
              <Button
                variant="primary"
                size="base"
                className="mob:mt-4 tab:mt-4"
              >
                Start Your Free Trial
                <Image src={Arrow} alt="Arrow" />
              </Button>
            </div>
            <div className="mt-9 flex items-center gap-4 mob:mt-4">
              <div className="flex gap-2">
                <Image src={BannerImage1} alt="Banner 1" />
                <Image src={BannerImage2} alt="Banner 2" />
              </div>
              <div>
                <p className="text-sm font-medium leading-6 text-primary mob:text-xs mob:ml-4 mob:text-lightbrown tab:text-lightbrown">
                  Compatible with <br />
                  <span className="text-primary mob:text-brown tab:text-brown">
                    Apple Health & Google Fit
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
