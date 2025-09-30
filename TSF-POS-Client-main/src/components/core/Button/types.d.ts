type ButtonProps = {
  title: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
};
