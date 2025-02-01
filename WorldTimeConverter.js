import React, { useState } from "react";

export default function WorldTimeConverter() {
  const [time, setTime] = useState("");
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("America/New_York");
  const [convertedTime, setConvertedTime] = useState("");

  const timeZones = [
    { label: "UTC", value: "UTC" },
    { label: "New York (EST)", value: "America/New_York" },
    { label: "London (GMT)", value: "Europe/London" },
    { label: "Tokyo (JST)", value: "Asia/Tokyo" },
    { label: "Sydney (AEST)", value: "Australia/Sydney" },
  ];

  const convertTime = () => {
    if (!time) return;

    const date = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);

    const options = { hour: "2-digit", minute: "2-digit", timeZone: toZone };
    setConvertedTime(new Intl.DateTimeFormat("en-US", options).format(date));
  };

  return (
    <div className="container">
      <h2>World Time Zone Converter</h2>
      <div className="input-group">
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <select onChange={(e) => setFromZone(e.target.value)} value={fromZone}>
          {timeZones.map((tz) => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </select>
        <select onChange={(e) => setToZone(e.target.value)} value={toZone}>
          {timeZones.map((tz) => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </select>
        <button onClick={convertTime}>Convert</button>
      </div>
      {convertedTime && <p>Converted Time: {convertedTime}</p>}
    </div>
  );
}
