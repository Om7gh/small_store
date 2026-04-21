"use client";
import updateUserRole from "@/actions/admin/updateUserRole";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { error } from "console";

export default function UpdateUserRole({
  id,
  role,
}: {
  id: string;
  role: string;
}) {
  const [newRole, setNewRole] = useState(role);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onUpdateRole = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await updateUserRole(id, newRole);
      toast.success("User role updated successfully!");
    } catch (error: any) {
      setSubmitError("Failed to update user role. Please try again.");
      toast.error("Failed to update user role.", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 bg-primary/4  p-6 shadow max-w-xl">
      <p className="text-sm text-text/80">User ID: {id}</p>
      <div className="mt-4">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-text/80 mb-1"
        >
          Role
        </label>
        <Select defaultValue={role} value={newRole} onValueChange={setNewRole}>
          <SelectTrigger id="role" className="mt-1 w-full">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            sideOffset={6}
            avoidCollisions={false}
            className="bg-background/80 backdrop-blur-md"
          >
            <SelectItem value="customer">customer</SelectItem>
            <SelectItem value="admin">admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <button
        className="mt-4 rounded bg-accent/20 text-accent px-4 py-2 text-sm hover:bg-accent/90 hover:text-text transition-colors"
        onClick={onUpdateRole}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Update Role"}
      </button>
      {submitError ? (
        <p className="mt-2 text-sm text-red-500">{submitError}</p>
      ) : null}
    </div>
  );
}
