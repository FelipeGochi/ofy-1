import React from "react";
import { render } from "react-dom";
import './index.scss'
import { App } from "./pages";

window.__localeId__ = 'ptBR'

const container = document.getElementById("app");
render(<App />, container);