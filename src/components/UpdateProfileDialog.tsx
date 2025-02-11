"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";  // Import the close icon
import { useState } from "react";
import { User } from "@/types/User";  

interface UpdateProfileDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({ open, setOpen, user, setUser }) => {
  const [input, setInput] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setUser(input);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>  {/* Ensure `onOpenChange` updates `setOpen` */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogClose onClick={() => setOpen(false)} className="absolute right-4 top-4">
            <X className="h-5 w-5 cursor-pointer" />
          </DialogClose>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {["fullname", "email", "phoneNumber", "bio", "skills"].map((field) => (
            <div key={field} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field} className="text-right capitalize">
                {field}
              </Label>
              <Input
                id={field}
                name={field}
                type="text"
                value={input[field as keyof User] || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          ))}
        </div>

        <Button className="w-full my-4" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;





/*
"use client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
//import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { ChangeEvent, FormEvent, useState } from "react";
import { RootState } from "@/redux/store";

// 定义 Props 类型
interface UpdateProfileDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({ open, setOpen }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "", // 转换成字符串
    file: user?.profile?.resume || null as File | null,
  });

  // 处理输入框变更
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // 处理文件上传
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setInput({ ...input, file });
  };

  // 处理提交
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
*/