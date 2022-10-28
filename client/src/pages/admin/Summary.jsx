import { useState, useEffect } from "react";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import { getUserStatsRequest } from "../../redux/api";
import Widget from "./summary-components/Widget";

export const Summary = () => {
  const [users, setUsers] = useState([]);
  const [usersPerc, setUsersPerc] = useState(0);

  const compare = (a, b) => {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getUserStatsRequest();
        res.data.sort(compare);
        setUsers(res.data);
        setUsersPerc(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: "Users",
      color: "rgb(102, 108, 255)",
      bgcolor: "rgba(102, 108, 255, 0.12)",
      percentage: usersPerc,
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
      percentage: -60,
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
