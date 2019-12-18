//Ozzotopie JS File

// Set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 1060 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// Append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // .attr("padding-left", 30)
    // .attr("padding-right", 30)
    .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Globals
var jsondata;
var jsonurl = "https://raw.githubusercontent.com/cyrilleAdelphe/projetS3/master/data/planet_demo_state_modified.json";
var selectedx, selectedy;
var font = '#000000' ;
var source = 'image/bot.jpg';
var loadingSpinner = document.getElementById("loading");

// Add X axis
var x = d3.scaleLinear()
  .domain([0, 60])
  .range([ 0, width ]);

var x_axis = d3.axisBottom()
    .scale(x);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(x_axis);

// Add Y axis
var y = d3.scaleLinear()
  .domain([-15, 110])
  .range([ height, 0]);

var y_axis = d3.axisLeft()
    .scale(y);

svg.append("g")
  .attr("class", "y axis")
  .call(y_axis);

// Definition de la div du tooltips
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

//init
readData();

// Create Event Handlers for mouse
function handleMouseClick(d, i) {  // Add interactivity
  console.log("Click!");
  console.log(d);
  console.log(i);
  console.log(jsondata[0].parentUuidList[0]);
  console.log("selx "+d[selectedx]+" sely "+d[selectedy]);

  $('.list-group').empty();
  //populate the list
  for (var i = jsondata.length - 1; i >= 0; i--) {
    var font ='#000000'; 
    var source = 'images/bot.jpg';  
      if ((jsondata[i][selectedx] === d[selectedx]) && (jsondata[i][selectedy] === d[selectedy])) {
        // Root in red
        if  (jsondata[i].ozzoSpeciesUuid !== null) {
          font = '#ff0000';
          source ='images/racine.jpg';
        }
        $('.list-group').append("<a class=list-group-item list-group-item-action' id='list-"+jsondata[i].uuid+"-list' data-toggle='list' href='#list-"+jsondata[i].uuid+"' role='tab' aria-controls='"+jsondata[i].uuid+"'>"+jsondata[i].uuid+"</a>");
         // $('.tab-content').append("<ul> <li> <a href='#'>    <div class='tab-content' id='nav-tabContent'></div></a> <ul> <li> <a href='#'><div class='tab-contentp1' id='nav-tabContentp1'></div></a> </li> <li> <a href='#'><div class='tab-contentp2' id='nav-tabContentp2'></div></a></li></ul></li></ul>");
        $('.tab-content').append("<div class='tab-pane fade' id='list-"+jsondata[i].uuid+"' role='tabpanel' aria-labelledby='list-"+jsondata[i].uuid+"-list'> <h3>Family Tree:</h3><br><div class='tree'><ul><li> <a href='#'><font color="+font+">"+jsondata[i].uuid+"</font>"+
          "<br>"+"eatCount: "+jsondata[i].eatCount+
          "<br>"+"libido: "+jsondata[i].libido+
          "<br>"+"health: "+jsondata[i].health+  
    //Root
          "<br>"+"<img  src="+source+" alt = 'Racine' width='50' height='50' />"+   
          "<br>"+"species: "+ jsondata[i].ozzoSpeciesUuid+   
          "</a> <ul><li><a onclick='showGrandchild(\""+jsondata[i].uuid+"\",\""+jsondata[i].parentUuidList[0]+"\",\""+jsondata[i].parentUuidList[1]+"\")' id='treea_"+jsondata[i].uuid+"'>"+
          jsondata[i].parentUuidList[0]+"</a> <ul id='parenta_"+jsondata[i].uuid+"' style='display:none;'><li><a id='sona_"+jsondata[i].uuid+"_"+jsondata[i].parentUuidList[0]+"'>GranchildA</a></li> <li><a id='sonb_"+jsondata[i].uuid+"_"+jsondata[i].parentUuidList[0]+"'>GranchildB</a></li> </ul></li> <li><a onclick='showGrandchild(\""+jsondata[i].uuid+"\",\""+jsondata[i].parentUuidList[0]+"\",\""+jsondata[i].parentUuidList[1]+"\")' id='treeb_"+jsondata[i].uuid+"'>"+
          jsondata[i].parentUuidList[1]+"</a> <ul id='parentb_"+jsondata[i].uuid+"' style='display:none;'><li><a id='sona_"+jsondata[i].uuid+"_"+jsondata[i].parentUuidList[1]+"'>GranchildA</a></li> <li><a id='sonb_"+jsondata[i].uuid+"_"+jsondata[i].parentUuidList[1]+"'>GranchildB</a></li> </ul> </li></ul></li></ul></div>"
            +"</div>");
          //ajout de la liste des parents
          //console.log(jsondata[i]);
          //console.log(jsondata[i].parentUuidList);
          //console.log(jsondata[i].parentUuidList[0]);
          //$('.tab-contentp1').append("<a class=list-group-item list-group-item-action' id='list-"+jsondata[i].parentUuidList[0]+"-list' data-toggle='list' href='#list-"+jsondata[i].parentUuidList[0]+"' role='tab' aria-controls='"+jsondata[i].parentUuidList[0]+"'>"+jsondata[i].parentUuidList[0]+"</a>");
          // $('.tab-contentp1').append("<div class='tab-pane fade' id='list-"+jsondata[i].uuid+"' role='tabpanel' aria-labelledby='list-"+jsondata[i].uuid+"-list'>Uuid: "+
          // jsondata[i].parentUuidList[0]
          // +"</div>");
          //$('.tab-contentp2').append("<a class=list-group-item list-group-item-action' id='list-"+jsondata[i].parentUuidList[1]+"-list' data-toggle='list' href='#list-"+jsondata[i].parentUuidList[1]+"' role='tab' aria-controls='"+jsondata[i].parentUuidList[1]+"'>"+jsondata[i].parentUuidList[1]+"</a>");
      
      }
  }

  window.scrollTo(0, document.body.scrollHeight);
}

