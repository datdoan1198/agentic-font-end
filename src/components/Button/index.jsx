import { Button } from "antd";
import { cn } from "@/lib/utils";

export const CustomButton = ({ variant = "primary", fullWidth = false, className, children, ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 hover:bg-blue-600 text-white border-blue-500";
      case "secondary":
        return "bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-200";
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white border-red-500";
      case "success":
        return "bg-green-500 hover:bg-green-600 text-white border-green-500";
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white border-blue-500";
    }
  };

  return (
    <Button className={cn(getVariantStyles(), fullWidth ? "w-full" : "", className)} {...props}>
      {children}
    </Button>
  );
};
