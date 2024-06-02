interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="${fullWidth ? 'w-full' : 'w-fit'} ${secondary 'bg-white' 'bg-sky-500'}
        ${'text-black' 'text-white'} ${'border-black' 'border-sky-500'} ${large
        'text-xl' 'text-md'} 'px-5' 'px-4'} 'py-3' 'py-2'} ${outline 'bg-transparent'
        ''} 'border-white' 'text-white' rounded-full border-2 font-semibold transition
        hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {label}
    </button>
  );
};

export default Button;
