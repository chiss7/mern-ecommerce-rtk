import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getWeekSalesRequest } from "../../../redux/api";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Chart = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const compare = (a, b) => {
    if (a._id > b._id) {
      return 1;
    }
    if (a._id < b._id) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getWeekSalesRequest();
        res.data.sort(compare);
        const newData = res.data.map((item) => {
          const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          return {
            day: days[item._id - 1],
            amount: item.total,
          };
        });
        setSales(newData);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center mt-10">
          <LoadingSpinner msg={'Loading Chart'} />
        </div>
      ) : (
        <div className="w-full h-80 mt-7 p-4">
          <h3 className="font-extrabold text-2xl text-center">Last 7 days Earnings (USD)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              className=""
              width={500}
              height={300}
              data={sales}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart;
