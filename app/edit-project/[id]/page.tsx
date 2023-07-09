import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

import React from "react";

const EditProject = async () => {
  //get current user session
  const session = await getCurrentUser();

  if (!session?.user) redirect("/"); //user didn't signIn

  return (
    <Modal>
      <h3 className='modal-head-text'>Edit Project</h3>
      <ProjectForm type='create' session={session} />
    </Modal>
  );
};

export default EditProject;
