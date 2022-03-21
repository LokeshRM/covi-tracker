var world_data = [["Country","infected","deaths"]];

fetching();
function fetching(){
    const fetch_api = async ()=>{
        await fetch("https://api.covid19api.com/summary")
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log(res);
            res.Countries.forEach(data=>{
                let dataSingle = [];
                if(data.Country.indexOf(' ') >= 0){
                    dataSingle.push(data.CountryCode);
                }else {
                    dataSingle.push(data.Country);
                }

                dataSingle.push(data.TotalConfirmed);
                dataSingle.push(data.TotalDeaths);
                world_data.push(dataSingle);
            })
        })
        .catch(err => {
            console.error(err);
        });
        load_ui();
    }
    fetch_api();
}

function load_ui(){
    google.charts.load("current", {
        packages: ["geochart"],
      });
      google.charts.setOnLoadCallback(drawRegionsMap);
    
      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable(world_data);

    
        var chart = new google.visualization.GeoChart(
          document.getElementById("regions_div")
        );
    
        chart.draw(data);
      }
}

