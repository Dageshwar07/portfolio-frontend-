import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUserProfile } from "../store/slices/profileSlice";
import { fetchProjects } from "../store/slices/projectsSlice";
import { fetchSkills } from "../store/slices/skillsSlice";
import { fetchTimeline } from "../store/slices/timelineSlice";
import { fetchApps } from "../store/slices/appsSlice";

const PortfolioReduxDemo = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state) => state.profile);
  const projects = useAppSelector((state) => state.projects);
  const skills = useAppSelector((state) => state.skills);
  const timeline = useAppSelector((state) => state.timeline);
  const apps = useAppSelector((state) => state.apps);
  const contact = useAppSelector((state) => state.contact);

  useEffect(() => {
    // Fetch all data when component mounts
    dispatch(fetchUserProfile());
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchTimeline());
    dispatch(fetchApps());
  }, [dispatch]);

  const handleRefreshAll = () => {
    dispatch(fetchUserProfile());
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchTimeline());
    dispatch(fetchApps());
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Portfolio Redux State Management
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            This page demonstrates how all portfolio data is managed through
            Redux Toolkit. All API calls are centralized and state is managed
            efficiently across components.
          </p>
          <Button onClick={handleRefreshAll} className="mb-8">
            Refresh All Data
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Profile State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                👤 Profile State
                {profile.loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
              </CardTitle>
              <CardDescription>User profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Loading:</strong> {profile.loading ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Error:</strong> {profile.error || "None"}
                </div>
                <div>
                  <strong>User Loaded:</strong> {profile.user ? "Yes" : "No"}
                </div>
                {profile.user && (
                  <div className="mt-2 p-2 bg-muted rounded">
                    <div>
                      <strong>About:</strong>{" "}
                      {profile.user.aboutMe?.slice(0, 100)}...
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Projects State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🚀 Projects State
                {projects.loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
              </CardTitle>
              <CardDescription>Portfolio projects data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Loading:</strong> {projects.loading ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Error:</strong> {projects.error || "None"}
                </div>
                <div>
                  <strong>Projects Count:</strong> {projects.projects.length}
                </div>
                <div>
                  <strong>Current Project:</strong>{" "}
                  {projects.currentProject ? "Loaded" : "None"}
                </div>
                {projects.projects.length > 0 && (
                  <div className="mt-2 p-2 bg-muted rounded">
                    <div>
                      <strong>Latest:</strong> {projects.projects[0]?.title}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🛠️ Skills State
                {skills.loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
              </CardTitle>
              <CardDescription>Technical skills data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Loading:</strong> {skills.loading ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Error:</strong> {skills.error || "None"}
                </div>
                <div>
                  <strong>Skills Count:</strong> {skills.skills.length}
                </div>
                {skills.skills.length > 0 && (
                  <div className="mt-2 p-2 bg-muted rounded">
                    <div>
                      <strong>Skills:</strong>{" "}
                      {skills.skills
                        .slice(0, 3)
                        .map((s) => s.title)
                        .join(", ")}
                      ...
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Timeline State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📅 Timeline State
                {timeline.loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
              </CardTitle>
              <CardDescription>Career timeline data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Loading:</strong> {timeline.loading ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Error:</strong> {timeline.error || "None"}
                </div>
                <div>
                  <strong>Timeline Count:</strong> {timeline.timeline.length}
                </div>
                {timeline.timeline.length > 0 && (
                  <div className="mt-2 p-2 bg-muted rounded">
                    <div>
                      <strong>Latest:</strong> {timeline.timeline[0]?.title}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Apps State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📱 Apps State
                {apps.loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
              </CardTitle>
              <CardDescription>Software applications data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Loading:</strong> {apps.loading ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Error:</strong> {apps.error || "None"}
                </div>
                <div>
                  <strong>Apps Count:</strong> {apps.apps.length}
                </div>
                {apps.apps.length > 0 && (
                  <div className="mt-2 p-2 bg-muted rounded">
                    <div>
                      <strong>Apps:</strong>{" "}
                      {apps.apps
                        .slice(0, 3)
                        .map((a) => a.name)
                        .join(", ")}
                      ...
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📧 Contact State
                {contact.loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
              </CardTitle>
              <CardDescription>Contact form state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Loading:</strong> {contact.loading ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Success:</strong> {contact.success ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Error:</strong> {contact.error || "None"}
                </div>
                <div>
                  <strong>Message:</strong> {contact.message || "None"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>🏗️ Redux Architecture Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">📁 Store Structure</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>
                      • <strong>profile:</strong> User profile data
                    </li>
                    <li>
                      • <strong>projects:</strong> Portfolio projects
                    </li>
                    <li>
                      • <strong>skills:</strong> Technical skills
                    </li>
                    <li>
                      • <strong>timeline:</strong> Career timeline
                    </li>
                    <li>
                      • <strong>apps:</strong> Software applications
                    </li>
                    <li>
                      • <strong>contact:</strong> Contact form state
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">⚡ Features</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Centralized API calls</li>
                    <li>• Loading states</li>
                    <li>• Error handling</li>
                    <li>• Async thunks</li>
                    <li>• Optimistic updates</li>
                    <li>• State persistence</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">🔗 API Endpoints</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>• GET /user/portfolio/me</div>
                  <div>• GET /project/getall</div>
                  <div>• GET /project/get/:id</div>
                  <div>• GET /skill/getall</div>
                  <div>• GET /timeline/getall</div>
                  <div>• GET /softwareapplication/getall</div>
                  <div>• POST /message/send</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PortfolioReduxDemo;
