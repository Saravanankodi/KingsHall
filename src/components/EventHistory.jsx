import { useEffect, useState } from "react";
import "../css/components/event-history.css";
import axios from "axios";
import download from "../assets/img/download.png"
function EventHistory({ hallname }) {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `https://wqy9bxpoui.execute-api.us-east-1.amazonaws.com/prod/Halls_Details?hall_name=${hallname}`
        );
  
        console.log("API response:", response.data);
  
        const historyData = (Array.isArray(response.data) ? response.data : response.data.data || []).map((item) =>
          Object.fromEntries(
            Object.entries(item).map(([key, value]) => [key, value.S || value.N || value])
          )
        );
  
        setHistory(historyData);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Failed to fetch history. Please try again later.");
      }
    };
  
    fetchHistory();
  }, [hallname]);
  
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  const downloadCSV = () => {
    const csvRows = [];
    const headers = [
      "Staff Name",
      "Department",
      "Event Starts",
      "Event Ends",
      "Event Details",
      "Phone No.",
    ];
    csvRows.push(headers.join(",")); 

    history.forEach((record) => {
      const row = [
        record.name || "N/A",
        record.department || "N/A",
        record.event_start || "N/A",
        record.event_end || "N/A",
        record.event_detail || "N/A",
        record.phone || "N/A",
      ];
      csvRows.push(row.join(",")); 
    });

    const csvContent = `data:text/csv;charset=utf-8,${csvRows.join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${hallname}_booking_history.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="event-history">
      <h1 className="welcome-text">{hallname} Hall Booking History</h1>
      {error ? (
        <p className="error-text">{error}</p>
      ) : history.length === 0 ? (
        <p>No booking history found for {hallname}!</p>
      ) : (
        <>
          <button className="download-btn" onClick={downloadCSV}>
            Download
            <img src={download} alt="" className="download-icon"/>
          </button>
          <table className="event-history-table" border={1} cellPadding={10}>
            <thead>
              <tr>
                <th className="table-heading">Staff Name</th>
                <th className="table-heading">Department</th>
                <th className="table-heading">Event Starts</th>
                <th className="table-heading">Event Ends</th>
                <th className="table-heading">Event Details</th>
                <th className="table-heading">Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(history) &&
                history.map((record, index) => (
                  <tr key={index}>
                    <td className="table-text">{record.name || "N/A"}</td>
                    <td className="table-text">{record.department || "N/A"}</td>
                    <td className="table-text">{formatDate(record.event_start || "N/A")}</td>
                    <td className="table-text">{formatDate(record.event_end || "N/A")}</td>
                    <td className="table-text">{record.event_detail || "N/A"}</td>
                    <td className="table-text">{record.phone || "N/A"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

export default EventHistory;
