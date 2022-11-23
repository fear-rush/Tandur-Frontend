import React, { Fragment } from "react";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "../context/AuthContext";

import { Menu, Transition } from "@headlessui/react";

import { Bars3Icon } from "./svg";
import logo from "../public/logo.png";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, logout, login } = useAuth();
  const router = useRouter();
  return (
    <header>
      <nav className="m-auto w-full mt-1 flex h-20 items-center justify-between px-6 shadow-md sm:px-12 lg:h-16 lg:px-14  ">
        {/* TODO: Kalau udah dapet session, href di Link diset ke href={session ? "/dashboard" : "/"}*/}
        <Link href="/">
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <Image src={logo} width={32} height={32} alt="Tandur Logo" />
            <p className="text-lg font-bold">Tandur</p>
          </div>
        </Link>

        {/* TODO: 
            1. Beli subscription ke antares buat test sambungin ke device
            2. Buat authentication make nextauth misal buat retrieve user device biar dapet session
          */}

        <div className="lg:w-[200px]">
          <Menu as="div" className="realtive inline-block text-left lg:hidden">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="text-center absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                <div className="flex flex-col items-center justify-center py-3">
                  <Menu.Item>
                    <button
                      onClick={() => router.replace("/login")}
                      className="secondary-button !w-24 px-4 py-3"
                    >
                      Sign in
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button className="primary-button !w-24 px-4 py-3 ">
                      Sign up
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="hidden justify-end items-end  lg:flex lg:gap-4">
            {user ? (
              <>
                <button
                  onClick={() => logout()}
                  className="primary-button   !w-24 px-4 py-3"
                >
                  Log Out
                </button>{" "}
              </>
            ) : (
              <>
                {" "}
                <button
                  onClick={() => router.replace("/login")}
                  className="secondary-button w-24 px-4 py-3 mr-5"
                >
                  Sign in
                </button>
                <button className="primary-button !bg-green-500 w-24 px-4 py-3">
                  Sign up
                </button>{" "}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
