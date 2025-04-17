import { Button } from "antd";
import styles from "./styles.module.scss";

export const CustomButton = ({ variant = "primary", fullWidth = false, className, children, ...props }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      case "danger":
        return styles.danger;
      case "success":
        return styles.success;
      default:
        return styles.primary;
    }
  };

  // Combine all classes, ensuring our custom class comes last for higher specificity
  const buttonClass = `ant-override ${className || ""} ${styles.button} ${getVariantClass()} ${
    fullWidth ? styles.fullWidth : ""
  }`;

  return (
    <Button className={buttonClass} {...props}>
      {children}
    </Button>
  );
};
