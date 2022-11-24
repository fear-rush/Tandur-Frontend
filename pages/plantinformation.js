import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { doc, updateDoc } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebaseconfig";

const PlantInformationPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const userDocRef = doc(db, "user", user.uid);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const response = await updateDoc(userDocRef, {
        plantType: data.plantType,
        plantAmount: data.plantAmount,
        dateCreated: Date.now(),
      });
      router.replace("/dashboard");
    } catch (err) {
      throw `Error in set data`;
    }
  };

  return (
    <>
      <div className="w-3/4 sm:w-[590px] mx-auto bg-white shadow-md border-[1px] rounded-md px-2 py-4 sm:px-10 sm:py-8 mt-[72px]">
        <h1 className="font-extrabold text-2xl text-center mb-[10px]">
          Informasi Tanaman
        </h1>
        <p className="text-sm text-center font-normal mb-6">
          Masukkan Data Tanaman Anda
        </p>
        <form onSubmit={handleSubmit(submitHandler)} noValidate>
          <label htmlFor="plantType" className="font-medium">
            Jenis Tanaman
          </label>
          <div className="relative">
            <select
              {...register("plantType", {
                required: "Silakan untuk memilih satu jenis tanaman",
              })}
              className="form-field mt-1 p-2 text-gray-500 mb-6"
              id="plantType"
              autoFocus
              placeholder="..."
            >
              <option value={1.1}>Cabai</option>
              <option value={1.15}>Terong</option>
              <option value={0.85}>Strawberry</option>
            </select>
            {errors.plantType && (
              <p className="text-red-500 relative -top-5">
                {errors.plantType.message}
              </p>
            )}
          </div>
          <label htmlFor="plantAmount" className="font-medium">
            Banyak Tanaman
          </label>
          <div className="relative">
            <input
              type="number"
              {...register("plantAmount", {
                required: "Silakan untuk memasukkan jumlah tanaman",
                min: {
                  value: 6,
                  message: "Minimal jumlah tanaman adalah 1",
                },
              })}
              className="form-field mt-1 p-2 text-gray-500 mb-6"
              id="plantAmount"
            ></input>
            {errors.plantAmount && (
              <p className="text-red-500 relative -top-5">
                {errors.plantAmount.message}
              </p>
            )}
          </div>
          <button type="submit" className="primary-button px-5 py-2.5 ">
            Kirim
          </button>
        </form>
      </div>
    </>
  );
};

export default PlantInformationPage;
