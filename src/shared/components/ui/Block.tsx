interface BlockProps {
  title: string;
  children: React.ReactNode;
  columns: string;
  width?: string;
}

const Block = ({
  title,
  children,
  columns,
  width = "col-span-1",
}: BlockProps) => {
  return (
    <div
      className={`${width} bg-block overflow-hidden rounded-lg shadow-[0_0px_8px_rgba(0,0,0,0.20)]`}
    >
      <div className="bg-block-header text-lg font-semibold border-b border-gray-300 p-4">
        {title}
      </div>
      <div className={`bg-white p-4 grid ${columns} gap-4`}>{children}</div>
    </div>
  );
};

export default Block;
