var redicon = L.icon({
    iconUrl: '../images/markred.png',
    iconSize: [190, 150],
})
var blueicon = L.icon({
    iconUrl: '../images/markblue.png',
    iconSize: [190, 150],
})

var marker = L.marker([51.5, -0.09], {icon: blueicon});
var marker2 = L.marker([51.5, -0.09], {icon: redicon});
var map = L.map('map').setView([10.963889, -74.796387], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap'
}).addTo(map);

marker.addTo(map);
marker2.addTo(map);
var url = "/read"
var url2 = "/read2"
var aplicacion = new function(){
    this.tparameters = document.getElementById("tparameters");
    var plyln = [];
    var plyln2 = [];
    //EDITAR EN UNA FUNCION LOOP ETERNO
    this.Leer = async function(){

        //VEHICULO #1
        var datos="";
        
        const response  = await fetch(url)
        const json = await response.json();

        console.log(json);
        (json).map(
            function (parameter,index, array){
                let dt = (parameter.Time)
                let dtm = dt.substr(0,4) + "-" + dt.substr(4,2) +  "-" + dt.substr(6,2) + "T" + 
                          dt.substr(8,2) + ":" + dt.substr(10,2);
                datos+="<tr>";
                datos+="<td>"+parameter.Plate+"</td>";
                datos+="<td>"+parameter.Latitude+"</td>";
                datos+="<td>"+parameter.Longitude+"</td>";
                datos+="<td>"+new Date(dtm).toLocaleDateString()+" "+new Date(dtm).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})+"</td>";
                datos+="</tr>";
                var latlong = [Number(parameter.Latitude), Number(parameter.Longitude)]
                marker.setLatLng(latlong);
                
                if (plyln.length == 0){
                    map.setView(latlong);
                }
            //Polilinea:
                        
                plyln.push(latlong);
                lineField = L.polyline(plyln, {color: 'blue'}).addTo(map);
            }
        );

        //VEHICULO #2
        var datos2="";
        
        const response2  = await fetch(url2)
        const json2 = await response2.json();

        console.log(json2);
        (json2).map(
            function (parameter,index, array){
                let dt2 = (parameter.Time)
                let dtm2 = dt2.substr(0,4) + "-" + dt2.substr(4,2) +  "-" + dt2.substr(6,2) + "T" + 
                          dt2.substr(8,2) + ":" + dt2.substr(10,2);
                datos+="<tr>";
                datos+="<td>"+parameter.Plate+"</td>";
                datos+="<td>"+parameter.Latitude+"</td>";
                datos+="<td>"+parameter.Longitude+"</td>";
                datos+="<td>"+new Date(dtm2).toLocaleDateString()+" "+new Date(dtm2).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})+"</td>";
                datos+="</tr>";
                var latlong2 = [Number(parameter.Latitude), Number(parameter.Longitude)]
                marker2.setLatLng(latlong2);
                //map.setView(latlong2);
            //Polilinea:
                        
                plyln2.push(latlong2);
                lineField = L.polyline(plyln2, {color: 'red'}).addTo(map);
            }
        );
        
        return this.tparameters.innerHTML=datos,datos2;
    //HASTA AQUI...    
    };
    setInterval(this.Leer, 1000)



}
aplicacion.Leer();