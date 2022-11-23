import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { doc, getDoc } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebaseconfig";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [userLoading, setUserLoading] = useState(true);

  const { user, logout, login } = useAuth();

  useEffect(() => {
    // let isCancelled = false;
    const userDocRef = doc(db, "user", user.uid);
    const getUserData = async () => {
      try {
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserProfile(userData);
          setUserLoading(false);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        throw `${err}`;
      }
    };

    getUserData();
  }, []);

  const date_1 = new Date(userProfile.dateCreated);
  console.log(date_1.getTime());
  const date_2 = new Date();
  console.log(date_2.getTime());
  const difference = date_1.getTime() - date_2.getTime() + 1000 * 3600 * 24;
  const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

  return (
    <div
      className={clsx(
        "w-full container border border-gray-200 h-fit rounded-xl ",
        "overflow-hidden flex justify-between flex-col shadow-md"
      )}
    >
      {/* Profile Section */}
      <div
        className={clsx(
          "profile-container my-6 mx-6 flex flex-row justify-between items-center"
        )}
      >
        <div
          className={clsx("profile flex flex-row justify-center items-center")}
        >
          <div
            className={clsx(
              "avatar relative h-20 w-20 rounded-full  border-solid border-2 border-gray-200 overflow-hidden "
            )}
          >
            <Image
              src="/img/icon/user.svg"
              alt="profile image"
              height={100}
              width={100}
            ></Image>
          </div>
          <div
            className={clsx(
              "profile-description flex-col flex justify-center ml-5"
            )}
          >
            <p className={clsx("text-sm text-gray-600 font-medium")}>
              Selamat Datang Kembali,
            </p>
            <h1 className={clsx(" text-2xl text-gray-900 font-bold")}>
              {userProfile.username ? (
                userProfile.username
              ) : (
                <Skeleton></Skeleton>
              )}
            </h1>
          </div>
        </div>

        <Link href="/plantinformation" passHref>
          <button
            type="button"
            className={clsx(
              "py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
            )}
          >
            Sunting Informasi
          </button>
        </Link>
      </div>
      {/*End Of Profile Section */}
      {/* className={clsx("")} */}
      <div
        className={clsx(
          "plants-information-container flex-row flex w-full border-t border-solid border-gray-200 h-16 "
        )}
      >
        <div
          className={clsx(
            "w-full h-full flex justify-center items-center border-r border-solid border-gray-200"
          )}
        >
          {userProfile.plantType == 1.1 ? (
            "Tanaman Cabai"
          ) : userProfile.plantType == 1.15 ? (
            "Tanaman Terong"
          ) : userProfile.plantType == 0.85 ? (
            "Tanaman Strawberry"
          ) : userProfile.plantType == null ? (
            <Skeleton height={20} width={100}></Skeleton>
          ) : (
            <Skeleton height={20} width={100}></Skeleton>
          )}
        </div>
        <div
          className={clsx(
            "w-full h-full flex justify-center items-center border-r border-solid border-gray-200"
          )}
        >
          {userProfile.plantAmount ? (
            <> {userProfile.plantAmount} Tanaman</>
          ) : (
            <Skeleton height={20} width={100}></Skeleton>
          )}
        </div>
        <div
          className={clsx(
            "w-full h-full flex justify-center items-center border-r border-solid border-gray-200"
          )}
        >
          Hari Ke- {Math.abs(TotalDays)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
