import CutomerHeader from "@/components/layout/customer/header";
import BackBtn from "@/components/shared/BackBtn";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col gap-4 max-w-7xl mx-auto w-7xl my-8">
      <CutomerHeader />
      <BackBtn />
      {children}
    </div>
  );
}

export default layout;
