const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
require("dotenv").config();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req,res) => {
	//getting the required data from the request
	let code = req.body.code;
	let language = req.body.language;
	let input = req.body.input;

	if (language === "python") {
		language="py"
	}
  if (language === "java") {
		language="java"
	}
  if (language === "C++") {
		language="cpp"
	}
  if (language === "C") {
		language="c"
	}

	let data = ({
		"code": code,
		"language": language,
		"input": input
	});
	
const config = {
    method: 'POST',
  url: process.env.API_URL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': 'codex7.p.rapidapi.com'
  },
  data:data
};

axios(config)
.then((response)=>{
    res.send(response.data)
    console.log(response.data)
}).catch((error)=>{
    console.log(error);
});
})

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
