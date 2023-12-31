import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

import React from "react";

const CreateProject = async () => {
  //get current user session
  const session = await getCurrentUser();

  // console.log("session information", session);

  if (!session?.user) redirect("/"); //user didn't signIn

  return (
    <Modal>
      <h3 className='modal-head-text'>Create a New Project</h3>
      <ProjectForm type='create' session={session} />
    </Modal>
  );
};

export default CreateProject;
