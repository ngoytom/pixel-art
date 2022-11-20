import React, { useState } from "react";
import "../styles/editor.scss";
import { CirclePicker } from "react-color";
import DrawingPanel from "./DrawingPanel";

export default function Editor() {
    const [panelWidth, setPanelWidth] = useState(16);
    const [panelHeight, setPanelHeight] = useState(16);
    const [hideOptions, setHideOptions] = useState(false);
    const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
    const [buttonText, setButtonText] = useState("start drawing");
    const [selectedColor, setColor] = useState("#f44336");

    function initializeDrawingPanel() {
        if (panelWidth >= 1 && panelWidth <= 50 && panelHeight >= 1 && panelHeight <= 50) {
            setHideOptions(!hideOptions);
            setHideDrawingPanel(!hideDrawingPanel);

            buttonText === "start drawing"
                ? setButtonText("reset")
                : setButtonText("start drawing");
        }
        else {
            window.alert("Height and Width must be between 1-50!")
        }
    }

    function changeColor(color) {
        setColor(color.hex);
    }

    return (
        <div id="editor">
            <h1>Pixel Drawer</h1>
            {hideDrawingPanel && <h2>Enter Panel Dimensions</h2>}
            {hideDrawingPanel && (
                <div id="options">
                    <div className="option">
                        <input
                            type="number"
                            className="panelInput"
                            defaultValue={panelWidth}
                            onChange={(e) => {
                                setPanelWidth(e.target.value);
                            }}
                            min="1"
                            max="50"
                        />
                        <span>Width</span>
                    </div>
                    <div className="option">
                        <input
                            type="number"
                            className="panelInput"
                            defaultValue={panelHeight}
                            onChange={(e) => {
                                setPanelHeight(e.target.value);
                            }}
                            min="1"
                            max="50"
                        />
                        <span>Height</span>
                    </div>
                </div>
            )}

            <button onClick={initializeDrawingPanel} className="button">
                {buttonText}
            </button>

            {hideOptions && (
                <CirclePicker color={selectedColor} onChangeComplete={changeColor} />
            )}

            {hideOptions && (
                <DrawingPanel
                    width={panelWidth}
                    height={panelHeight}
                    selectedColor={selectedColor}
                />
            )}
        </div>
    );
}
