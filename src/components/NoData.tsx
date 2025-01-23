const NoData = () => {
  return (
    <div className="flex justify-center items-center w-screen pt-20 flex-col-reverse gap-3">
      <div className="text-gray-500 font-bold text-2xl">No Data found</div>
      <div>
        <img
          src="/noData.svg"
          height={300}
          width={300}
          className="opacity-40"
          alt=""
        />
      </div>
    </div>
  );
};

export default NoData;
