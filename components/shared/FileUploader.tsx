'use client';

import { useUploadThing } from '@/lib/uploadthing';
import { Progress } from '@radix-ui/react-progress';
import {
  ImagePlus,
  Loader2,
  MousePointerSquareDashed,
  Upload,
} from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { toast } from 'react-toastify';

export const FileUploader = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [newUrl, setNewUrl] = useState('');

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const imageURL = data.serverData.imageURL;
      startTransition(() => {
        router.push(`${pathName}?url=${imageURL}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    toast.error(
      `${file.file.type} type is not supported. Please choose a PNG, JPG, or JPEG image instead.`
    );
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles);

    setIsDragOver(false);
  };

  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    const url = searchParams.get('url');
    setNewUrl(url!);
  }, [searchParams]);

  return (
    <div className='grid gap-2'>
      {newUrl ? (
        <Image
          alt='Product image'
          className='aspect-square w-full h-48 rounded-md object-cover'
          height='300'
          src={newUrl}
          width='300'
        />
      ) : (
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className='w-full h-48 p-2 text-center flex-1 flex flex-col items-center justify-center rounded-md border border-dashed'
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className='h-6 w-6 text-zinc-500 mb-2' />
              ) : isUploading || isPending ? (
                <Loader2 className='animate-spin h-6 w-6 text-zinc-500 mb-2' />
              ) : (
                <ImagePlus className='h-6 w-6 text-zinc-500 mb-2' />
              )}
              <div className='flex flex-col justify-center mb-2 text-sm text-zinc-700'>
                {isUploading ? (
                  <div className='flex flex-col items-center'>
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className='mt-2 w-40 h-2 bg-gray-300'
                    />
                  </div>
                ) : isPending ? (
                  <div className='flex flex-col items-center'>
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className='font-semibold'>Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className='font-semibold'>Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>

              {isPending ? null : (
                <p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      )}

      <div className='grid grid-cols-3 gap-2'>
        <button>
          <Image
            alt='Product image'
            className='aspect-square w-full rounded-md object-cover'
            height='84'
            src='/placeholder.svg'
            width='84'
          />
        </button>
        <button>
          <Image
            alt='Product image'
            className='aspect-square w-full rounded-md object-cover'
            height='84'
            src='/placeholder.svg'
            width='84'
          />
        </button>
        <button className='flex aspect-square w-full items-center justify-center rounded-md border border-dashed'>
          <Upload className='h-4 w-4 text-muted-foreground' />
          <span className='sr-only'>Upload</span>
        </button>
      </div>
    </div>
  );
};
