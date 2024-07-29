const Plan = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="pl-[6px] text-xl font-semibold leading-6">My Plan</h2>
      </div>
      <div className="mt-4 w-full rounded-3xl bg-primary p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-darkbrown font-bold leading-5 text-[17px]">
              12 Month • <span className="text-lightgreen">Best deal</span>
            </p>
            <p className="leading-7 mt-[6px] font-medium text-sm text-lightbrown">
              Term expires 5th Aug 24
            </p>
          </div>
          <p className="text-base font-bold leading-5 text-lightgreen">$</p>
        </div>
      </div>
    </div>
  );
};

export default Plan;
