import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setUser,
  clearUser,
  updateUserProfile,
} from "../store/slices/userSlice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";

const UserManager = () => {
  const { currentUser, isAuthenticated } = useAppSelector(
    (state) => state.user,
  );
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const handleLogin = () => {
    if (formData.name && formData.email) {
      dispatch(
        setUser({
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }),
      );
      setFormData({ name: "", email: "", role: "user" });
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const handleUpdateProfile = () => {
    if (formData.name || formData.email) {
      dispatch(
        updateUserProfile({
          ...(formData.name && { name: formData.name }),
          ...(formData.email && { email: formData.email }),
          ...(formData.role && { role: formData.role }),
        }),
      );
      setFormData({ name: "", email: "", role: "user" });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Demonstrates user state management with Redux
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold">Current User:</h3>
              <p>
                <strong>Name:</strong> {currentUser?.name}
              </p>
              <p>
                <strong>Email:</strong> {currentUser?.email}
              </p>
              <p>
                <strong>Role:</strong> {currentUser?.role}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-name">Update Name</Label>
              <Input
                id="update-name"
                placeholder="New name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-email">Update Email</Label>
              <Input
                id="update-email"
                type="email"
                placeholder="New email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleUpdateProfile}
                variant="secondary"
                size="sm"
              >
                Update Profile
              </Button>
              <Button onClick={handleLogout} variant="destructive" size="sm">
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManager;
