import Link from "next/link";
import { Icons } from "./Icons";

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          <div className="px-5 py-2">
            <Link href="#" className="text-base">
              Privacy Policy
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base">
              Terms of Service
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base">
              Contact Us
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <Link href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">Facebook</span>
            {/* Replace with actual Facebook icon */}
            <Icons.facebook className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">Twitter</span>
            {/* Replace with actual Twitter icon */}
            <Icons.gitHub className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">LinkedIn</span>
            {/* Replace with actual LinkedIn icon */}
            <Icons.linkedIn className="h-6 w-6" />
          </Link>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2024 Research Platform, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
