"use client";
import { SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustumMenu";
import { ValueType } from "tailwindcss/types/config";
import Button from "./Button";

type formProps = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: formProps) => {
  const handleFormSubmit = (e: React.FormEvent) => {};

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setform((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const [form, setform] = useState({
    image: "",
    title: " ",
    description: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

      <FormField
        title='Title'
        state={form.title}
        placeholder='Flexible'
        setState={(value) => handleStateChange("title", value)}
      />

      <FormField
        title='Title'
        state={form.description}
        placeholder='showcase and discover remarquable developer project '
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type='url'
        title='Website Url'
        state={form.liveSiteUrl}
        placeholder='htttps://jsmastery.pro'
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type='url'
        title='Github URL '
        state={form.githubUrl}
        placeholder='htttps://github.pro'
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title='Category'
        state={form.category}
        filters={categoryFilters}
        setState={(value) => {
          handleStateChange("category", value);
        }}
      />

      <div className='flexStart w-full'>
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type='submit'
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
