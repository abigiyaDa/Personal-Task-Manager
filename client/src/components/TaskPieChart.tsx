import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface Props {
  completed: number;
  inProgress: number;
}

const TaskPieChart: React.FC<Props> = ({ completed, inProgress }) => {
  const total = completed + inProgress;

  const data = [
    { name: "Completed", value: completed },
    { name: "In Progress", value: inProgress },
    { name: "Remaining", value: Math.max(0, total - (completed + inProgress)) },
  ];

  const completedPercent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const progressPercent = total === 0 ? 0 : Math.round((inProgress / total) * 100);

  const COLORS = ["#eee3e3", "#7c3aed", "#eee"];

  return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <PieChart width={200} height={200} >
        <Pie
          data={data}
          dataKey="value"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <p>
        {completedPercent}% Completed | {progressPercent}% In Progress
      </p>
    </div>
  );
};

export default TaskPieChart;
