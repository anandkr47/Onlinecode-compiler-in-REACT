import React from 'react';
import { useState } from 'react';
import './App.css';
import Editor from "@monaco-editor/react";
import Navbar from './Components/Navbar';
import Axios from 'axios';
import giphy from './giphy.gif';


function App() {

// State variable to set users source code
const [userCode, setUserCode] = useState(``);

// State variable to set editors default language
const [userLang, setUserLang] = useState("python");

// State variable to set editors default theme
const [userTheme, setUserTheme] = useState("vs-dark");

// State variable to set editors default font size
const [fontSize, setFontSize] = useState(20);

// State variable to set users input
const [userInput, setUserInput] = useState("");

// State variable to set users output
const [userOutput, setUserOutput] = useState("");
const [outputError, setoutputError] = useState("");
// Loading state variable to show spinner
// while fetching data
const [loading, setLoading] = useState(false);

const options = {
	fontSize: fontSize
}

function compile() {
	setLoading(true);
	if (userCode === ``) {
	return
	}
//http://localhost:8000/
	// Post request to compile endpoint
	Axios.post(`https://compiler-api.onrender.com/compile`, {
	code: userCode,
	language: userLang,
	input: userInput }).then((res) => {
	setUserOutput(res.data.output);
	setoutputError(res.data.error);
	}).then(() => {
	setLoading(false);
	})
}


	

// Function to clear the output screen
function clearOutput() {
	setUserOutput("");
}

// Function to download code as file
function downloadCode() {
	const fileName = document.getElementById("filename").value;
	if (!fileName) {
		alert("Please enter a filename");
		return;
	}

	const blob = new Blob([userCode], { type: "text/plain;charset=utf-8" });
	const link = document.createElement("a");
	link.href = window.URL.createObjectURL(blob);
	link.download = fileName;
	link.click();
}


return (
	<div className="App">
	<Navbar
		userLang={userLang} setUserLang={setUserLang}
		userTheme={userTheme} setUserTheme={setUserTheme}
		fontSize={fontSize} setFontSize={setFontSize}
	/>
	<div className="main">
		<div className="left-container">
		<Editor
			options={options}
			height="calc(100vh - 50px)"
			width="100%"
			theme={userTheme}
			language={userLang}
			defaultLanguage="python"
			defaultValue="# Enter your code here"
			onChange={(value) => { setUserCode(value) }}
		/>
		
		<button className="run-btn" onClick={() => compile()}>
			Run
		</button>
		</div>
		<div className="right-container">
		<div class="file-container">
		<input id="filename"placeholder="Specify a filename..." />
		<button id="Download" onClick={() => downloadCode()}>Download</button>
		</div>
		<h4>Input:</h4>
		<div className="input-box">
			<p>#If you want to give any input Then first give input then RUN the Code</p>
			<textarea id="code-inp" onChange=
			{(e) => setUserInput(e.target.value)}>
			</textarea>
		</div>
		<h4>Output:</h4>
		{loading ? (
			<div className="spinner-box">
			<img src={giphy} alt="Loading..." />
			</div>
		) : (
			<div className="output-box">
			<pre>{userOutput}</pre>
			<pre>{outputError}</pre>
			<button onClick={() => { clearOutput() }}
				className="clear-btn">
				Clear
			</button>
			</div>
		)}
		</div>
	</div>
	</div>
);
}

export default App;
