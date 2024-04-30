import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import App from "./App";
import { SDKProvider, DisplayGate, type SDKInitOptions } from '@tma.js/sdk-react';
import eruda from 'eruda'
import { StateProvider } from "./utils/store";

eruda.init();

interface SDKProviderErrorProps {
  error: unknown;
}

function SDKProviderError({ error }: SDKProviderErrorProps) {
  return (
    <div>
      Oops. Something went wrong.
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

function SDKProviderLoading() {
  return <div>SDK is loading.</div>;
}

function SDKInitialState() {
  return <div>Waiting for initialization to start.</div>;
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <SDKProvider options={{ async: false }}>
    <DisplayGate
      error={SDKProviderError}
      loading={SDKProviderLoading}
      initial={SDKInitialState}
    >
      <StateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
    </DisplayGate>
  </SDKProvider>
);
