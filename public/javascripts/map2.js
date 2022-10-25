
const getParams = async () => {

    var marker = L.marker([51.5, -0.09]);
    var marker2 = L.marker([51.5, -0.09]);
    var marker12 = L.marker([51.5, -0.09]);
    var marker22 = L.marker([51.5, -0.09]);
    var map = L.map('map2').setView([51.505, -0.09], 13);

    //INTENTO HISTORICAL 2:
    

     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
     attribution: '© OpenStreetMap',
     }).addTo(map);
    marker.addTo(map);
    marker2.addTo(map);
    marker12.addTo(map);
    marker22.addTo(map);
    var plyln = [];
    var Since = document.getElementById('Since').value;
    var Until = document.getElementById('Until').value;
    Since = Since.substr(0,4) + Since.substr(5,2) + Since.substr(8,2) + Since.substr(11,2) + Since.substr(14,2);
    Until = Until.substr(0,4) + Until.substr(5,2) + Until.substr(8,2) + Until.substr(11,2) + Until.substr(14,2);
    console.log(Since,Until); 
    
    if (Number(Until) < Number(Since)){
        alert("Please enter a valid date.")
    } 
    if (Number(Until) == ''){
        alert("Please enter a valid date.")
    } else if (Number(Since) == ''){
        alert("Please enter a valid date.")
    }


    //  Historical of a location
    document.getElementById("historicaltable").style.display = "block";
    fetch(`/datajson?Since=${Since}&Until=${Until}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    },
    ).then(response => {
        if (response.ok) {
            response.json().then(json => {
                const data = json;

                var j1;
                var j2;
                var latlong = []
                var latlong1 =[];
                var latlong2 =[];
                var len = Object.keys(data).length;
                console.log(len);
                //marcadores de inicio y fin:
                j1 = data[0];
                j2 = data.pop();
                data.push(j2);

                latlong1 = [Number(j1.Latitude), Number(j1.Longitude)]
                latlong2 = [Number(j2.Latitude), Number(j2.Longitude)]
                console.log(latlong1);
                console.log(latlong2);
                marker.setLatLng(latlong1);
                marker2.setLatLng(latlong2);
                map.setView(latlong1);
            
                console.log(data);
                //Polilinea:
                for (i=0; i < len; i++){
                    latlong = [Number(data[i].Latitude), Number(data[i].Longitude)]
                    plyln.push(latlong);
                    console.log(plyln);
                }       
                lineField = L.polyline(plyln, {color: 'blue'}).addTo(map);
                    //Historical 2:

                    lineField.on('click', function(e) {
                        //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
                        lineField.bindPopup("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
                        document.getElementById('Lat').value = e.latlng.lat;
                        document.getElementById('Lng').value = e.latlng.lng;
                    });
            
            });
        }
    });
    //VEHICLE #2:
    
    var plyln2 = [];
    var Since2 = document.getElementById('Since2').value;
    var Until2 = document.getElementById('Until2').value;
    Since2 = Since2.substr(0,4) + Since2.substr(5,2) + Since2.substr(8,2) + Since2.substr(11,2) + Since2.substr(14,2);
    Until2 = Until2.substr(0,4) + Until2.substr(5,2) + Until2.substr(8,2) + Until2.substr(11,2) + Until2.substr(14,2);
    console.log(Since2,Until2); 
    
    if (Number(Until2) < Number(Since2)){
        alert("Please enter a valid date.")
    } 
    if (Number(Until2) == ''){
        alert("Please enter a valid date.")
    } else if (Number(Since2) == ''){
        alert("Please enter a valid date.")
    }


    //  Historical of a location
    document.getElementById("historicaltable").style.display = "block";
    fetch(`/datajson2?Since2=${Since2}&Until2=${Until2}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    },
    ).then(response => {
        if (response.ok) {
            response.json().then(json => {
                const data2 = json;

                var j12;
                var j22;
                var latlong2v = []
                var latlong12 =[];
                var latlong22 =[];
                var len2 = Object.keys(data2).length;
                console.log(len2);
                //marcadores de inicio y fin:
                j12 = data2[0];
                j22 = data2.pop();
                data2.push(j22);

                latlong12 = [Number(j12.Latitude), Number(j12.Longitude)]
                latlong22 = [Number(j22.Latitude), Number(j22.Longitude)]
                console.log(latlong12);
                console.log(latlong22);
                marker12.setLatLng(latlong12);
                marker22.setLatLng(latlong22);
                map.setView(latlong12);
            
                console.log(data2);
                //Polilinea:
                for (i=0; i < len2; i++){
                    latlong2v = [Number(data2[i].Latitude), Number(data2[i].Longitude)]
                    plyln2.push(latlong2v);
                    console.log(plyln2);
                }       
                lineField2 = L.polyline(plyln2, {color: 'red'}).addTo(map);
                    //Historical 2:

                    lineField2.on('click', function(e) {
                        //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
                        lineField2.bindPopup("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
                        document.getElementById('Lat2').value = e.latlng.lat;
                        document.getElementById('Lng2').value = e.latlng.lng;
                    });
            
            });
        }
    })

}

const tableParams = async () => {
    var Latt = document.getElementById('Lat').value;
    var Lngg = document.getElementById('Lng').value;
    let body ="";
    fetch(`/datajson2?Lat=${Latt}&Lng=${Lngg}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    },
    ).then(response => {
        if (response.ok) {
            response.json().then(json => {
                const data = json;
                console.log(data);
                
                for(let i = 0; i < data.length; i++) {
                    let dt = (data[i].Time)
                    let dtm = dt.substr(0,4) + "-" + dt.substr(4,2) +  "-" + dt.substr(6,2) + "T" + 
                              dt.substr(8,2) + ":" + dt.substr(10,2);
                    body += `<tr><td>${data[i].ID}</td><td>${new Date(dtm).toLocaleDateString()+" "+new Date(dtm).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td></tr>`
                }
                document.getElementById('tparameters').innerHTML = body;
            })
            
        }
    });

    var Latt2 = document.getElementById('Lat').value;
    var Lngg2 = document.getElementById('Lng').value;
    let body2 ="";
    fetch(`/datajson2?Lat=${Latt2}&Lng=${Lngg2}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    },
    ).then(response => {
        if (response.ok) {
            response.json().then(json => {
                const data2 = json;
                console.log(data2);
                
                for(let i = 0; i < data.length; i++) {
                    let dt = (data2[i].Time)
                    let dtm = dt.substr(0,4) + "-" + dt.substr(4,2) +  "-" + dt.substr(6,2) + "T" + 
                              dt.substr(8,2) + ":" + dt.substr(10,2);
                    body2 += `<tr><td>${data2[i].ID}</td><td>${new Date(dtm).toLocaleDateString()+" "+new Date(dtm).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td></tr>`
                }
                document.getElementById('tparameters').innerHTML = body2;
            })
            
        }
    });

}
