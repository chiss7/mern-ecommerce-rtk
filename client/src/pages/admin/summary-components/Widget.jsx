function Widget({ data }) {
  return (
    <div className="widget">
      <div className="icon">{data.icon}</div>
      <div className="text">
        <h3>
          {data.isMoney
            ? "$" + data.digits?.toLocaleString()
            : data.digits?.toLocaleString()}
        </h3>
        <p>{data.title}</p>
      </div>
      {data.percentage < 0 ? (
        <>
          <div className="percentage">{Math.floor(data.percentage) + "%"}</div>
        </>
      ) : (
        <>
          <div className="percentage">{Math.floor(data.percentage) + "%"}</div>
        </>
      )}
    </div>
  );
}

export default Widget;
