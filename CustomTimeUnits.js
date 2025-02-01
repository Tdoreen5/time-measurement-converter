import React, { useState } from "react";

export default function CustomTimeUnits() {
  const [units, setUnits] = useState([]);
  const [unitName, setUnitName] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const addOrUpdateUnit = () => {
    if (!unitName || !unitValue) return;
    
    const updatedUnits = [...units];
    
    if (editingIndex !== null) {
      updatedUnits[editingIndex] = { name: unitName, value: unitValue };
      setEditingIndex(null);
    } else {
      updatedUnits.push({ name: unitName, value: unitValue });
    }
    
    setUnits(updatedUnits);
    setUnitName("");
    setUnitValue("");
  };

  const deleteUnit = (index) => {
    setUnits(units.filter((_, i) => i !== index));
  };

  const editUnit = (index) => {
    setUnitName(units[index].name);
    setUnitValue(units[index].value);
    setEditingIndex(index);
  };

  return (
    <div className="container">
      <h2>Custom Time Units</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Unit Name (e.g., Pomodoro)"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Seconds (e.g., 1500)"
          value={unitValue}
          onChange={(e) => setUnitValue(e.target.value)}
        />
        <button onClick={addOrUpdateUnit}>
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul className="unit-list">
        {units.map((unit, index) => (
          <li key={index}>
            <span>{unit.name}: {unit.value} seconds</span>
            <button onClick={() => editUnit(index)}>Edit</button>
            <button onClick={() => deleteUnit(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
