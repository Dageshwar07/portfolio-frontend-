import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const ReduxStatusIndicator = () => {
  const profile = useAppSelector((state) => state.profile);
  const projects = useAppSelector((state) => state.projects);
  const skills = useAppSelector((state) => state.skills);
  const timeline = useAppSelector((state) => state.timeline);
  const apps = useAppSelector((state) => state.apps);

  const getStatusBadge = (loading, data, error) => {
    if (loading) return <Badge variant="secondary">Loading...</Badge>;
    if (error) return <Badge variant="destructive">Error</Badge>;
    if (data && (Array.isArray(data) ? data.length > 0 : data)) {
      return <Badge variant="default">Loaded</Badge>;
    }
    return <Badge variant="outline">Empty</Badge>;
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Redux State Status</h3>
          <Link
            to="/portfolio-redux"
            className="text-xs text-primary hover:underline"
          >
            View Details →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between">
            <span>Profile:</span>
            {getStatusBadge(profile.loading, profile.user, profile.error)}
          </div>
          <div className="flex items-center justify-between">
            <span>Projects:</span>
            {getStatusBadge(
              projects.loading,
              projects.projects,
              projects.error,
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>Skills:</span>
            {getStatusBadge(skills.loading, skills.skills, skills.error)}
          </div>
          <div className="flex items-center justify-between">
            <span>Timeline:</span>
            {getStatusBadge(
              timeline.loading,
              timeline.timeline,
              timeline.error,
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>Apps:</span>
            {getStatusBadge(apps.loading, apps.apps, apps.error)}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600">✓ Redux:</span>
            <Badge variant="default" className="bg-green-600">
              Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReduxStatusIndicator;
