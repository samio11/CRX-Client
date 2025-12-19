"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserByToken, updateUserByToken } from "@/services/user";
import Loading from "@/app/loading";

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Load user data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Fetch user profile data
  const loadUserData = async () => {
    const toastId = toast.loading("Loading profile...");

    try {
      const response = await getUserByToken();

      if (response.success && response.data) {
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
        });

        toast.success("Profile loaded successfully!", { id: toastId });
      } else {
        toast.error(response.message || "Failed to load profile", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error("Failed to load profile data", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const toastId = toast.loading("Saving changes...");
    setSaving(true);

    try {
      const response = await updateUserByToken(formData);

      if (response.success) {
        setUser({
          ...user,
          ...formData,
        });

        toast.success("Profile updated successfully!", { id: toastId });
      } else {
        toast.error(response.message || "Failed to update profile", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Profile Management
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b">
            <Avatar className="h-20 w-20 border">
              {user?.profileImage ? (
                <AvatarImage src={user.profileImage} alt={user.name} />
              ) : null}
              <AvatarFallback className="bg-gray-100 text-lg">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm bg-gray-900 text-white px-2 py-1 rounded">
                  {user?.role}
                </span>
                {user?.isVerified && (
                  <span className="text-sm bg-gray-100 text-gray-900 px-2 py-1 rounded border">
                    ✓ Verified
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  Joined {formatDate(user?.createdAt || "")}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">
                Full Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="border-gray-300"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Email Address *
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className="border-gray-300"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Phone Number
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="border-gray-300"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Address</label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address"
                className="border-gray-300"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              >
                {saving ? (
                  <>
                    <span className="mr-2">⏳</span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
