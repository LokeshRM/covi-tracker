const statistics = document.querySelector(".statistics");
const totalCases = document.querySelector(".totalcases .value");
const newCases = document.querySelector(".totalcases .newvalue"); 
const totalDeath = document.querySelector(".deaths .value");
const DeathLatest = document.querySelector(".deaths .newvalue");
const recoveredtotal = document.querySelector(".recovered .value");
const recoveredNew = document.querySelector(".recovered .newvalue");
const activeCases = document.querySelector(".active .value");
const select_item = document.querySelector("#select");
const select_item2 = document.querySelector("#select2");

const chart = document.getElementById("chart_covid").getContext("2d");

let deaths_list = [],recovered_list = [],cases_list = [],dates_data = [],fullData =[];
let date = new Date();
date = date.toISOString();
const dateArray = date.split("T");

console.log(dateArray);
api_fetch();
function api_fetch(){
    const fetching = async ()=> {
        await fetch("https://api.apify.com/v2/datasets/58a4VXwBBF0HtxuQa/items?format=json&clean=1")
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            console.log(data);
            arrLen = data.length;
            totalCases.innerHTML = data[arrLen - 1].totalCases;
            totalDeath.innerHTML = data[arrLen - 1].deaths;
            recoveredtotal.innerHTML = data[arrLen - 1].recovered;
            activeCases.innerHTML = data[arrLen - 1].activeCases;
            DeathLatest.innerHTML = "+" + data[arrLen - 1].deathsNew;
            recoveredNew.innerHTML = "+" + data[arrLen - 1].recoveredNew;
            newcases_no = data[arrLen - 1].totalCases - data[arrLen - 2].totalCases;
            newCases.innerHTML = "+" + newcases_no;
            fullData = data;
        })
        .catch(err=>{
            console.log(err);
        })
        UI();
    }
    fetching();
}


let my_chart;
function UI(){
chart_covid(14,"line");
}
function chart_covid(num,type) {
    let arrLen = fullData.length;
    cases_list = [];
    deaths_list = [];
    recovered_list = [];
    dates_data = [];
    for(var i=arrLen - num;i < arrLen;i++){
        cases_list.push(fullData[i].totalCases);
        deaths_list.push(fullData[i].deaths);
        recovered_list.push(fullData[i].recovered);
        dates_data.push(formatDate(fullData[i].lastUpdatedAtApify.split("T")[0]));
    }
  if (my_chart) {
    my_chart.destroy();
  }

  my_chart = new Chart(chart, {
    type: type,
    data: {
      datasets: [
        {
          label: "Cases",
          data: cases_list,
          fill: false,
          borderColor: "#FFF",
          backgroundColor: "#FFF",
          borderWidth: 1,
        },
        {
          label: "Recovered",
          data: recovered_list,
          fill: false,
          borderColor: "#009688",
          backgroundColor: "#009688",
          borderWidth: 1,
        },
        {
          label: "Deaths",
          data: deaths_list,
          fill: false,
          borderColor: "#f44336",
          backgroundColor: "#f44336",
          borderWidth: 1,
        },
      ],
      labels: dates_data,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}
const monthsNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  function formatDate(dateString) {
    let date = new Date(dateString);
  
    return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
  }

select_item.addEventListener("change",activity,false);
select_item2.addEventListener("change",activity,false);

function activity(){
    let time = {
      "2 weeks" : 14,
      "1 month" : 30,
      "6 months": 180,
      "year" : 365,
      "2 years" : 730
    }
    chart_covid(time[select_item.value],select_item2.value);
}