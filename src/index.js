import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './MyStyle.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import common_en from "./translations/en/common.json";
import common_jap from "./translations/jap/common.json";

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'en',                              // language to use
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },
        jap: {
            common: common_jap
        },
    },
});

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading</div>}>
      <I18nextProvider i18n={i18next}>
         <App />
      </I18nextProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
