/*
Code by Oriol Julià Carrillo
including code by
mostaphaRoudsari (https://gist.github.com/mostaphaRoudsari/b4e090bb50146d88aec4)
*/

  var iter_vec = ["0", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000", "2000", "3000", "4000", "5000", "6000", "7000", "8000", "9000", "10000"];
  var csv_files = new Array(iter_vec.length);
  for(i=0; i<iter_vec.length; i++){
    csv_files[i] = "oriol_nyt/data/csv_files/it".concat(iter_vec[i]);
    csv_files[i] = csv_files[i].concat(".csv");
  }

  var iter = 0;
  document.getElementById("iterations").innerHTML = iter_vec[iter];

  var freq = 1000; // frequency of data change (miliseconds)
  var freq_dif = 200; // frequency of data change (miliseconds)
  document.getElementById("frequency").innerHTML = freq + " ms";

  //document.getElementById("speed").innerHTML = freq;
  var parcoords;
  load_data(true);

  //var setInterval_id = setInterval(reload_data, freq);
var started = false;
var end = false;
  function start_button(){
    if( !started ){
      started = true;
      if( iter >= csv_files.length-1){
        iter = 0;
      }
      setInterval_id = setInterval(iter_up, freq);
    }
  }
  function pause_button(){
    started = false;
    clearInterval(setInterval_id);
  }
  function stop_button(){
    started = false;
    clearInterval(setInterval_id);
    iter = 0;
    document.getElementById("iterations").innerHTML = iter_vec[iter];
    set_reload_data();
  }

  function iter_up(){
    if( !end ){
      iter++;
    }else{
      console.log("Hola")
      end = false;
    }
    if( iter < iter_vec.length ){
      set_reload_data();
    }else{
      iter = iter_vec.length-1;
      clearInterval(setInterval_id);
      started = false;
      end = true;
    }
    end = false;
  }

  function iter_down(){
    iter--;
    if( iter >= 0 ){
      set_reload_data();
    }else{
      iter = 0;
    }
  }

  function period_up(){
    freq += freq_dif;
    document.getElementById("frequency").innerHTML = freq + " ms";
  }
  function period_down(){
    if( freq - freq_dif > 0 ){
      freq -= freq_dif;
      document.getElementById("frequency").innerHTML = freq + " ms";
    }
  }


function set_reload_data(stop_button){
  if( stop_button === undefined )
    stop_button = false;
    // Case when we have already seen all the files
    if( iter >= csv_files.length ){
      end = true;
      clearInterval(setInterval_id);
    }else{
      //document.getElementById("nytimes").innerHTML = "";
      reload_data();
    }
    //if( stop_button !== true )
    //  iter = iter+1;
  }


  function reload_data(){ //updates the graph with new data
    document.getElementById("iterations").innerHTML = iter_vec[iter];
    d3.csv(csv_files[iter], function(data2){ graph
    .data(data2)
    .render(); 
  })
  }


  var textLength=0;
  var color;

  function load_data(){

    document.getElementById("iterations").innerHTML = iter_vec[iter];

    var transparency = d3.scale.pow()
    .exponent(0.15)
    .range([1,0.12]);

    var colorList = ["red","green","blue","purple","black", "transparent"];

  // load default chart
  d3.csv("oriol_nyt/data/csv_files/it0.csv", function(data){
    var colorMap = {};
    _(data).chain()
    .pluck('group')
    .uniq()
    .each(function(d,i) {
      colorMap[d] = colorList.length > i ? colorList[i] : "black";
    });

    color = function(d) { return colorMap[d.group]; };
    transparency.domain([1,data.length]);

  // collect text for first column to adjust left margin
  var firstCell = data.map(function(d){return d3.values(d)[0]});

  // find the longest text size in the first row to adjust left margin
  textLength = 0;
  firstCell.forEach(function(d){
    if (d.length > textLength) textLength = d.length;
  });

  // get parallel coordinates
  graph = d3.parcoords()('#nytimes')
  .data(data)
  .margin({ top: 26, left: 5 * textLength, bottom: 25, right: 0 })
  .alpha(0.6)
  .color(color)
  //.mode("queue")
  //.rate(500)
  .render()
      .brushMode("1D-axes")  // enable brushing
      //.reorderable() // I removed this for now as it can mess up with tooltips
      .interactive();

  // set the initial coloring based on the 3rd column
  //update_colors(d3.keys(data[0])[2]);

/*
   // click label to activate coloring
  graph.svg.selectAll(".dimension")
      .on("click", update_colors)
      .selectAll(".label")
        .style("font-size", "14px"); // change font sizes of selected lable
        */

  //add hover event
  d3.select("#nytimes svg")
  .on("mousemove", function() {
    var mousePosition = d3.mouse(this);      
        highlightLineOnClick(mousePosition, true); //true will also add tooltip
      })
  .on("mouseout", function(){
    cleanTooltip();
    graph.unhighlight();
  });

  
  // add instruction text
  var instructions = ""

  d3.select("#nytimes svg").append("text")
  .text(instructions)
  .attr("text-anchor", "middle")
  .attr("text-decoration", "overline")
  .attr("transform", "translate(" + graph.width()/2 + "," + (graph.height()-5) + ")");;

});

}

// update color and font weight of chart based on axis selection
// modified from here: https://syntagmatic.github.io/parallel-coordinates/
/*
function update_colors(dimension) { 
  // change the fonts to bold
  graph.svg.selectAll(".dimension")
  .style("font-weight", "normal")
  .filter(function(d) { return d == dimension; })
  .style("font-weight", "bold");

  // change color of lines
  // set domain of color scale
  var values = graph.data().map(function(d){return parseFloat(d[dimension])}); 
  color_set.domain([d3.min(values), d3.max(values)]);
  
  // change colors for each line
  graph.color(function(d){return color_set([d[dimension]])}).render();
};
*/


// Add highlight for every line on click
function getCentroids(data){
  // this function returns centroid points for data. I had to change the source
  // for parallelcoordinates and make compute_centroids public.
  // I assume this should be already somewhere in graph and I don't need to recalculate it
  // but I couldn't find it so I just wrote this for now
  var margins = graph.margin();
  var graphCentPts = [];
  
  data.forEach(function(d){

    var initCenPts = graph.compute_centroids(d).filter(function(d, i){return i%2==0;});
    
    // move points based on margins
    var cenPts = initCenPts.map(function(d){
      return [d[0] + margins["left"], d[1]+ margins["top"]]; 
    });

    graphCentPts.push(cenPts);
  });

  return graphCentPts;
}

function getActiveData(){
  // I'm pretty sure this data is already somewhere in graph
  if (graph.brushed()!=false) return graph.brushed();
  return graph.data();
}

function isOnLine(startPt, endPt, testPt, tol){
  // check if test point is close enough to a line
  // between startPt and endPt. close enough means smaller than tolerance
  var x0 = testPt[0];
  var y0 = testPt[1];
  var x1 = startPt[0];
  var y1 = startPt[1];
  var x2 = endPt[0];
  var y2 = endPt[1];
  var Dx = x2 - x1;
  var Dy = y2 - y1;
  var delta = Math.abs(Dy*x0 - Dx*y0 - x1*y2+x2*y1)/Math.sqrt(Math.pow(Dx, 2) + Math.pow(Dy, 2)); 
  //console.log(delta);
  if (delta <= tol) return true;
  return false;
}

/*
function isOnLine2(startPt, endPt, testPt, tol){
  // check if test point is close enough to a line
  // between startPt and endPt. close enough means smaller than tolerance
  var x0 = testPt[0];
  var y0 = testPt[1];
  var x1 = startPt[0];
  var y1 = startPt[1];
  var x2 = endPt[0];
  var y2 = endPt[1];
  var Dx = x2 - x1;
  var Dy = y2 - y1;
  var delta = Math.abs(Dy*x0 - Dx*y0 - x1*y2+x2*y1)/Math.sqrt(Math.pow(Dx, 2) + Math.pow(Dy, 2)); 
  //console.log(delta);
  if (delta <= tol) return true;
  return false;
}
*/
function findAxes(testPt, cenPts){
  // finds between which two axis the mouse is
  var x = testPt[0];
  var y = testPt[1];
  // make sure it is inside the range of x
  //if (cenPts[0][0] > x +60 ) return false;
  //if (cenPts[cenPts.length-1][0] < x) return false;

  // find between which segment the point is
  for (var i=0; i<cenPts.length; i++){
    if (cenPts[i][0] > x) return i;
  }
}

function cleanTooltip(){
  // removes any object under #tooltip is
  graph.svg.selectAll("#tooltip")
  .remove();
}
var text;
function addTooltip(clicked, clickedCenPts){

  // sdd tooltip to multiple clicked lines
  var clickedDataSet = [];
  var margins = graph.margin()

  function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

    // get all the values into a single list
    // I'm pretty sure there is a better way to write this is Javascript
    for (var i=0; i<clicked.length; i++){
      for (var j=0; j<clickedCenPts[i].length; j++){
        text = d3.values(clicked[i])[j];
        if( isNaN(Number(text)) ){  //hack to visualize only the text for the name and group of each point
          // not clean at all!
          var x = clickedCenPts[i][j][0] - margins.left;
          var y = clickedCenPts[i][j][1] - margins.top;
          clickedDataSet.push([x, y, text]);
        }
      }
    };

  // add rectangles
  var fontSize = 14;
  var padding = 2;
  var rectHeight = fontSize + 2 * padding; //based on font size

  graph.svg.selectAll("rect[id='tooltip']")
  .data(clickedDataSet).enter()
  .append("rect")
  .attr("x", function(d) { return d[0] - d[2].length * 5;})
  .attr("y", function(d) { return d[1] - rectHeight + 2 * padding; })
  .attr("rx", "2")
  .attr("ry", "2")
  .attr("id", "tooltip")
  .attr("fill", "grey")
  .attr("opacity", 0.9)
  .attr("width", function(d){return d[2].length * 10;})
  .attr("height", rectHeight);

  // add text on top of rectangle
  graph.svg.selectAll("text[id='tooltip']")
  .data(clickedDataSet).enter()
  .append("text")
  .attr("x", function(d) { return d[0];})
  .attr("y", function(d) { return d[1]; })
  .attr("id", "tooltip")
  .attr("fill", "white")
  .attr("text-anchor", "middle")
  .attr("font-size", fontSize)
  .text( function (d){ return d[2];})    
}

function getClickedLines(mouseClick){
  var clicked = [];
  var clickedCenPts = [];

  // find which data is activated right now
  var activeData = getActiveData();
  // find centriod points
  var graphCentPts = getCentroids(activeData);

  //if (graphCentPts.length==0) return false;

  // find between which axes the point is
  var axeNum = findAxes(mouseClick, graphCentPts[0]);
  //if (!axeNum) return false;

  graphCentPts.forEach(function(d, i){
    if (axeNum !== 0 && isOnLine(d[axeNum-1], d[axeNum], mouseClick, 2)){
      clicked.push(activeData[i]);
        clickedCenPts.push(graphCentPts[i]); // for tooltip
    }

/*
    else if( axeNum === 0 && isOnLine2(d[axeNum], d[axeNum+1], mouseClick, 2) ){
      clicked.push(activeData[i]);
        clickedCenPts.push(graphCentPts[i]); // for tooltip
    }
*/
    });
  
  return [clicked, clickedCenPts]
}


function highlightLineOnClick(mouseClick, drawTooltip){

  var clicked = [];
  var clickedCenPts = [];
  
  clickedData = getClickedLines(mouseClick);
  if (clickedData && clickedData[0].length!=0){

    clicked = clickedData[0];
    clickedCenPts = clickedData[1];

      // highlight clicked line
      graph.highlight(clicked);

      if (drawTooltip){
      // clean if anything is there
      cleanTooltip();
        // add tooltip
        addTooltip(clicked, clickedCenPts);
      }

  }
};