function loadFile() {
  var e = document.getElementById("urlInput");
  if (validURL(e.value)) {
    jsonurl = e.value;
    loadingSpinner.style.display = "block";
    d3.selectAll('#allDots').remove();
    readData();
  } else {
    alert("Error: Invalid URL!");
  }
  //jsonurl = e.value;
  console.log('oi '+validURL(e.value));
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function loadGraph() {
  var e = document.getElementById("ddx");
  selectedx = e.options[e.selectedIndex].value;
  var e = document.getElementById("ddy");
  selectedy = e.options[e.selectedIndex].value;

  //points.exit().remove();
  //d3.selectAll('#allDots').remove();

  var xmax = 0;
  var xmin = 0;
  var ymax = 0;
  var ymin = 0;
  for (var i = jsondata.length - 1; i >= 0; i--) {
    if (jsondata[i][selectedx] > xmax)
      xmax = jsondata[i][selectedx];
    else if (jsondata[i][selectedx] < xmin)
      xmin = jsondata[i][selectedx];

    if (jsondata[i][selectedy] > ymax)
      ymax = jsondata[i][selectedy];
    else if (jsondata[i][selectedy] < ymin)
      ymin = jsondata[i][selectedy];
  }

  console.log(xmax);
  x.domain([xmin, xmax+(0.1*xmax)]);
    svg.select(".x")
        .transition()
          .call(x_axis);

  console.log(ymax);
  y.domain([ymin, ymax+(0.1*ymax)]);
    svg.select(".y")
        .transition()
          .call(y_axis);
  
  svg.append('g')
    .selectAll("dot")
    .data(jsondata.filter(function(d,i){return i<50000})) // the .filter part is just to keep a few dots on the chart, not all of them
    .enter()
    .append("circle")
      .attr("class", "all dots")
      .attr('id', 'allDots')
      .attr("cx", function (d) {
          return x(d[selectedx]);
      } )
      .attr("cy", function (d) {
          return y(d[selectedy]); 
      } )
      .attr("r", 9)
      .style("fill", "#91eb13")
      .style("opacity", 0.5)
      .style("stroke", "white")
    .on("mouseover", function(d) {
       div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html("PlanetUIID: " + d.planetUuid)
      .style("left", (d3.mouse(this)[0]+50) + "px")
      .style("top", (d3.mouse(this)[1]+270) + "px")} )
    .on("click", handleMouseClick)
    .on("mouseout", function(d) {
      div.transition()
      .duration(200)
      .style("opacity", 0)
  } );

  d3.selectAll('#axeText').remove();
  //text label for the x axis
   svg.append("text")  
      .attr("class", "axe text")
      .attr('id', 'axeText')           
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 30) + ")")
      .style("text-anchor", "middle")
      .text(selectedx);

  // text label for the y axis
  svg.append("text")
    .attr("class", "axe text")
    .attr('id', 'axeText') 
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(selectedy);  

  loadingSpinner.style.display = "none";
}

