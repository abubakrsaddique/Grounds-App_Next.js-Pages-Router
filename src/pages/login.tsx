import Link from "next/link";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import PublicLayout from "@/components/layouts/public/PublicLayout";
import BackArrow from "@/public/backarrow.svg";
import Apple from "@/public/apple.svg";
import PlayStore from "@/public/playstore.svg";
import { Button } from "@/components/ui/Button";

import { auth, firestore } from "../../Firebase";

export interface UserData {
  uid: string;
  firstName: string;
  email: string;
}

const loginUser = async (
  email: string,
  password: string
): Promise<UserData> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      const userRef = doc(firestore, `users/${user.uid}`);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        throw new Error("User data not found");
      }

      return { ...userDoc.data(), uid: user.uid } as UserData;
    }

    throw new Error("User not found");
  } catch (error) {
    throw new Error("" || "Login failed");
  }
};

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const { mutate, isLoading } = useMutation(() => loginUser(email, password), {
    onSuccess: (data: UserData) => {
      router.push({
        pathname: "/dashboard",
        // query: { firstName: data.firstName, email: data.email },
      });
      toast.success("Login successful!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="min-h-screen w-full bg-gray">
      <div className="flex flex-row mob:flex-col-reverse tab:flex-col-reverse">
        <div className="relative w-[70%] mob:w-full tab:w-full tab:mt-14">
          <div className="flex h-full w-full items-center justify-center py-6">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <p className="mb-8 text-3xl font-bold text-darkbrown">Login</p>
              <input
                required
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3 w-[400px] rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
              />
              <input
                required
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-3 w-[400px] rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
              />
              <p className="text-darkbrown mt-2 w-fit text-sm font-medium leading-5 underline cursor-pointer">
                <a href="#">Forgot password?</a>
              </p>
              <p className="mt-10 text-center text-sm font-medium text-lightbrown">
                You don’t have an account?{" "}
                <Link href="/checkout">
                  <span className="font-semibold cursor-pointer text-darkbrown underline">
                    Sign Up
                  </span>
                </Link>
              </p>

              <Button variant="secondary" size="sm" className="mt-4">
                {isLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <span className="relative z-10">Login</span>
                )}
              </Button>
            </form>
          </div>
          <div className="absolute left-8 top-8 mob:hidden flex tab:hidden">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[3px] border-darkbrown border-opacity-[0.1]">
              <Link href="/">
                <Image src={BackArrow} alt="Back" width={20} height={20} />
              </Link>
            </div>
          </div>
        </div>
        {/* For Mobile */}
        <div className="relative block w-full">
          <div className="absolute left-5 top-5 hidden tab:block mob:block">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[3px] border-darkbrown border-opacity-[0.1]">
              <Link href="/">
                <Image src={BackArrow} alt="Back" width={20} height={20} />
              </Link>
            </div>
          </div>
          <div className="absolute right-14 top-9 flex items-center gap-4 mob:hidden">
            <Link href="/">
              <Button
                variant="default"
                size="default"
                className="bg-primary text-black hover:bg-darkbrown hover:text-primary"
              >
                Home
              </Button>
            </Link>
          </div>
          <Image
            fetchPriority="high"
            width={3392}
            height={4096}
            decoding="async"
            data-nimg="1"
            className="h-screen w-full object-cover rounded-tl-[40px] mob:h-[400px] tab:h-[82vh] mob:rounded-none tab:rounded-none"
            src="/login.webp"
            alt="Login Background"
          />
          <div className="absolute left-[50%] top-[40%] tab:top-[47%] -ml-28 mob:-ml-24">
            <p className="flex justify-center items-center text-5xl tab:text-5xl mob:text-[40px] font-bold uppercase text-primary">
              Grounds
            </p>
            <p className="text-center text-[18px] font-light leading-[60px] mob:leading-10 text-primary mob:text-sm">
              Your new training grounds
            </p>
          </div>
          <div className="absolute bottom-16 left-[50%] z-[10] translate-x-[-50%] items-center gap-4">
            <div className="flex items-center gap-6 mob:hidden tab:hidden cursor-pointer">
              <Image src={Apple} alt="Apple" />
              <Image src={PlayStore} alt="PlayStore" />
            </div>
          </div>
          <div className="bg-gradient-to-b from-custom-hsla1 via-custom-hsla2 to-custom-f2eee6 absolute bottom-0 z-[1] h-[350px] w-full opacity-90"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;

Login.publicLayout = function (page: ReactNode) {
  return <PublicLayout>{page}</PublicLayout>;
};
