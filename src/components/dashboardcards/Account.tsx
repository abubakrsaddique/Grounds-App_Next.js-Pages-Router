import React from "react";
import Image from "next/image";

import EditButton from "@/public/edit.svg";

interface AccountProps {
  email: string;
  onEdit: () => void;
}

const Account: React.FC<AccountProps> = ({ email, onEdit }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="pl-1 text-2xl font-semibold leading-6">My Account</h2>
        <Image
          src={EditButton}
          alt="Edit"
          className="cursor-pointer"
          onClick={onEdit}
        />
      </div>

      <div className="mt-4 bg-primary rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-semibold">Email</p>
          <p className="text-base font-semibold text-lightbrown">{email}</p>
        </div>
        <div className="border-t border-gray my-4"></div>
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold">Password</p>
          <p className="text-base font-semibold text-lightbrown">•••••••••</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
