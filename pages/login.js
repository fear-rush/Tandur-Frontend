import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { collection, doc, getDoc } from "firebase/firestore";

import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebaseconfig";

import signInHero from "../public/signInHero.png";
import "react-toastify/dist/ReactToastify.css";

const SignInScreen = () => {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { user, login } = useAuth();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const loginData = await login(data.email, data.password);
      const userDocRef = doc(db, "user", loginData.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (!userData.plantType || !userData.plantAmount) {
          router.push("/plantinformation");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      toast.error("Invalid Email/Password");
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="hidden lg:block"
      />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="lg:hidden"
      />
      <div className="lg:flex justify-between items-center mt-14 container px-10">
        <div className="hidden lg:block max-w-[600px]">
          <Image
            src={signInHero}
            alt="Sign In Hero Image"
            width={600}
            height={600}
          />
        </div>

        <div>
          <div className="lg:py-12 m-auto">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold mb-6 lg:text-left lg:pl-9">
                Masuk
              </h1>
              <p className="px-10 mb-8">
                Masuk menggunakan akun Anda yang telah terdaftar
              </p>
            </div>

            <form
              className="mx-auto max-w-screen-md px-9"
              onSubmit={handleSubmit(submitHandler)}
              noValidate
            >
              <div className="mb-6">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Silakan masukkan email Anda",
                  })}
                  className="form-field mt-1 p-2 text-gray-500"
                  id="email"
                  autoFocus
                  placeholder="capstonec14"
                ></input>
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Silakan masukkan kata sandi Anda",
                  })}
                  className="form-field mt-1 p-2 text-gray-500"
                  id="password"
                  autoFocus
                  placeholder="Password"
                ></input>
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <input
                    type="checkbox"
                    {...register("remember")}
                    id="remember"
                    name="remember"
                    className="rounded-md text-lg mr-1 shadow-md"
                  ></input>
                  <label
                    for="remember"
                    className="inline-block relative bottom-[0.6px] text-sm lg:text-base"
                  >
                    Ingat saya
                  </label>
                </div>
                <a
                  className="text-green-500 font-medium hover:cursor-pointer text-sm lg:text-base"
                  onClick={() => setPasswordOpen(true)}
                >
                  Lupa kata sandi Anda?
                </a>
                <Modal
                  onClose={() => {
                    setPasswordOpen(false);
                    // console.log(open);
                  }}
                  open={passwordOpen}
                  onClickFunc={() => router.push("/contact")}
                  buttonName="Contact"
                  title="Lupa kata sandi"
                  description="Silakan hubungi tim Capstone C14 untuk mengubah kata sandi Anda"
                />
              </div>
              <button className="primary-button block px-5 py-2.5 ">
                Masuk
              </button>
            </form>
            <a
              className="mt-8 block text-center text-green-500  cursor-pointer"
              onClick={() => setAccountOpen(true)}
            >
              Belum mempunyai akun Tandur?{" "}
              <span className="text-green-700">Buat Akun</span>
            </a>
            <Modal
              onClose={() => {
                setAccountOpen(false);
                // console.log(open);
              }}
              open={accountOpen}
              onClickFunc={() => router.push("/contact")}
              buttonName="Contact"
              title="Pembuatan akun baru"
              description="Silakan hubungi tim Capstone C14 untuk pembuatan akun baru"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInScreen;
