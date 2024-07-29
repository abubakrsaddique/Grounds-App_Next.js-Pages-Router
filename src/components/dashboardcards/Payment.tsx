import Image from "next/image";

import PaymentImage from "@/public/payment.svg";

const Payment = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="pl-[6px] text-xl font-semibold leading-6">
          My Payment Method
        </h2>
      </div>
      <div className="mt-4 w-full rounded-3xl bg-primary p-6">
        <div className="flex flex-wrap items-center justify-between">
          <p className="font-semibold leading-4 text-black text-base">
            Payment Method
          </p>
          <p className="font-semibold leading-4 text-base">promotional</p>
        </div>
        <div className="my-5 w-full border-t border-caption border-lightbrown opacity-50"></div>
        <div className="flex items-center">
          <Image src={PaymentImage} alt="" className="w-[116px] h-[64px]" />
          <p className="ml-2 text-base font-medium leading-6 text-black">
            All In-App purchases must be managed within your Apple
            Subscriptions.
          </p>
        </div>
        <ol className="mt-6 list-decimal pl-4 text-lightbrown">
          <li className="text-base font-medium">
            Go to Settings &gt; [your name] &gt; iTunes &amp; App Store
          </li>
          <li className="text-base font-medium text-caption">
            Tap your Apple ID at the top of the screen, then select View Apple
            ID. You might need to sign in with your Apple ID
          </li>
          <li className="text-base font-medium ">
            Scroll down and tap 'Subscriptions'
          </li>
          <li className="text-base font-medium ">
            Choose 'Grounds' as the subscription that you want to manage
          </li>
        </ol>
      </div>
    </>
  );
};

export default Payment;
