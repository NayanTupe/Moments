import { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 User Click Data</h1>

      {data.map((item, index) => (
        <div key={index}>
          <p>
            {item.action} - {new Date(item.time).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
