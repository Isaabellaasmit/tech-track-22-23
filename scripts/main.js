// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import { axisBottom, scaleBand, svg } from 'd3';

console.log('Hello, world!');


// import dataItems from '/JSON/itemSales.json' assert {type: "json"};

// console.log(dataItems);

// d3.json("../JSON/AppleRevenue.json").then(d => {
//     makeMap(apple)
//     console.log(makeMap)
// })


// d3.json("../JSON/itemSales.json").then(d => {
//     makeChart(products)
//     console.log(makeChart)
// })


// function makeMap(products) {
//     console.log(products)
// }


// d3.json("../JSON/itemSales.json").then(d => {
//     makeChart(d)


/* same same */
// var deNegendeButton = document.querySelector(".klik");\
  let laptopButton = document.querySelector("#on");

  laptopButton.addEventListener("click", schermUit);

  function schermUit() {
    let hetScherm = document.querySelector("#overlay div.screen");
    hetScherm.classList.toggle("uit")
  }

// /* same same */
// deNegendeButton.addEventListener("click", veranderDeNegendePs);

// /* same same */
// function veranderDeNegendePs() {
//   let hetNegendeBlokje = document.querySelector("article");
//   hetNegendeBlokje.classList.toggle("anders");
// }


// OM TE FILTEREN

function getData(filterFunction) {
  d3.json("../itemSales.json").then(d => {

    if(filterFunction) {
        d = d.filter(item => {
          return item.item === filterFunction;
        })
    } 
    makeChart(d)
})
}



function makeChart(dataItems) {

  console.log(dataItems);

  const margin = 200

  const chart = d3.select("#chart1")

  const chartWidth = chart.attr("width") - margin
  const chartHeight = chart.attr("height") - margin


  const  xScale = d3.scaleBand()
                    .domain(dataItems.map((d) =>d.year))
                    .range([0, chartWidth])
                    .padding(0.4)

  const yScale = d3.scaleLinear()
                   .range([chartHeight, 0])
                   .domain([0, d3.max(dataItems, (d) => d.sales)])


                   console.log(typeof dataItems)

  const axisLeft = d3.axisLeft(yScale)
                     .tickFormat((d) => d)
                     .ticks(10)
                     
  
  const axisBottom = d3.axisBottom(xScale)
                       .tickFormat((d) => d)
                       .ticks(10)


  d3.select("#titel")
    .selectAll("text")
    .data(dataItems)
    .join("text")
    .attr("transform", "translate(180,50)")
    .attr("font-size", "20px")
    .text((d) => "Verkoopcijfers van " + d.item)
    .attr("fill", "var(--color-text-light)")
  

  d3.select("#bars")
    .selectAll("rect")
    .data(dataItems)
    .join("rect")
    .transition()
    .duration(500)
    .attr("x", (d) => xScale(d.year))
    .attr("y", (d) => yScale(d.sales))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => chartHeight - yScale(d.sales))
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .attr("fill", "var(--color-bars")


    d3.select("#scaleBottom")
      .call(axisBottom)
      

    
    d3.select("#labelsBottom")
      .append("text")
      .text("Jaar")
      .attr("y", chartHeight + 150)
      .attr("x", chartWidth + 70)
      .attr("fill", "var(--color-text-light)")
   
    
    d3.select("#scaleLeft") 
      .call(axisLeft)
      

    d3.select("#labelsLeft")
    .selectAll("text")
    .data(dataItems)
    .join("text")
    .text("Verkoopaantallen in miljarden") // (d) => "Verkoopcijfers  " + d.item) 
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-5.1em")
    .attr("fill", "var(--color-text-light)")

}

 window.addEventListener('DOMContentLoaded', (e) => {
      d3.selectAll("div.items button").on("click", (e) => 
      getData(e.target.value));
      getData("Iphone");
  });

// EventListener
// function changeMap(e) {
//   // d3.select("#australia", "#china", "#japan", "#europe", "#restOfAzia", "#africa", "#america")
//   //   .attr("fill", "black")

//   d3.select("#Amerika")
//     .attr("fill", "black")

