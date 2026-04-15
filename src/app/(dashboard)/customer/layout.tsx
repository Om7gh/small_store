import CutomerHeader from "@/components/layout/customer/header";
import BackBtn from "@/components/shared/BackBtn";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-4 flex min-h-screen w-full max-w-7xl flex-col gap-4 bg-background px-4 sm:my-6 sm:px-6 lg:px-8">
      <CutomerHeader />
      <BackBtn />
      <main className="w-full p-2 sm:p-4">{children}</main>
    </div>
  );
}

export default layout;
