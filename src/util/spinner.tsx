import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <ClipLoader color="#1f2937" size={24} />
    </div>
  );
};

export default Spinner;
