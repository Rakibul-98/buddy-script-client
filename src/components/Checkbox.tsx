interface CheckboxProps {
  label: string;
}

export default function Checkbox({ label }: CheckboxProps) {
  return (
    <div className="flex gap-2 items-center">
      <div className="h-4 w-4 rounded-full border border-[#1890FF] p-0.75">
        <div className="h-full w-full rounded-full bg-[#1890FF]" />
      </div>
      <p>{label}</p>
    </div>
  );
}