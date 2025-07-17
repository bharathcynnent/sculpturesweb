import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';
import api from '../../services/api';
import '../../admincsscomponents/Charts/PurchasedUsersChart.css';
import { motion } from 'framer-motion';

const PurchasedUsersChart = () => {
  const [users, setUsers] = useState([]);
  const [filterType, setFilterType] = useState('daily');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    api.getAllPurchasedUsers()
      .then(setUsers)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const grouped = {};
    users.forEach((user) => {
      const date = dayjs(user.purchaseDate);
      let key =
        filterType === 'daily'
          ? date.format('YYYY-MM-DD')
          : filterType === 'monthly'
          ? date.format('YYYY-MM')
          : date.format('YYYY');
      grouped[key] = (grouped[key] || 0) + 1;
    });

    const result = Object.entries(grouped).map(([date, count]) => ({ date, count }));
    setChartData(result);
  }, [users, filterType]);

  return (
    <motion.div
      className="purchased-chart-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="chart-title">Purchased Users Analytics</h2>

      <div className="chart-filter-buttons">
        {['daily', 'monthly', 'yearly'].map((type) => (
          <button
            key={type}
            className={`purchase-filter-btn ${filterType === type ? 'active' : ''}`}
            onClick={() => setFilterType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="purchased-area-chart">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
           <defs>
            <linearGradient id="colorPurchase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#2d2e5f" stopOpacity={0.7} />
              <stop offset="90%" stopColor="#2d2e5f" stopOpacity={1} />
            </linearGradient>
          </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#2d2e5f" />
            <YAxis allowDecimals={false} stroke="#2d2e5f" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#2d2e5f"
              fillOpacity={1}
              fill="url(#colorPurchase)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PurchasedUsersChart;
