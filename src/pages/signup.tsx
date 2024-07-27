import React, { ReactNode, useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { auth, firestore } from "../../Firebase";
import Link from "next/link";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../../components/ui/Button";
import BackArrow from "../../public/backarrow.svg";
import Apple from "../../public/apple.svg";
import PlayStore from "../../public/playstore.svg";
import InstantAccess from "../../public/instantaccess.svg";
import StartUpImage1 from "../../public/startup1.svg";
import StartUpImage2 from "../../public/startup2.svg";
import StartUpImage3 from "../../public/startup3.svg";
import { toast } from "react-toastify";
import PublicLayout from "../../components/layouts/public/PublicLayout";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const saveFormData = async (data: FormData) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      data.email,
      data.password
    );
    const user = userCredential.user;

    if (user) {
      const uid = user.uid;
      const userRef = firestore.collection("users").doc(uid);
      await userRef.set({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        cardNumber: data.cardNumber,
        expiry: data.expiry,
        cvc: data.cvc,
      });

      return { firstName: data.firstName, email: data.email };
    } else {
      throw new Error("User creation failed");
    }
  } catch (error) {}
};

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation(saveFormData, {
    onSuccess: (data) => {
      if (data) {
        toast.success("User signed up successfully!");
        router.push({
          pathname: "/dashboard",
          // query: {
          //   firstName: data.firstName,
          //   email: data.email,
          // },
        });
      } else {
        toast.error("Signup failed. Please try again.");
      }
    },
    onError: (error: Error) => {
      toast.error(`Error saving form data: ${error.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "password":
        setErrors((prev) => ({
          ...prev,
          password: value.length < 6 ? "Password must be  6 characters" : "",
        }));
        break;
      case "cardNumber":
        setErrors((prev) => ({
          ...prev,
          cardNumber:
            value.length !== 16 ? "Card number must be 16 digits" : "",
        }));
        break;
      case "expiry":
        const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        setErrors((prev) => ({
          ...prev,
          expiry: !expiryPattern.test(value)
            ? "Expiry date must be in MM/YY format"
            : "",
        }));
        break;
      case "cvc":
        setErrors((prev) => ({
          ...prev,
          cvc: value.length !== 3 ? "CVC must be  3 digits" : "",
        }));
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Object.values(errors).every((error) => error === "")) {
      return;
    }
    mutate(formData);
  };
  return (
    <div className="min-h-screen w-full bg-gray">
      <div className="flex flex-row mob:flex-col-reverse tab:flex-col-reverse">
        {/* Left Side */}
        <div className="no-scrollbar justify-center relative flex w-[40%] mob:w-full tab:w-full">
          <div className="w-full realtive">
            <div className="h-screen overflow-scroll mt-0 block">
              <div className="flex h-10 w-10 cursor-pointer items-center mt-8 ml-8 justify-center rounded-xl border-[3px] border-darkbrown border-opacity-[0.1] mob:hidden tab:hidden">
                <Image src={BackArrow} alt="Back Arrow" />
              </div>
              <div>
                <div className="relative pl-5 w-[70%] mx-auto mob:w-[90%] mob:pl-0">
                  <div className="absolute left-0 top-8 h-[90%] border border-dashed border-lightgreen mob:hidden"></div>
                  <p className="text-darkbrown -ml-9 mt-10 flex items-center gap-2 text-2xl font-bold mob:-ml-1 mob:text-xl">
                    <Image src={StartUpImage1} alt="Startup Image 1" />
                    Your Information
                  </p>

                  <div className="mt-8 flex flex-col gap-4">
                    <form
                      className="flex relative flex-col"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-2 mt-0 flex items-center gap-2">
                        <Image src={StartUpImage2} alt="Startup Image 2" />
                        <p className="text-darkbrown text-xs font-normal leading-6">
                          You will use this email when signing into the app
                        </p>
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        className="mb-3 rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <input
                        required
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        className="mb-3 rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      <input
                        required
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="mb-3 rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <input
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="mb-3 rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={6}
                      />
                      {errors.password && (
                        <p className="text-darkbrown">{errors.password}</p>
                      )}
                      <div className="mb-4 mt-8 flex items-center justify-between gap-0">
                        <p className="text-dark-brown z-10 ml-[-35px] flex items-center gap-2 text-[20px] font-semibold leading-8 mob:ml-0 mob:text-[18px]">
                          <Image src={StartUpImage3} alt="Startup Image 3" />
                          Payment Details
                        </p>
                      </div>
                      <div className="w-full">
                        <input
                          required
                          type="text"
                          placeholder="Card Number"
                          name="cardNumber"
                          className="mb-3 rounded-3xl px-4 py-2 w-full outline-black"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          maxLength={16}
                        />
                        {errors.cardNumber && (
                          <p className="text-darkbrown">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div className="flex space-x-4">
                        <input
                          required
                          type="text"
                          placeholder="(MM/YY)"
                          name="expiry"
                          className="mb-3 rounded-3xl px-4 py-2 w-full outline-black"
                          value={formData.expiry}
                          onChange={handleChange}
                          pattern="(0[1-9]|1[0-2])\/\d{2}"
                        />

                        <input
                          required
                          type="text"
                          placeholder="CVC"
                          name="cvc"
                          className="mb-3 rounded-3xl px-4 py-2 w-full outline-black"
                          value={formData.cvc}
                          onChange={handleChange}
                          maxLength={3}
                        />
                      </div>
                      {errors.expiry && (
                        <p className="text-darkbrown">{errors.expiry}</p>
                      )}
                      {errors.cvc && (
                        <p className="text-darkbrown">{errors.cvc}</p>
                      )}
                      <p className="mb-10 mt-8 block text-sm font-normal leading-5 text-lightbrown mob:hidden">
                        Already have an account?{" "}
                        <Link href="/login">
                          {" "}
                          <span className="cursor-pointer font-medium text-lightgreen underline">
                            Log In
                          </span>
                        </Link>
                      </p>
                      <Button
                        variant="secondary"
                        size="lg"
                        className="bg-lightgreen hover:bg-brown transition-colors duration-500 mt-0 "
                      >
                        {isLoading ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <span className="relative z-10">
                            Start Your Journey
                          </span>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
                <div className="px-[18%] -mt-10 relative mob:px-[6%]">
                  <p className="mt-12 text-center text-xs font-light leading-5 mob:pb-6">
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
              <Image src={BackArrow} alt="Back Arrow" />
            </div>
          </div>
          <div className="absolute right-14 top-9 flex items-center gap-4 mob:hidden">
            <div className="relative z-[100] text-primary cursor-pointer overflow-hidden flex h-11 w-24 items-center justify-center rounded-3xl text-base font-medium">
              <Link href="/">
                {" "}
                <span className="relative z-10 tab:hidden mob:hidden">
                  Home
                </span>
              </Link>
            </div>
            <div className="relative z-[100] cursor-pointer overflow-hidden flex h-11 w-24 items-center justify-center rounded-3xl bg-primary text-base font-medium hover:bg-darkbrown hover:text-primary mob:hidden tab:hidden">
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
            priority
            width={3392}
            height={4096}
            decoding="async"
            className="h-screen w-full object-cover rounded-tl-[40px] mob:h-[400px] tab:h-[40vh] mob:rounded-none tab:rounded-none"
            src="/login.webp"
            alt="Signup Image"
          />
          <div className="absolute left-[50%] top-[50%] -mt-14 mob:mt-0 w-full translate-x-[-50%] translate-y-[-50%]">
            <h1 className="text-center text-5xl font-extrabold leading-[64px] text-primary mob:text-3xl tab:text-3xl">
              Start Your 7-Day
              <br />
              <span className="relative flex flex-col items-center">
                FREE Trial
                <Image
                  src={InstantAccess}
                  alt="Instant Access"
                  className="mob:w-[200px] tab:w-[220px] w-"
                />
              </span>
            </h1>
            <p className="mt-6 text-center text-base font-light leading-6 text-primary mob:flex mob:flex-col mob:text-sm tab:flex tab:flex-col tab:text-sm">
              Register now for the Grounds app and get
              <span className="font-semibold"> INSTANT ACCESS!</span>
            </p>
          </div>
          <div className="absolute bottom-16 left-[50%] z-[10] translate-x-[-50%] items-center gap-4">
            <div className="flex items-center gap-6 mob:hidden tab:hidden cursor-pointer">
              <Image src={Apple} alt="Apple Store" />
              <Image src={PlayStore} alt="Play Store" />
            </div>
          </div>
          <div className="bg-gradient-to-b from-custom-hsla1 via-custom-hsla2 to-custom-f2eee6 absolute bottom-0 z-[1] h-[350px] w-full opacity-90"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

Signup.publicLayout = function (page: ReactNode) {
  return <PublicLayout>{page}</PublicLayout>;
};
