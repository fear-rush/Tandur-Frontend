import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className=" container m-auto py-14 max-w-screen-xl px-4 bg-green-500  ">
      <div className="md:flex md:justify-between w-full gap-20 container mb-20">
        <div className="mb-6 md:mb-0 flex flex-col w-full justify-center items-center sm:justify-start sm:items-start sm:w-1/3 gap-4">
          <div className="flex items-center gap-4">
            <div className="icon relative h-12 w-12 ">
              <Image
                src="/img/icon/Logo.png"
                alt="profile image"
                height={100}
                width={100}
              ></Image>
            </div>
            <span className="self-center text-white text-2xl font-semibold whitespace-nowrap ">
              Tandur
            </span>
          </div>
          <p className="text-base text-white">
            A connected ecosystem for your plants.
          </p>
          <p className="text-base text-white">Plant It. Automate. Grow.</p>
        </div>
        <div className="grid w-full text-center sm:text-start grid-cols-1 gap-8  sm:gap-0 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase ">
              Anggota
            </h2>
            <ul className="text-white flex flex-col gap-4">
              <li>Ave Syah Shina</li>
              <li>Muhammad Firas Zahid S.</li>
              <li>Muhammad Ilham Sukarsa</li>
              <li>Muhammad Rasyid</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase ">
              Dosen Pembimbing
            </h2>
            <ul className="text-white ">
              <li className="mb-4">Dr. Indriana Hidayah, ST, MT</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase ">
              Didukung Oleh
            </h2>
            <ul className="text-white ">
              <li className="mb-4">
                Depertemen Teknik Elektro dan Teknologi Informasi Universitas
                Gadjah Mada
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between text-center sm:text-start">
        <span className="text-base text-white sm:text-center w-full">
          © 2022 Kelompok C-14 - Capstone DTETI FT UGM
        </span>
      </div>
    </footer>
  );
};

export default Footer;
