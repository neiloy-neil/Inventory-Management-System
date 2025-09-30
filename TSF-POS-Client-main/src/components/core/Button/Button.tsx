import "./button.scss";

const Button = ({
  title,
  onClick,
  loading,
  type = "button",
  className,
  ...otherProps
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${className} core__button modern-btn`}
      onClick={onClick}
      {...otherProps}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="modern-loader"></span>
          Loading...
        </>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;