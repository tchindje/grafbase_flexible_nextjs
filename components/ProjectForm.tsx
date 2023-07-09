"use client";
import { ProjectInterface, SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustumMenu";
import Button from "./Button";
import { createNewProject, fetchToken, updateProject } from "@/lib/actions";
import { useRouter } from "next/navigation";

type formProps = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: formProps) => {
  const router = useRouter();

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create ") {
        await createNewProject(form, session?.user?.id, token);
        router.push("/"); // redirect to the  home page
      }

      if (type === "edit") {
        await updateProject(form, project?.id as string, token);
        router.push("/");
      }
    } catch (error) {
      console.log("erreur de la creation du projet ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [form, setform] = useState({
    title: project?.title || " ",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
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
        title='Description'
        state={form.description}
        placeholder='showcase and discover remarquable developer project '
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type='url'
        title='Website Url'
        state={form.liveSiteUrl}
        placeholder='https://jsmastery.pro'
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type='url'
        title='Github URL '
        state={form.githubUrl}
        placeholder='https://github.pro'
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
