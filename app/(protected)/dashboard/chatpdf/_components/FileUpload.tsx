"use client";

import { uploadToS3 } from "@/lib/s3";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Inbox, Loader } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const FileUpload = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // let uploadId: any;
  const [isUploading, setIsUploading] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      console.log(file_key);
      console.log(file_name);
      const res = await axios.post("/api/create-chat", { file_key, file_name });

      return res.data;
    }, 
    onSuccess: (data) => { 
      toast.success("New chat created Successfully")
      queryClient.invalidateQueries({
        queryKey: ["pdfchats"],
      });
      redirect(`/dashboard/chatpdf/${data.chat_id}`)
    },

    onError: (e) => {
      toast.loading(`Error: ${e.message}`);
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      // Do something with the files
      console.log(acceptedFiles);
      const file = acceptedFiles[0];

      if (file.size > 10 * 1024 * 1024) {
        // if file is bigger than 10MBs
        toast.error(`Please uplaod a smaller file not bigger than 10mbs`);
        return;
      }

      try {
        setIsUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          toast.error("Samething went wrong");
          return;
        }
        mutate(data, {
          onSuccess: ({ chat_id }) => {
            toast.success("chat created Successfully");

            router.push(`/dashboard/chatpdf/${chat_id}`);
          },
          onError: (error) => {
            toast.error("error creating chat");
            console.log(error);
          },
        });
        console.log(data);
      } catch (error) {
        console.log("error to upload");
      } finally {
        setIsUploading(false);
      }
    },
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });
  return (
    <div className="rounded-lg bg-white p-2 dark:bg-gray-800">
      <div
        {...getRootProps()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-gray-50 py-8 dark:bg-gray-600"
      >
        <input {...getInputProps()} />
        {isPending || isUploading ? (
          <Loader className="h-10 w-10 animate-spin" />
        ) : (
          <>
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <>
                <Inbox className="h-10 w-10 text-blue-500" />
                <p className="mt-2 text-sm text-slate-400 dark:text-slate-900">
                  Drag 'n' drop some files here, or click to select files
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
