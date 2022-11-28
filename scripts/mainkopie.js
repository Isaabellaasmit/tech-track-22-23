// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import { svg } from 'd3';

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




// const xScale = d3.scaleBand()
//                 .domain([0, d3.max(dataItems, (d) => d[1])])
//                 .range([0, chartWidth])

// const yScale = d3.scaleLinear()
//                 .domain([0, d3.max(dataItems, (d) => [2])])
//                 .range([0, chartHeight])

//     d3.select("#bars")
//         .selectAll("rect")
//         .data(dataItems)
//         .join("rect")
//         .attr("height", d => yScale(d.sales))
//         .attr("width", 25)
//         .attr("x", d => xScale(d[1] + 15))

//     d3.select('#labels')
//     .selectAll('text')
//     .data(dataItems)
//     .join('text')
//     .attr('x', d => xScale(dataItems, (d) => d[1]) + 20)
//     .text(d => d.year);


// var data = [
//     { "year": 2011, "value": 45 }, { "year": 2012, "value": 47 }, { "year": 2013, "value": 52 }, { "year": 2014, "value": 70}, { "year": 2015, "value": 75}, { "year": 2016, "value": 78}
// ]

// function drawChart(dataItems){
    
// }

// function updateChart(appleItem) {
//   appleItem = String(appleItem);
//   const dataItems = filterData(appleItem);
//   drawChart(dataItems);
// }

// d3.json("../JSON/itemSales.json").then(d => {
//     makeChart(d)

//     return dataItems.filter((d) => d.item === appleItem);
    
// })
// console.log(appleItem)

// function makeChart(products) {

//   console.log(products)
// }




// DIT IS VOOR DE CHART

var chart = d3.select("svg"),
margin = 200,
width = chart.attr("width") - margin,
height = chart.attr("height") - margin



d3.json("../JSON/itemSales.json").then(d => {
    makeChart(d)
})


function makeChart(dataItems) {

  console.log(dataItems);

  dataItems = dataItems.filter(item => {
    return item.item === 'Iphone';
  })

  console.log(dataItems);

  chart.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Ugly bar chart")

      const  xScale = d3.scaleBand().range([0, width]).padding(0.4)
      const yScale = d3.scaleLinear().range([height, 0]);

      var g = chart.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

      xScale.domain(dataItems.map((d) =>d.year));
      yScale.domain([0, d3.max(dataItems, (d) => d.sales)]);

      g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("y", height - 250)
      .attr("x", width - 100)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Jaar");

      g.append("g")
      .call(d3.axisLeft(yScale).tickFormat((d) => d + "m").ticks(10))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Sales van Apple in miljarden");

      g.selectAll(".bar")
      .data(dataItems)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.year))
      .attr("y", (d) => yScale(d.sales))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.sales));

}

 window.addEventListener('DOMContentLoaded', (e) => {
    // d3.selectAll("button").on("click", (e) => updateChart(e.target.value));
    // updateChart(1);
  });






    



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

// svg.selectAll("rect")
//     .data(itemSales)
//     .enter()
//     .append("rect")
//     .attr("x", (d, i) => i * 30)
//     .attr("y", (d, i) => h - 3 * d.sales)
//     .attr("width", 25)
//     .attr("height", (d, i) => 3 * d.sales)
//     .attr("fill", "black")

// svg.selectAll("text")
//     .data(itemSales)
//     .enter()
//     .append("text")
//     .attr('x', (d, i) => i * 30)
//     .attr('x', (d, i) => chartHeight - 3 * d.year - 3)
//     .text((d, i) => d.year)


//const xScale = d3.scaleLinear()
//	.domain([0, d3.max(itemSales, d => d.sales)])
//	.range([0, chartHeight]);

//const yScale = d3.scaleBand()
//	.domain(d3.map(itemSales, d => d.year))
//	.range([0, chartWidth])
//  .paddingInner(0.05);

//d3.select('#bars')
 // .selectAll('rect')
 // .data(itemSales)
 // .join('rect')
 // .attr('height', 25) //yScale.bandwith())
 // .attr('width', d => xScale(d.sales))
 // .attr('y', d => yScale(d.year))
 // .classed('animate__animated animate__headShake animate__infinite', () => Math.random() > 0.8)
  //.classed('animate__slower', () => Math.random() > 0.5)

//d3.select('#labels')
 // .selectAll('text')
 // .data(itemSales)
 // .join('text')
 // .attr('y', d => yScale(d.year) + 15)
 // .text(d => d.year);

