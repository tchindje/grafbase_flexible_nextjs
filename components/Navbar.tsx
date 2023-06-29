import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import { AuthProvider } from "./AuthProvider";

const session = {};

const Navbar = () => {
  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href='/'>
          <Image src='/logo.svg' width={115} height={43} alt='flexible' />
        </Link>

        <ul className='xl:flex hidden text-small gap-7'>
          {NavLinks.map((link) => {
            return (
              <Link href={link.href} key={link.key}>
                {link.text}
              </Link>
            );
          })}
        </ul>
      </div>

      <div className='flexCenter gap-4'>
        {session ? (
          <>
            User photo
            <Link href='/create-project'>share your project</Link>
          </>
        ) : (
          <AuthProvider />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