//   d3.select("#China")
//     .attr("fill", "black")

//   d3.select("#Japan")
//     .attr("fill", "black")

//   d3.select("#Europa") 
//     .attr("fill", "black") 
  
//   d3.select("#Azië")
//     .attr("fill", "black")
  

//   let myLand = "#" + e.target.value;

//   let myColor = "var(--color-" + e.target.value; 

//   d3.select(myLand)
//     .attr("fill", myColor)
//     .transition()
//     .duration(1000)

  
// }

// // changeMap("africa");

// const buttons = document.querySelectorAll('.mapButtons');

// buttons.forEach(button => {
// 	button.addEventListener('click', changeMap);
  
// })





// function handleClick(event) {
// 	document.body.style.backgroundColor = event.target.innerHTML
// 	console.log(event.target.innerHTML);
// }






// // FILTER VOOR BIJ DE MAP

// function getDataForMap(mapFunction) {
//   d3.json("../JSON/AppleRevenue.json").then(d => {

//     if(mapFunction) {
//         d = d.filter(item => {
//           return item.Country === mapFunction;
//         })
//     } 
//     showMap(d)
// })
// }





// const appleData = Object.entries(dataRevenue);

// console.log(typeof appleData)

// d3.json("../public/JSON/AppleRevenue.json").then(d => {

//   // let keysData = Object.keys(d);   // convert object's keys into an array
//   // let arrayData = keysData.map(keysData => d)
//     showMap(d)
// })

// function moreData(filterMap) {
//   d3.json("../public/JSON/AppleRevenue.json").then(d => {

//     if(filterMap) {
//         d = d.filter(item => {
//           return item.Country === filterMap;
//         })
//     } 
//     showMap(d)
// })
// }

// import appleData from '/public/JSON/AppleRevenue.json' assert {type: "json"};
// console.log(appleData);

// d3.json("../public/JSON/AppleRevenue.json").then(d => {

//     showMap(d)
// })



// function showMap(appleData) {

//   console.log(appleData);

// const secondChartWidth = 800
// const secondChartHeight = 400

// const xSchaal = d3.scaleLinear()
// // .domain([0, d3.max(appleData, d => d.Revenue)]) //d3.max(d3.values(d.years)
// .range([0, secondChartWidth])
// .domain([0, (d3.max(appleData, d => d.Revenue))])      //(d3.max(Object.values(appleData), d => d.Revenue))]) 

//   console.log(typeof appleData);

// const ySchaal = d3.scaleBand()
// .domain(d3.map(appleData, d => d.Year))
// .range([0, secondChartHeight])
// .paddingInner(0.05);

// d3.select('#secondBars')
// .selectAll('rect')
// .data(appleData)
// .join('rect')
// .attr('height', ySchaal.bandwidth())
// .attr('width', d => xSchaal(d.Revenue))
// .attr('y', d => ySchaal(d.Year))

// d3.select('#secondLabels')
// .selectAll('text')
// .data(appleData)
// .join('text')
// .attr('y', d => ySchaal(d.Year) + 15)
// .text(d => d.Year);


// }

//  showMap();



// window.addEventListener('DOMContentLoaded', (e) => {
//   d3.selectAll("#mapButtons button").on("click", (e) => 
//   moreData(e.target.value));
//   // moreData("africa");
// });






// function showMap(appleData) {



//   var margin = {top: 10, right: 30, bottom: 40, left: 100},
//   width = 460 - margin.left - margin.right,
//   height = 500 - margin.top - margin.bottom;

// var svg = d3.select("#secondChart")
// .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
// .append("g")
//   .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");


// // Add X axis
// var x = d3.scaleLinear()
//   .domain([0, 13000])
//   .range([ 0, width]);
// svg.append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x))
//   .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");

// // Y axis  (dataItems.map((d) =>d.year))  (Object.values(appleData
// var y = d3.scaleBand()
// .range([ 0, height ])
// .domain(appleData.map((d) => d.Year))
// .padding(1);
// svg.append("g")
// .call(d3.axisLeft(y))

// console.log(typeof appleData)

