function Widget({ data }) {
  return (
    <div className="flex justify-between items-center w-full lg:gap-3 lg:justify-center">
      <div className={`${data.bgcolor} ${data.color} bg-opacity-10 p-3`}>{data.icon}</div>
      <div className="text-center lg:text-left">
        <h3 className="font-bold">
          {data.isMoney
            ? "$" + data.digits?.toLocaleString()
            : data.digits?.toLocaleString()}
        </h3>
        <p>{data.title}</p>
      </div>
      {data.percentage < 0 ? (
        <>
          <div className="text-right" style={{color: 'rgb(255, 77, 73)'}}>{Math.floor(data.percentage) + "%"}</div>
        </>
      ) : (
        <>
          <div className="text-right" style={{color: 'rgb(114, 225, 40)'}}>+{Math.floor(data.percentage) + "%"}</div>
        </>
      )}
    </div>
  );
}

export default Widget;
