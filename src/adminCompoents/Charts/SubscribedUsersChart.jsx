import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';
import api from '../../services/api';
import '../../admincsscomponents/Charts/SubscribedUsersChart.css';
import { motion } from 'framer-motion';

const SubscribedUsersChart = () => {
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [filterType, setFilterType] = useState('daily');

  useEffect(() => {
    api.getAllSubscriptions()
      .then(setUsers)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const grouped = {};

    users.forEach((user) => {
      const date = dayjs(user.createdAt);
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
      className="subscribed-chart-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="subscribed-chart-title">Subscription Analytics</h2>

      <div className="subscribed-filter-buttons">
        {['daily', 'monthly', 'yearly'].map((type) => (
          <button
            key={type}
            className={`filter-btn ${filterType === type ? 'active' : ''}`}
            onClick={() => setFilterType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#2d2e5f" />
            <YAxis allowDecimals={false} stroke="#2d2e5f" />
            <Tooltip />
            <Bar dataKey="count" fill="#2d2e5f" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SubscribedUsersChart;
