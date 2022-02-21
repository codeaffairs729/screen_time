const CheckboxField = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center my-1.5">
      <input type="checkbox" className="text-dtech-primary-light focus:ring-0 rounded-sm border-dtech-primary-light" value={label} />
      <span className="ml-2 font-medium text-xs text-gray-700">{label}</span>
    </div>
  );
};

export default CheckboxField;
