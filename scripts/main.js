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

// const chartWidth = 800
// const chartHeight = 800




// d3.json("../JSON/itemSales.json").then(d => {
//     makeChart(d)


// OM TE FILTEREN

function getData(filterFunction) {
  d3.json("../public/JSON/itemSales.json").then(d => {

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

  const chart = d3.select("svg")

  const chartWidth = chart.attr("width") - margin
  const chartHeight = chart.attr("height") - margin


  const  xScale = d3.scaleBand()
                    .domain(dataItems.map((d) =>d.year))
                    .range([0, chartWidth])
                    .padding(0.4)

  const yScale = d3.scaleLinear()
                   .range([chartHeight, 0])
                   .domain([0, d3.max(dataItems, (d) => d.sales)])

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
    .attr("transform", "translate(100,50)")
    .attr("font-size", "20px")
    .text((d) => "Verkoopcijfers van " + d.item)
  

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


    d3.select("#scaleBottom")
      .call(axisBottom)

    
    d3.select("#labelsBottom")
      .append("text")
      .text("Jaar")
      .attr("y", chartHeight + 150)
      .attr("x", chartWidth + 70)
   
    
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


}

 window.addEventListener('DOMContentLoaded', (e) => {
      d3.selectAll("#items button").on("click", (e) => 
      getData(e.target.value));
      getData("Iphone");
  });

// EventListener
function changeMap(e) {
  // d3.select("#australia, #china, #japan, #europe, #restOfAzia, #africa, #america")
  //   .attr("fill", "black")
  d3.select("#australia")
    .attr("fill", "black")

  d3.select("#america")
    .attr("fill", "black")

  d3.select("#china")
    .attr("fill", "black")

  d3.select("#japan")
    .attr("fill", "black")

  d3.select("#europe") 
    .attr("fill", "black") 
  
  d3.select("#restOfAsia")
    .attr("fill", "black")
  
  d3.select("#africa")
    .attr("fill", "black")
  

  let myLand = "#" + e.target.value;

  let myColor = "var(--color-" + e.target.value; 

  d3.select(myLand)
    .attr("fill", myColor)
    .transition()
    .duration(1000)

  
}

// changeMap("africa");

const buttons = document.querySelectorAll('#mapButtons');

buttons.forEach(button => {
	button.addEventListener('click', changeMap);
  
})

// document.querySelector("body > form").addEventListener('change', function(event){
//   document.querySelector(".👨‍🦲").dataset.mood = event.target.value;
// });




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

function moreData(filterMap) {
  d3.json("../public/JSON/AppleRevenue.json").then(d => {

    if(filterMap) {
        d = d.filter(item => {
          return item.Country === filterMap;
        })
    } 
    showMap(d)
})
}

// import appleData from '/JSON/AppleRevenue.json' assert {type: "json"};

function showMap(appleData) {

    console.log(appleData);

const chartWidth = 700
const chartHeight = 800

const xScale = d3.scaleLinear()
.domain([0, d3.max(appleData, d => d.Revenue)])
.range([0, chartWidth]);

const yScale = d3.scaleBand()
.domain(d3.map(appleData, d => d.Year))
.range([0, chartHeight])
.paddingInner(0.05);

d3.select('#bars')
.selectAll('rect')
.data(appleData)
.join('rect')
.attr('height', yScale.bandwidth())
.attr('width', d => xScale(d.Revenue))
.attr('y', d => yScale(d.Year))

d3.select('#labels')
.selectAll('text')
.data(appleData)
.join('text')
.attr('y', d => yScale(d.Year) + 15)
.text(d => d.Year);

}

// showMap("africa")



window.addEventListener('DOMContentLoaded', (e) => {
  d3.selectAll("#mapButtons").on("click", (e) => 
  moreData(e.target.value));
  moreData("africa");
});


  
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