// // Lines
// svg.selectAll("myline")
// .data(appleData)
// .enter()
// .append("line")
//   .attr("x1", function(d) { return x(d.Revenue); })
//   .attr("x2", x(0))
//   .attr("y1", function(d) { return y(d.Year); })
//   .attr("y2", function(d) { return y(d.Year); })
//   .attr("stroke", "grey")

// // Circles
// svg.selectAll("mycircle")
// .data(appleData)
// .enter()
// .append("circle")
//   .attr("cx", function(d) { return x(d.Revenue); })
//   .attr("cy", function(d) { return y(d.Year); })
//   .attr("r", "4")
//   .style("fill", "#69b3a2")
//   .attr("stroke", "black")
// }

// showMap();






  
  // var iphoneButton = document.querySelector(".1")

  // function iphoneFuntie() {
  //  console.log("button1")
  // }


// funtion handleClick() {

// }

// buttons.forEach(button => {
//     button.addEventListener("click", handleClick)
// })

// function handleClick(event) {
//      console.log(event, target )
// }



// const buttons = document.querySelectorAll("buttons")
    



// FILTER

    // function filterData(appleItem) {
        
    //     d3.json("../JSON/itemSales.json")
    
    //     return dataItems.filter((d) => d.item === appleItem);

        
    // }

  
  // function drawChart(dataSet) {
  //   const pointScale = d3
  //     .scalePoint()
  //     .domain(d3.map(dataSet, (d) => d.day))
  //     .range([0, 700]);
  
  //   const sqrtScale = d3
  //     .scaleSqrt()
  //     .domain(d3.extent(dataSet, (d) => d.cars))
  //     .range([1, 30]);
  
  //   const colorScaleLinear = d3
  //     .scaleLinear()
  //     .domain(d3.extent(dataSet, (d) => d.cars))
  //     .range(["red", "darkred"]);
  
  //   d3.select("#scale1")
  //     .selectAll("circle")
  //     .data(dataSet)
  //     .join("circle")
  //     .transition()
  //     .duration(500)
  //     .attr("r", (d) => sqrtScale(d.cars))
  //     .attr("cx", (d) => pointScale(d.day))
  //     .attr("fill", (d) => colorScaleLinear(d.cars));
  

  // }
  



// const xScale = d3.scaleBand()
// 	.domain([0, d3.map(dataItems, d => d.year)])
// 	.range([0, chartWidth]);

// const yScale = d3.scaleLinear()
// 	.domain(d3.max(dataItems, d => d.sales))
// 	.range([chartHeight, 0])

// d3.select('#bars')
//   .selectAll('rect')
//   .data(dataItems)
//   .join('rect')
//   .attr('width', 13) //yScale.bandwith())
//   .attr('height', d => yScale(dataItems, d => d.sales))
//   .attr('x', d => xScale(d.year))

// d3.select('#labels')
//   .selectAll('text')
//   .data(dataItems)
//   .join('text')
//   .attr('x', d => xScale(d.year) + 15)
//   .text(d => d.year);

















// const svgMap = d3.select("#Objects")
//                 .append("#africa")
//                 .attr("fill", "black")








// const svg = d3.select("body")
//               .append("svg.svgMap")
//               .attr("width", chartWidth)
//               .attr("height", chartHeight)


//             svg.selectAll(".america")
//               .append("polygon.america")
//               .attr("fill", "navy")









//    svg.selectAll(".america")
//         .data(appleRevenue)
//         .enter()
//         .append("polygon")
//         .attr("fill", "black")           

//         var colors = ['black', 'green','blue'];
//         const worldMap = d3.selectAll('.svgMap')
//                                 .data(appleRevenue)
//                                 .enter()
//                                 .append('polygon')
//                                 .attr('d',arc)
//                                 .attr('fill',function(d,i){
//                                     if (d.appleRevenue.america == 2015)
//                                      return color[2];
//                                     if (d.appleRevenue.america == 2016)
//                                      return color[0];
//                                     if (d.appleRevenue.america == 2017)
//                                      return color[1];
//                                 });


