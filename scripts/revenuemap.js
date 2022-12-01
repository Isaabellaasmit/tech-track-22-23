// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import { filter } from 'd3';

console.log('Hello, world!');



// Dit is een functie om de chart de filter
function moreData(filterFunctionMap) {
  d3.json("../public/appleRevenue.json").then(d => {

    if(filterFunctionMap) {
        d = d.filter(item => {
          return item.country === filterFunctionMap;
        })
    } 
    makeMap(d)
})
}


//Hier maak ik ik een functie aan om de chart de tekenen met D3
function makeMap(appleData) {

  console.log(appleData);

  const margin = 200

  const chart = d3.select("#chart2")

  const chartWidth = chart.attr("width") - margin
  const chartHeight = chart.attr("height") - margin


  const  xScale = d3.scaleBand()
                    .domain(appleData.map((d) =>d.year))
                    .range([0, chartWidth])
                    .padding(0.4)

  const yScale = d3.scaleLinear()
                   .range([chartHeight, 0])
                   .domain([0, d3.max(appleData, (d) => d.revenue)])

                   console.log(typeof appleData)

  const axisLeft = d3.axisLeft(yScale)
                     .tickFormat((d) => d)
                     .ticks(10)
  
  const axisBottom = d3.axisBottom(xScale)
                       .tickFormat((d) => d)
                       .ticks(10)


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





  d3.select("#titel2")
    .selectAll("text")
    .data(appleData)
    .join("text")
    .attr("transform", "translate(100,50)")
    .attr("font-size", "20px")
    .text((d) => "Verkoopcijfers van " + d.country)
  

  d3.select("#bars2")
    .selectAll("rect")
    .data(appleData)
    .join("rect")
    .transition()
    .duration(500)
    .attr("x", (d) => xScale(d.year))
    .attr("y", (d) => yScale(d.revenue))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => chartHeight - yScale(d.revenue))
    .attr("transform", "translate(" + 100 + "," + 100 + ")")


    d3.select("#scaleBottom2")
      .call(axisBottom)

    
    d3.select("#labelsBottom2")
      .append("text")
      .text("Jaar")
      .attr("y", chartHeight + 150)
      .attr("x", chartWidth + 70)
   
    
    d3.select("#scaleLeft2") 
      .call(axisLeft)
      

    d3.select("#labelsLeft2")
    .selectAll("text")
    .data(appleData)
    .join("text")
    .text("Verkoopaantallen in miljarden") // (d) => "Verkoopcijfers  " + d.item) 
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-5.1em")

}


// EventListener
function changeMap(e) {

  d3.select("#Amerika")
    .attr("fill", "black")

  d3.select("#China")
    .attr("fill", "black")

  d3.select("#Japan")
    .attr("fill", "black")

  d3.select("#Europa") 
    .attr("fill", "black") 
  
  d3.select("#Azië")
    .attr("fill", "black")
  

  let myLand = "#" + e.target.value;

  let myColor = "var(--color-" + e.target.value; 

  d3.select(myLand)
    .attr("fill", myColor)
    .transition()
    .duration(1000)

  
}

// changeMap("africa");

const buttons = document.querySelectorAll('.mapButtons');

buttons.forEach(button => {
	button.addEventListener('click', changeMap);
  
})



window.addEventListener('DOMContentLoaded', (e) => {
  d3.selectAll("div.mapButtons button").on("click", (e) => 
  moreData(e.target.value));
  moreData("Amerika");
});

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
