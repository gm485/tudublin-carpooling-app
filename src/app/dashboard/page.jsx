'use client'

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [carpools, setCarpools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarpools = async () => {
      try {
        const res = await fetch("/api/carpools");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch carpools");
        setCarpools(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarpools();
  }, []);

  if (loading) return <p>Loading carpools...</p>;
  if (error) return <p style={{color: "red"}}>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Carpool Dashboard</h1>
      {carpools.length === 0 && <p>No carpools found.</p>}

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Seats Available</th>
            <th>Map</th>
          </tr>
        </thead>
        <tbody>
          {carpools.map(c => (
            <tr key={c._id}>
              <td>{c.origin}</td>
              <td>{c.destination}</td>
              <td>{new Date(c.date).toISOString()}</td>
              <td>{c.seatsAvailable}</td>
              <td>
                {/*<CarpoolMap origin={{ lat: c.originLat, lng: c.originLng }} zoom={12} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
