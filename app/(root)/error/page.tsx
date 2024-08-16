import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const AuthErrorPage = () => {
  return (
    <div className="flex w-full items-center justify-center">
      Opps!! samething went wrong
      <ExclamationTriangleIcon className="text-destructive" />
    </div>
  );
};

export default AuthErrorPage;
