// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 1060 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("padding-left", 30)
    .attr("padding-right", 30)
    .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var jsondata;
var selectedx, selectedy;
var font = '#000000' ;
var source = 'image/bot.jpg';

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

// definition de la div du tooltips
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

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
    var font ='#000000' 
    var source = 'images/bot.jpg'  
      if ((jsondata[i][selectedx] === d[selectedx]) && (jsondata[i][selectedy] === d[selectedy])) {
 // Root in red
        if  (jsondata[i].ozzoSpeciesUuid !== null) {
            var font = '#ff0000'
            var source ='images/racine.jpg';}
        $('.list-group').append("<a class=list-group-item list-group-item-action' id='list-"+jsondata[i].uuid+"-list' data-toggle='list' href='#list-"+jsondata[i].uuid+"' role='tab' aria-controls='"+jsondata[i].uuid+"'>"+jsondata[i].uuid+"</a>");
         // $('.tab-content').append("<ul> <li> <a href='#'>    <div class='tab-content' id='nav-tabContent'></div></a> <ul> <li> <a href='#'><div class='tab-contentp1' id='nav-tabContentp1'></div></a> </li> <li> <a href='#'><div class='tab-contentp2' id='nav-tabContentp2'></div></a></li></ul></li></ul>");
        $('.tab-content').append("<div class='tab-pane fade' id='list-"+jsondata[i].uuid+"' role='tabpanel' aria-labelledby='list-"+jsondata[i].uuid+"-list'> <h3>Arbre genealogique :</h3><br><div class='tree'><ul><li> <a href='#'><font color="+font+">"+jsondata[i].uuid+"</font>"+
          "<br>"+"eatCount: "+jsondata[i].eatCount+
          "<br>"+"libido: "+jsondata[i].libido+
          "<br>"+"health: "+jsondata[i].health+  
    //Root
          "<br>"+"<img  src="+source+" alt = 'Racine' width='50' height='50' />"+   
          "<br>"+"espece: "+ jsondata[i].ozzoSpeciesUuid+   
          "</a> <ul><li><a href='#'>"+jsondata[i].parentUuidList[0]+"</a></li><li> <a href='#'>"+jsondata[i].parentUuidList[1]+"</a></li></ul></li></ul></div>"
            +"</div>");
          //ajout de la liste des parents
          console.log(jsondata[i]);
          console.log(jsondata[i].parentUuidList);
          console.log(jsondata[i].parentUuidList[0]);
          //$('.tab-contentp1').append("<a class=list-group-item list-group-item-action' id='list-"+jsondata[i].parentUuidList[0]+"-list' data-toggle='list' href='#list-"+jsondata[i].parentUuidList[0]+"' role='tab' aria-controls='"+jsondata[i].parentUuidList[0]+"'>"+jsondata[i].parentUuidList[0]+"</a>");
          // $('.tab-contentp1').append("<div class='tab-pane fade' id='list-"+jsondata[i].uuid+"' role='tabpanel' aria-labelledby='list-"+jsondata[i].uuid+"-list'>Uuid: "+
          // jsondata[i].parentUuidList[0]
          // +"</div>");
          //$('.tab-contentp2').append("<a class=list-group-item list-group-item-action' id='list-"+jsondata[i].parentUuidList[1]+"-list' data-toggle='list' href='#list-"+jsondata[i].parentUuidList[1]+"' role='tab' aria-controls='"+jsondata[i].parentUuidList[1]+"'>"+jsondata[i].parentUuidList[1]+"</a>");
      
      }
  }

  window.scrollTo(0, document.body.scrollHeight);
}


//Read the data
d3.json("https://raw.githubusercontent.com/cyrilleAdelphe/projetS3/master/data/planet_demo_state_modified.json", function(err, data) {
  if(err) console.log("error fetching data: "+ err);
  jsondata = data;
  //console.log(data); 

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data.filter(function(d,i){return i<50000})) // the .filter part is just to keep a few dots on the chart, not all of them
    .enter()
    .append("circle")
      .attr("class", "all dots")
      .attr('id', 'allDots')
      .attr("cx", function (d) { return x(d.libido); } )
      .attr("cy", function (d) { return y(d.health); } )
      .attr("r", 9)
      .style("fill", "#91eb13")
      .style("opacity", 0.5)
      .style("stroke", "white")
    .on("mouseover", function(d) {
       div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html("PlanetUID: " + d.planetUuid)
      .style("left", (d3.mouse(this)[0]+200) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")})
    .on("mouseout", function(d) {
      div.transition()
      .duration(500)
      .style("opacity", 0)
  } )

})

$( ".dropdown" ).change(function() {
  var e = document.getElementById("ddx");
  selectedx = e.options[e.selectedIndex].value;
  var e = document.getElementById("ddy");
  selectedy = e.options[e.selectedIndex].value;
  console.log("dropdown changed x y = "+selectedx+" "+selectedy);
  console.log(jsondata[1]);
  console.log("value of the second " + jsondata[1][selectedx]);

  //points.exit().remove();
  d3.selectAll('#allDots').remove();

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
       div .html("PlanetUIID: " + d.planetUuid)
      .style("left", (d3.mouse(this)[0]+200) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")} )
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

});