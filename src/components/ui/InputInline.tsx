import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RiSearch2Line } from "react-icons/ri";

export function InputInline() {
  return (
    <Field orientation="horizontal">
      <Input
        type="search"
        placeholder="Search..."
        className="border-none outline-none shadow-background shadow-md hover:bg-background focus:bg-background focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 px-4"
      />
      <Button className="px-0">
        <RiSearch2Line size={20} />
      </Button>
    </Field>
  );
}
