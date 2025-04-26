import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const AdminWelcome = () => {
  const { currentUser, users, fetchUsers } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUsers();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter out users with role "warden"
  const filteredUsers = users.filter((user) => user.role !== "warden");

  // Data transformations for visualizations
  const academicYearData = filteredUsers.reduce((acc, user) => {
    const { academicYear } = user;
    if (!acc[academicYear]) acc[academicYear] = 0;
    acc[academicYear]++;
    return acc;
  }, {});

  const courseData = filteredUsers.reduce((acc, user) => {
    const { course } = user;
    if (!acc[course]) acc[course] = 0;
    acc[course]++;
    return acc;
  }, {});

  const roleData = filteredUsers.reduce((acc, user) => {
    const { role } = user;
    if (!acc[role]) acc[role] = 0;
    acc[role]++;
    return acc;
  }, {});

  const academicYearChartData = Object.entries(academicYearData).map(
    ([name, value]) => ({ name, value })
  );

  const courseChartData = Object.entries(courseData).map(([name, value]) => ({
    name,
    value,
  }));

  const roleChartData = Object.entries(roleData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {currentUser?.fullName} ({currentUser?.email})
      </h1>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Users by Academic Year</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={academicYearChartData}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {academicYearChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Users by Course</h3>
          <LineChart width={500} height={300} data={courseChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Users by Role</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={roleChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminWelcome;
