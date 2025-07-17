import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import api from '../../services/api';
import '../../admincsscomponents/Charts/ContactStatsChart.css';

const REASON_COLORS = {
  'General Inquiry': '#2d2e5f',
  Pricing: '#a1855e',
  'Bulk Order': '#e74c3c',
  Offers: '#e0d8cf',
  Other: '#fff'
};

const ReasonBreakdownChart = () => {
  const [reasonData, setReasonData] = useState([]);

  useEffect(() => {
    api.getAllContacts().then((contacts) => {
      const grouped = {};
      contacts.forEach((c) => {
        const reason = c.reason?.trim() || 'Other';
        grouped[reason] = (grouped[reason] || 0) + 1;
      });

      const chartData = Object.entries(grouped).map(([name, value]) => ({
        name,
        value,
        fill: REASON_COLORS[name] || '#2e2e5f'
      }));

      setReasonData(chartData);
    }).catch(console.error);
  }, []);

  return (
    <motion.div
      className="reason-chart-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="reason-chart-title">Contact Reasons Analytics</h2>
      <div className="reason-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={reasonData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              
              label
              animationDuration={1000}
            >
              {reasonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ReasonBreakdownChart;
