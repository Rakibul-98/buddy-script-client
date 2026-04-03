interface AuthButtonProps {
  isLoading: boolean;
  loadingText: string;
  buttonText: string;
}

export default function AuthButton({ isLoading, loadingText, buttonText }: AuthButtonProps) {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        disabled={isLoading}
        className="w-49 lg:w-full rounded-sm bg-[#1890FF] px-4 py-3 text-white hover:bg-[#1890FF]/95 hover:shadow-lg focus:outline-none"
      >
        {isLoading ? loadingText : buttonText}
      </button>
    </div>
  );
}