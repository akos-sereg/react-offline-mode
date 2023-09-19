import * as React from "react";
import { getConsumedLocalStorageSize, getMode, getPersistedResponsesCount } from './index';
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY_STATE, mode_off, mode_capturing, mode_serving } from "./constants";

const OfflineModeDevToolsWidget = () => {

  const [mode, setMode] = useState(getMode());

  // @ts-ignore
  const handleModeSelection = (mode) => {
      setMode(mode);
      localStorage.setItem(LOCAL_STORAGE_KEY_STATE, mode);
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      background: 'rgba(50, 117, 168)',
      color: '#fafafa',
      borderRadius: '5px',
      boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.35)',
      padding: '12px',
      width: '240px',
      fontSize: '9pt'
    }}>
      <span>{ getPersistedResponsesCount() } api calls captured ({ (getConsumedLocalStorageSize() / 1024 / 1024).toFixed(2) } MB)</span>
      <div>
        <br/>
        mode:&nbsp;
        <select
          onChange={(event) => handleModeSelection(event.target.value) }
          style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: '5px', outline: 'none' }}>
          <option value="mode_off">Off</option>
          <option value="mode_capturing">Capturing</option>
          <option value="mode_serving">Serving</option>
        </select>
      </div>
    </div>
  );
}

export default OfflineModeDevToolsWidget;
