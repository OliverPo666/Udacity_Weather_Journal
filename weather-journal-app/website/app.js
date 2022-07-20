/* Global Variables */
const generateBtn = document.querySelector('#generate');
const zipInput = document.querySelector('#zip');
const feelingInput = document.querySelector('#feelings');
const content = document.querySelector('#content');
const temp = document.querySelector('#temp');
const date = document.querySelector('#date');
const example = "https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}";
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=c65724123b8285141e770eafaaa02c06&units=imperial";
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const madeURI = `${baseURI}${zipInput.value}${key}`;
    getData(madeURI)
        .then((data) => {
            cureData(data)
                .then((info) => {
                    postData("/add", info)
                        .then((data) => {
                            retreiveData("/all")
                                .then((data) => {
                                    updateUI(data);
                                })
                        })
                });
        });
});

const getData = async (url) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        if (result.cod == 200) {
            //console.log(result);
            return result;
        }
        else {
            //console.log(result.message);
            return result;
        }
    }
    catch (e) {
        console.log("error");
    }
};

const cureData = async (data) => {
    try {
        if (data.message) {
            return data;
        } else {
            const info = {
                newDate,
                feelingInput: feelingInput.value,
                temp: data.main.temp
            };
            //console.log(info);
            return info;
        }
    }
    catch (err) {
        console.error(err);
    }
};

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        //console.log(result);
        return result;
    }
    catch (err) {
        console.error(err);
    }
};

const retreiveData = async (url) => {
    const response = await fetch(url);
    try {
        const result = await response.json();
        //console.log(response);
        return result;
    }
    catch (err) {
        console.error(err);
    }
};

const updateUI = async (data) => {
    const response = await data;
    if (response.newDate) {
        date.innerHTML = response.newDate;
        temp.innerHTML = response.temp + "°F";
        content.innerHTML = response.feelingInput;
    }
    else {
        alert("Error!");
    }
};
