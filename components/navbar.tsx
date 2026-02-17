import Image from "next/image";
import Link from "next/link";
import { menuLink } from "@/constants/constants";
const Navbar = () => {
  return (
    <div
      className="fixed top-0 z-1111 w-full  backdrop-blur-[20px]   opacity-0.7
border border-[#151024] bg-[#12121280]"
    >
      <div
        className="container flex justify-between py-7 
"
      >
        <Link
          className="flex items-center gap-1.5 text-[20px] leading-6 font-bold"
          href={"/"}
        >
          <Image
            src={"/icons/logo.png"}
            width={6}
            height={6}
            alt="Logo"
            className="lg:w-6 lg:h-6 w-7 h-7 "
          />
          <h3 className="md:block sm:hidden">
            <span className="italic">Dev</span>Event
          </h3>
        </Link>
        <ul className="flex items-center lg:gap-6 gap-3">
          {menuLink.map((item) => {
            return (
              <li
                className="text-[#DCFFF8] lg:text-[16px] text-[14px] lg:leading-6 leading-5 "
                key={item.id}
              >
                <Link href={item.path}> {item.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