//Read the data
function readData() {
  d3.json(jsonurl, function(err, data) {
  //d3.json("https://raw.githubusercontent.com/cyrilleAdelphe/projetS3/master/data/planet_demo_state_v2.json", function(err, data) {
    if(err) console.log("error fetching data: "+ err);
    jsondata = data;

    //fill boxes
    var e = document.getElementById("n_bots");
    e.innerHTML = jsondata.length;
    var uniqueNamesCount = _.uniqBy(jsondata, 'planetUuid').length;
    e = document.getElementById("n_planets");
    e.innerHTML = uniqueNamesCount;

    // Add dots
    loadGraph();
  })
}

$( ".dropdown" ).change(function() {
  d3.selectAll('#allDots').remove();
  loadGraph();    
});

function showGrandchild(uuid, parent0, parent1) {
  console.log('oieeeee');
  console.log("parenta_"+uuid);
  var font ='#000000';
  var source = 'images/bot.jpg'; 
  var parent = document.getElementById("parenta_"+uuid);
  if(parent.style.display == "block") {
    parent.style.display = "none"; //hide it
  } else {
    parent.style.display = "block"; //show it
    var grandchild = document.getElementById("sona_"+uuid+"_"+parent0);
    if(grandchild.innerHTML == "GranchildA") { //first time, lest get the right content
      for (var i = jsondata.length - 1; i >= 0; i--) { //search for the parents
        if(jsondata[i].uuid == parent0) {
          //add new tree level
          grandchild = document.getElementById("sona_"+uuid+"_"+parent0);
          grandchild.innerHTML = jsondata[i].parentUuidList[0];
          grandchild = document.getElementById("sonb_"+uuid+"_"+parent0);
          grandchild.innerHTML = jsondata[i].parentUuidList[1];
          var myself = document.getElementById("treea_"+uuid);
          //add more information on myself
          if  (jsondata[i].ozzoSpeciesUuid != null) {
            font = '#ff0000'
            source ='images/racine.jpg';
          }
          myself.innerHTML = 
          "<font color="+font+">"+jsondata[i].uuid+"</font>"+
          "<br>"+"eatCount: "+jsondata[i].eatCount+
          "<br>"+"libido: "+jsondata[i].libido+
          "<br>"+"health: "+jsondata[i].health+  
          "<br>"+"<img  src="+source+" alt = 'Racine' width='50' height='50' />"+   
          "<br>"+"species: "+ jsondata[i].ozzoSpeciesUuid;
        }
        if(jsondata[i].uuid == parent1) {
          grandchild = document.getElementById("sona_"+uuid+"_"+parent1);
          grandchild.innerHTML = jsondata[i].parentUuidList[0];
          grandchild = document.getElementById("sonb_"+uuid+"_"+parent1);
          grandchild.innerHTML = jsondata[i].parentUuidList[1];
          var myself = document.getElementById("treeb_"+uuid);
          //add more information on myself
          if  (jsondata[i].ozzoSpeciesUuid != null) {
            font = '#ff0000'
            source ='images/racine.jpg';
          } else {
            font ='#000000';
            source = 'images/bot.jpg';
          }
          myself.innerHTML = 
          "<font color="+font+">"+jsondata[i].uuid+"</font>"+
          "<br>"+"eatCount: "+jsondata[i].eatCount+
          "<br>"+"libido: "+jsondata[i].libido+
          "<br>"+"health: "+jsondata[i].health+  
          "<br>"+"<img  src="+source+" alt = 'Racine' width='50' height='50' />"+   
          "<br>"+"species: "+ jsondata[i].ozzoSpeciesUuid;
        }
      }
    }
  }
  parent = document.getElementById("parentb_"+uuid);
  if(parent.style.display == "block") {
    parent.style.display = "none";
  } else {
    parent.style.display = "block";
  }
}