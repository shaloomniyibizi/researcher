import AsideBar from "./dashboard/_components/AsideBar";
import DashboardHeader from "./dashboard/_components/DashboardHeader";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AsideBar />
      <div className="flex flex-col sm:pl-14">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
