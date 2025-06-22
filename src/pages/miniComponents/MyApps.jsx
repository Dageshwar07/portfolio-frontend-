import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchApps } from "../../store/slices/appsSlice";

const MyApps = () => {
  const dispatch = useAppDispatch();
  const { apps, loading, error } = useAppSelector((state) => state.apps);

  useEffect(() => {
    dispatch(fetchApps());
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
        Error loading apps: {error}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        MY APPS
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {apps &&
          apps.map((element) => {
            return (
              <Card
                className="h-fit p-7 flex flex-col justify-center items-center gap-3 hover:scale-105 transition-transform duration-300"
                key={element._id}
              >
                <img
                  src={element.svg && element.svg.url}
                  alt="app"
                  className="h-12 sm:h-24 w-auto"
                />
                <p className="text-muted-foreground text-center">
                  {element.name}
                </p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default MyApps;
