import React from "react";
function Authlayout({ children, heading, subheading }: any) {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="flex justify-center items-center bg-[#333333]">
        {/* <img
          className="h-[25vh] object-cover hidden lg:block"
          src="/images/login-logo.png"
          alt="logo"
        /> */}
        <h1 className="font-mono text-white text-[50px] font-extrabold">CampusTrack</h1>
      </div>
      <div className="h-screen p-[30px]">
        <div className="pt-[60px] flex justify-center">
          <div className="text-center">
            <div className="pt-[60px]">
              <p className="text-[23.78px] text-[#232323] roboto-semibold">
                {heading}
              </p>
              <p className="text-[14.27px] text-[#919191] roboto-regular">
                {subheading}
              </p>
            </div>
          </div>
        </div>
        <div className=" max-w-[500px] mx-auto pt-[60px]">{children}</div>
      </div>
    </div>
  );
}

export default React.memo(Authlayout);
