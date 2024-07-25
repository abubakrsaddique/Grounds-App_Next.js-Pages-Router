import Link from "next/link";
import Image1 from "../../public/login.webp";
import Image from "next/image";
import SignUpImage1 from "../../public/signup1.svg";
import BackArrow from "../../public/backarrow.svg";
import Apple from "../../public/apple.svg";
import PlayStore from "../../public/playstore.svg";
import InstantAccess from "../../public/instantaccess.svg";
import CheckoutCards from "../../components/cards/Checkoutcards";
import Trainercard from "../../components/cards/Trainercard";
import { Button } from "../../components/ui/Button";

const Checkout = () => {
  return (
    <div className="min-h-screen w-full  bg-gray">
      <div className="flex flex-row mob:flex-col-reverse tab:flex-col-reverse">
        {/* Left Side */}
        <div className="no-scrollbar justify-center relative flex w-[40%] mob:w-full tab:w-full">
          <div className="w-full realtive">
            <div className="h-screen overflow-scroll mt-0 block">
              <div className="flex h-10 w-10 cursor-pointer items-center mt-8 ml-8 justify-center rounded-xl border-[3px] border-darkbrown border-opacity-[0.1] mob:hidden tab:hidden">
                <Link href="/login">
                  {" "}
                  <Image src={BackArrow} alt="" />
                </Link>
              </div>
              <div>
                <p className=" text-[18px] font-normal leading-4 text-lightbrown mt-12 w-[70%] mx-auto mob:mx-8">
                  Already have an account?
                  <Link href="/login">
                    <span className="cursor-pointer  font-medium text-lightgreen underline ">
                      Log In
                    </span>
                  </Link>
                </p>
                <div className="relative pl-5 w-[70%] mx-auto mob:w-[90%] mob:pl-0">
                  <div className="absolute left-0 top-8 h-full border border-dashed border-lightgreen mob:hidden"></div>
                  <p className="text-darkbrown -ml-9 mt-10 flex items-center gap-2 text-2xl font-bold mob:-ml-1 mob:text-xl">
                    <Image src={SignUpImage1} alt="" className="text-2xl" />
                    Select Subscription Plan
                  </p>

                  {/* Checkout Card */}
                  <CheckoutCards />
                  {/* Trainer Card */}
                  <Trainercard />
                </div>
                <div className="px-[18%] relative mob:px-[6%]">
                  <Link href="/signup">
                    {" "}
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-lightgreen hover:bg-brown transition-colors duration-500 "
                    >
                      Continue To Create Account
                    </Button>
                  </Link>
                  <p className="mt-5 text-center text-xs font-light leading-5 mob:pb-6">
                    This subscription is billed annually at $99.99/year and
                    <br />
                    recurring
                    <br />
                    unless cancelled.
                    <br />
                    <br />
                    <span>
                      <a className="underline cursor-pointer">Privacy Policy</a>{" "}
                      |{" "}
                      <a className="underline cursor-pointer">
                        Terms of service
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* For Mobile */}
        <div className="relative block w-[60%] mob:w-full lg:w-[60%] tab:w-full">
          <div className="absolute left-5 top-5 hidden tab:block mob:block">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[3px] border-darkbrown border-opacity-[0.1]">
              <Link href="/login">
                {" "}
                <Image src={BackArrow} alt="" />
              </Link>
            </div>
          </div>
          <div className="absolute right-14 top-9 flex items-center  gap-4 mob:hidden">
            <div className="relative z-[100] text-primary cursor-pointer overflow-hidden flex h-11 w-24 items-center justify-center rounded-3xl text-base font-medium ">
              <Link href="/">
                {" "}
                <span className="relative z-10 tab:hidden mob:hidden">
                  Home
                </span>
              </Link>
            </div>
            <div className="relative z-[100] cursor-pointer overflow-hidden flex h-11 w-24 items-center justify-center rounded-3xl bg-primary text-base font-medium  hover:text-primary mob:hidden tab:hidden hover:bg-brown">
              <Link href="/login">
                <Button
                  variant="default"
                  size="default"
                  className="bg-primary text-black hover:bg-darkbrown hover:text-primary"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
          <Image
            width="3392"
            height="4096"
            decoding="async"
            data-nimg="1"
            className="h-screen w-full object-cover rounded-tl-[40px] mob:h-[400px] tab:h-[40vh] mob:rounded-none tab:rounded-none"
            src={Image1}
            alt=""
          />
          <div className="absolute left-[50%] top-[50%] -mt-14 mob:mt-0 w-full translate-x-[-50%] translate-y-[-50%]">
            <h1 className="text-center text-5xl font-extrabold leading-[64px] text-primary mob:text-3xl tab:text-3xl">
              Start Your 7-Day
              <br />
              <span className="relative flex flex-col items-center">
                FREE Trial
                <Image
                  src={InstantAccess}
                  alt=""
                  className="mob:w-[200px] tab:w-[220px] w-"
                />
              </span>
            </h1>
            <p className="mt-6 text-center text-base font-light leading-6 text-primary mob:flex mob:flex-col mob:text-sm tab:flex tab:flex-col tab:text-sm">
              Register now for the Grounds app and get
              <span className="font-semibold"> INSTANT ACCESS!</span>
            </p>
          </div>
          <div className="absolute bottom-16 left-[50%] z-[10] translate-x-[-50%]  items-center gap-4 ">
            <div className="flex items-center gap-6 mob:hidden tab:hidden cursor-pointer">
              <Image src={Apple} alt="" />
              <Image src={PlayStore} alt="" />
            </div>
          </div>
          <div className="bg-gradient-to-b from-custom-hsla1 via-custom-hsla2 to-custom-f2eee6 absolute bottom-0 z-[1] h-[350px] w-full opacity-90 "></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
