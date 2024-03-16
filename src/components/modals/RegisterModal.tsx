"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { createUser } from "@/actions";
import LoginModal from "./LoginModal";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";
export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await createUser(data);
      registerModal.onClose();
      reset();
      loginModal.onOpen();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3 ">
      <hr />
      <Button
        label="Continue with Google"
        onClick={() => signIn("google")}
        icon={FcGoogle}
        outline
      />
      <Button
        label="Continue with Github"
        onClick={() => signIn("github")}
        icon={AiFillGithub}
        outline
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2 ">
          <div className="">Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline "
          >
            Log in.
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
