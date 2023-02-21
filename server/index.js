const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
	//getting the required data from the request
	let code = req.body.code;
	let language = req.body.language;
	let input = req.body.input;

	if (language === "python") {
		language="py"
	}

	let data = ({
		"code": code,
		"language": language,
		"input": input
	});
	
const options = {
    method: 'POST',
  url: 'https://codex7.p.rapidapi.com/',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '0e4fe4b833msha44a0e2f489846dp124b43jsn883d5de5f61c',
    'X-RapidAPI-Host': 'codex7.p.rapidapi.com'
  },
  data:data
};

axios.request(options).then(function (res) {
	console.log(res.data);
}).catch(function (error) {
	console.error(error);
});
})
app.get("/output", (req, res) => {
   
const config = {
    method: 'GET',
    url: 'https://codex7.p.rapidapi.com/list',
    headers: {
      'X-RapidAPI-Key': '0e4fe4b833msha44a0e2f489846dp124b43jsn883d5de5f61c',
      'X-RapidAPI-Host': 'codex7.p.rapidapi.com'
    }
  };
  
  axios.request(config).then(function (res) {
      console.log(res.data);
  }).catch(function (error) {
      console.error(error);
  });
});

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
