"use client";

import { useState } from "react";

import {
  FaPlus,
  FaShieldAlt,
  FaUser,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
  status: "active" | "inactive";
};

const Sheet7 = () => {
  const [users, setUsers] = useState<UserType[]>([
    {
      id: "1",
      name: "Ritik Sharma",
      email: "ritik@gmail.com",
      role: "admin",
      status: "active",
    },
    {
      id: "2",
      name: "Aman Verma",
      email: "aman@gmail.com",
      role: "user",
      status: "inactive",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user" as UserType["role"],
    status: "active" as UserType["status"],
  });

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const addUser = () => {
    if (!form.name || !form.email) return;

    setUsers((prev) => [...prev, { id: String(prev.length + 1), ...form }]);

    setForm({ name: "", email: "", role: "user", status: "active" });
    setOpen(false);
  };

  return (
    <div className="theme-injected w-full space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-[300px]"
        />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="ml-1">
              <FaPlus className="size-4" />
              New User
            </Button>
          </SheetTrigger>

          <SheetContent className="space-y-6 p-4 ">
            <SheetHeader className="p-0">
              <SheetTitle>Create User</SheetTitle>
              <SheetDescription>
                Add a new user to your workspace
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={form.role}
                  onValueChange={(v: UserType["role"]) =>
                    setForm({ ...form, role: v })
                  }
                >
                  <SelectTrigger className="flex w-full items-center gap-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <FaShieldAlt className="text-primary size-4" />
                        Admin
                      </div>
                    </SelectItem>

                    <SelectItem value="user">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-muted-foreground size-4" />
                        User
                      </div>
                    </SelectItem>

                    <SelectItem value="viewer">
                      <div className="flex items-center gap-2">
                        <FaEye className="text-muted-foreground size-4" />
                        Viewer
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v: UserType["status"]) =>
                    setForm({ ...form, status: v })
                  }
                >
                  <SelectTrigger className="flex w-full items-center gap-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary size-4" />
                        Active
                      </div>
                    </SelectItem>

                    <SelectItem value="inactive">
                      <div className="flex items-center gap-2">
                        <FaTimesCircle className="text-muted-foreground size-4" />
                        Inactive
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SheetFooter className="-mb-1 p-0">
              <Button onClick={addUser}>Create</Button>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="overflow-x-scroll rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left font-medium">Name</th>
              <th className="p-3 text-left font-medium">Email</th>
              <th className="p-3 text-left font-medium">Role</th>
              <th className="p-3 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="text-muted-foreground p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3 capitalize">{user.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-muted-foreground p-6 text-center"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sheet7;
