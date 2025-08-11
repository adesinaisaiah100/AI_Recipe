import React from 'react';
import { createRoot } from 'react-dom/client';
import './input.css';
import Main  from "./components/Main";
import Header from "./components/header";
// filepath: /c:/Users/Isaiah/project9/src/index.js


const root = createRoot(document.getElementById("root"))


root.render(
  <>
    <Header />
    <Main />
  </>
)