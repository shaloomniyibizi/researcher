import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function isBase64PDF(pdfData: string) {
  const base64Regex = /^data:application\/pdf;base64,/;
  return base64Regex.test(pdfData);
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

function generateBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const pathSegments = pathname.split('/').filter(Boolean); // Remove empty segments
  return pathSegments.map((segment, index) => ({
    name: capitalizeFirstLetter(segment), // Optionally capitalize names
    path: `/${pathSegments.slice(0, index + 1).join('/')}`,
  }));
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { generateBreadcrumbItems };

export function generateSlug(title: string) {
  const slug = title
    .toLowerCase() // Convert the title to lowercase
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[^\w\-]+/g, '') // Remove non-word characters except dashes
    .replace(/\-\-+/g, '-') // Replace multiple consecutive dashes with a single dash
    .replace(/^\-+/, '') // Remove dashes from the beginning
    .replace(/\-+$/, ''); // Remove dashes from the end
  return slug;
}
