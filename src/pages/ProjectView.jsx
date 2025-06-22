import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchProjectById,
  clearCurrentProject,
} from "../store/slices/projectsSlice";

const ProjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentProject, projectLoading, projectError } = useAppSelector(
    (state) => state.projects,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }

    // Cleanup when component unmounts
    return () => {
      dispatch(clearCurrentProject());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (projectError) {
      toast.error(projectError);
    }
  }, [projectError]);

  const handleReturnToPortfolio = () => {
    navigate("/");
  };

  if (projectLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (projectError) {
    return (
      <div className="flex justify-center items-center min-h-[100vh] flex-col gap-4">
        <div className="text-red-500 text-center">
          Error loading project: {projectError}
        </div>
        <Button onClick={handleReturnToPortfolio}>Return to Portfolio</Button>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="flex justify-center items-center min-h-[100vh] flex-col gap-4">
        <div className="text-center">Project not found</div>
        <Button onClick={handleReturnToPortfolio}>Return to Portfolio</Button>
      </div>
    );
  }

  const descriptionList = currentProject.description
    ? currentProject.description.split(". ")
    : [];
  const technologiesList = currentProject.technologies
    ? currentProject.technologies.split(", ")
    : [];

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-end">
                <Button onClick={handleReturnToPortfolio}>
                  Return to Portfolio
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4">
                    {currentProject.title}
                  </h1>
                  <img
                    src={
                      currentProject.projectBanner?.url || "/avatarHolder.jpg"
                    }
                    alt="projectBanner"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Description:</p>
                  <ul className="list-disc ml-4">
                    {descriptionList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Technologies:</p>
                  <ul className="list-disc ml-4">
                    {technologiesList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Stack:</p>
                  <p>{currentProject.stack}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Deployed:</p>
                  <p>{currentProject.deployed}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Github Repository Link:</p>
                  <Link
                    className="text-sky-700 hover:underline"
                    target="_blank"
                    to={currentProject.gitRepoLink || "#"}
                  >
                    {currentProject.gitRepoLink}
                  </Link>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Project Link:</p>
                  <Link
                    className="text-sky-700 hover:underline"
                    target="_blank"
                    to={currentProject.projectLink || "#"}
                  >
                    {currentProject.projectLink}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectView;
