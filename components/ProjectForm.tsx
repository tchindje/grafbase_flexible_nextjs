"use client";
import { SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { ChangeEvent } from "react";

type formProps = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: formProps) => {
  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleStateChange = (fileName: string, value: string) => {};
  const form = {
    image: "",
  };
  return (
    <form onSubmit={handleFormSubmit} className='flexStart form'>
      <div className='flexStart form_image-container'>
        <label htmlFor='poster' className='flexCenter form_image-label'>
          {!form?.image && "choose a poster for your project"}
        </label>
        <input
          id='image'
          type='file'
          accept='image/*'
          required={type === "create"}
          className='form_image-input'
          onChange={handleChangeImage}
        />

        {form?.image && (
          <Image
            src={form.image}
            fill
            className='sm:p-10 object-contain z-20'
            alt='project poster'
          />
        )}
      </div>

      {/* <FormField
        title='Tile'
        state={form.title}
        placeholder='Flexible'
        setState={(value) => handleStateChange("title", value)}
      /> */}
    </form>
  );
};

export default ProjectForm;
