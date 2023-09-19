import * as React from "react";
import {
  setQuota,
  getQuota,
  getConsumedLocalStorageSize,
  getMode,
  getPersistedResponsesCount,
  clearStorage,
  getPersistedResponses,
} from './index';
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY_STATE, mode_off, mode_capturing, mode_serving, DEFAULT_QUOTA_IN_MB } from "./constants";

interface OfflineModeDevToolsWidgetProps {
  quotaInMb?: number;
}

const OfflineModeDevToolsWidget = (props: OfflineModeDevToolsWidgetProps) => {
  const [mode, setMode] = useState(getMode());
  const [random, setRandom] = useState(0);
  const [isExportModalOpen, setExportModalOpen] = useState(false);

  useEffect(() => {
    setQuota(props.quotaInMb ?? DEFAULT_QUOTA_IN_MB);
  }, [ props.quotaInMb ]);

  useEffect(() => {
    const intervalHandle = setInterval(() => {
      setRandom(Math.random());
    }, 1000);

    return () => {
      clearInterval(intervalHandle);
    };
  }, []);

  // @ts-ignore
  const handleModeSelection = (mode) => {
      setMode(mode);
      localStorage.setItem(LOCAL_STORAGE_KEY_STATE, mode);
      setRandom(Math.random());
  }

  const getBackground = () => {
    switch (mode) {
      case 'mode_capturing':
        return 'rgba(21, 158, 144)';
      case 'mode_serving':
        return 'rgba(50, 117, 168)';
      default:
        return 'rgba(107, 107, 107)';
    }
  }

  return (
    <div data-random={ random } style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      background: getBackground(),
      color: '#fafafa',
      borderRadius: '5px',
      boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.35)',
      padding: '12px',
      width: '280px',
      fontSize: '9pt'
    }}>
      <span>{ getPersistedResponsesCount() } api calls captured ({ (getConsumedLocalStorageSize() / 1024 / 1024).toFixed(2) } MB / { getQuota() } MB)</span>
      <div>
        <br/>
        <select
          onChange={(event) => handleModeSelection(event.target.value) }
          style={{ padding: '3px', backgroundColor: '#ffffff', color: '#000000', borderRadius: '5px', outline: 'none' }}>
          <option value="mode_off" selected={ mode === mode_off }>Off</option>
          <option value="mode_capturing" selected={ mode === mode_capturing }>Capturing</option>
          <option value="mode_serving" selected={ mode === mode_serving }>Serving</option>
        </select>
        <input
          style={{ marginLeft: '5px', padding: '3px 10px 3px 10px', backgroundColor: '#ffffff', color: '#000000', borderRadius: '5px', outline: 'none' }}
          type="button"
          value="Clear"
          onClick={ (event) => {
            event.preventDefault();
            clearStorage();
            setRandom(Math.random());
          }}
        />
        <input
          style={{ marginLeft: '5px', padding: '3px 10px 3px 10px', backgroundColor: '#ffffff', color: '#000000', borderRadius: '5px', outline: 'none' }}
          type="button"
          value="Export & Import"
          onClick={ (event) => {
            event.preventDefault();
            setExportModalOpen(true);
          }}
        />
      </div>
      { isExportModalOpen && (
        <div style={{ border: 'solid 1px ' + getBackground(), position: 'absolute', top: '100px', left: '0px', height: '200px', width: '340px', backgroundColor: '#f9f9f9', }}>
          <div style={{ padding: '5px', width: '100%', height: '28px', backgroundColor: getBackground() }}>
            asd
          </div>
          <textarea spellCheck={false} style={{ outline: 'none', width: '100%', height: 'calc(100% - 28px)', color: '#444444', }}>{ JSON.stringify(getPersistedResponses()) }</textarea>
        </div>
      ) }
    </div>
  );
}

export default OfflineModeDevToolsWidget;
