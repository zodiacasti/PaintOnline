import React from "react";
import "../styles/toolbar.scss";
import toolState from "../store/toolState";

export default function SettingBar() {
  return (
    <div className="setting-bar">
      <label htmlFor="line-width">Толщина линии</label>
      <input
        style={{ margin: "0 10px" }}
        onChange={(e) => toolState.setLineWidth(e.target.value)}
        type="number"
        id="line-width"
        defaultValue={1}
        min={1}
        max={50}
      />
      <label htmlFor="stroke-color">Цвет обводки</label>
      <input
        type="color"
        id="stroke-color"
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
      />
    </div>
  );
}
