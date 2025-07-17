import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import api from '../../services/api';
import '../../admincsscomponents/Charts/UserVisitChart.css';

const UserVisitChart = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [range, setRange] = useState('daily');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    api.getAllUserData().then(data => {
      setAllUsers(data);
    });
  }, []);

  useEffect(() => {
    const grouped = {};
    allUsers.forEach((user) => {
      const date = dayjs(user.timestamp);
      let key = range === 'daily'
        ? date.format('YYYY-MM-DD')
        : range === 'monthly'
        ? date.format('YYYY-MM')
        : date.format('YYYY');
      grouped[key] = (grouped[key] || 0) + 1;
    });
    const result = Object.entries(grouped).map(([date, count]) => ({ date, count }));
    setChartData(result);
  }, [allUsers, range]);

  return (
    <motion.div
      className="chart-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="visited-chart-title">User Visit Analytics</h2>
      <div className="button-group">
        {['daily', 'monthly', 'yearly'].map(type => (
          <button
            key={type}
            className={`filter-button ${range === type ? 'active' : ''}`}
            onClick={() => setRange(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#000000" />
            <YAxis allowDecimals={false} stroke="#000000" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', color: '#000000' }} />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#2d2e5f" strokeWidth={3} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserVisitChart;
