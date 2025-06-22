import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProjects } from "../../store/slices/projectsSlice";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const dispatch = useAppDispatch();
  const { projects, loading, error } = useAppSelector(
    (state) => state.projects,
  );

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-20 text-center text-red-500">
        Error loading projects: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">
            PORTFOLIO
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {viewAll
          ? projects &&
            projects.map((element) => {
              return (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                    className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              );
            })
          : projects &&
            projects.slice(0, 9).map((element) => {
              return (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                    className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              );
            })}
      </div>
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
