import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./summary-components/Widget";

export const Summary = () => {
  const data = [
    {
      icon: <FaUsers />,
      digits: 50,
      isMoney: false,
      title: "Users",
      color: "rgb(102, 108, 255)",
      bgcolor: "rgba(102, 108, 255, 0.12)",
      percentage: 30,
    },
    {
      icon: <FaClipboard />,
      digits: 70,
      isMoney: false,
      title: "Orders",
      color: "rgb(38, 198, 249)",
      bgcolor: "rgba(38, 198, 249, 0.12)",
      percentage: 20,
    },
    {
      icon: <FaChartBar />,
      digits: 5000,
      isMoney: true,
      title: "Earnings",
      color: "rgb(253, 181, 40)",
      bgcolor: "rgba(253, 181, 40, 0.12)",
      percentage: 60,
    },
  ];
  return (
    <div className="summary">
      <div className="main-starts">
        <div className="overview">
          <div className="summary-title">
            <h2>Overview</h2>
            <p>How your shop is performing compared to the previous month.</p>
          </div>
          <div className="widget-wrapper">
            {data.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
      <div className="side-starts"></div>
    </div>
  );
};
