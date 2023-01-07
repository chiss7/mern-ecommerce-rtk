import { useState, useEffect } from "react";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import { getIncomeStatsRequest, getOrderStatsRequest, getUserStatsRequest } from "../../redux/api";
import Chart from "./summary-components/Chart";
import Widget from "./summary-components/Widget";
import { toast } from "react-toastify";
import Transactions from "./summary-components/Transactions";
import AllTimeData from "./summary-components/AllTimeData";

export const Summary = () => {
  const [users, setUsers] = useState([]);
  const [usersPerc, setUsersPerc] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState(0);
  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState(0);

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
        toast.error(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getOrderStatsRequest()
        res.data.sort(compare);
        setOrders(res.data);
        setOrdersPerc(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getIncomeStatsRequest()
        res.data.sort(compare);
        setIncome(res.data);
        setIncomePerc(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100);
      } catch (error) {
        toast.error(error.message);
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
      color: "text-[#666cff]",
      bgcolor: "bg-[#666cff]",
      percentage: usersPerc,
    },
    {
      icon: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Orders",
      color: "text-[#26c6f9]",
      bgcolor: "bg-[#26c6f9]",
      percentage: ordersPerc,
    },
    {
      icon: <FaChartBar />,
      digits: income[0]?.total ? income[0]?.total : "",
      isMoney: true,
      title: "Earnings",
      color: "text-[#fdb528]",
      bgcolor: "bg-[#fdb528]",
      percentage: incomePerc,
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center py-5 gap-2 lg:flex-row lg:items-start xl:w-11/12 xl:m-auto">
      <div className="bg-white w-80 min-h-[42rem] sm:w-2/3 md:w-5/6 lg:w-2/3 lg:min-h-[32rem] shadow-lg rounded-md overflow-hidden p-3">
        <div className="overview">
          <div className="mb-4">
            <h2 className="text-center font-extrabold text-2xl">Overview</h2>
            <p className="text-center">How your shop is performing compared to the previous month.</p>
          </div>
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
            {data.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </div>
        </div>
        <Chart />
      </div>
      <div className="bg-white w-80 min-h-[10rem] sm:w-2/3 md:w-5/6 lg:w-1/3 shadow-lg rounded-md overflow-hidden p-3">
        <Transactions />
        <AllTimeData />
      </div>
    </div>
  );
};
