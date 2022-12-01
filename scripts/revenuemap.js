// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import { filter } from 'd3';

console.log('Hello, world!');


// Dit is een functie om de chart de filter
function moreData(filterFunctionMap) {
  d3.json("../appleRevenue.json").then(d => {

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

  const ChartWidth = 800
  const ChartHeight = 400

  const xScale = d3.scaleLinear()
  .range([0, ChartWidth])
  .domain([0, (d3.max(appleData, d => d.revenue))])   

  const yScale = d3.scaleBand()
  .domain(d3.map(appleData, d => d.year))
  .range([0, ChartHeight])
  .paddingInner(0.05);

  // TITEL
  d3.select("#titel2")
  .selectAll("text")
  .data(appleData)
  .join("text")
  .attr("transform", "translate(90,-40)")
  .attr("font-size", "20px")
  .text((d) => "Inkomsten in miljarden: " + d.country)
  .attr("fill", "var(--color-text-light)")

  // BARS + TOOLTIP
  d3.select('#bars2')
  .selectAll('rect')
  .data(appleData)
  .join('rect')
  .attr('height', yScale.bandwidth())
  .attr('width', d => xScale(d.revenue))
  .attr('y', d => yScale(d.year))
  .attr("fill", "var(--color-bars")
  .attr("box-shadow", "10px var(--color-bars-shadow")
  .on("mouseover touchstart", (e, d) => 
  d3.select("#tooltip2")
    .transition()
    .duration(300)
    .style("opacity", 1)
    .text(`${d.year}: ${d.revenue} miljard`)
  )

  .on("mousemove", (e) =>
    d3.select("#tooltip2")
      .style("left", e.pageX + 15 + "px")
      .style("top", e.pageY + 15 + "px")
  )

  .on("mouseout", e => d3.select("#tooltip2").style("opacity", 0))

  // LABELS AAN DE LINKER KANT VAN CHART
  d3.select('#labelsLeft2')
  .selectAll('text')
  .data(appleData)
  .join('text')
  .attr('y', d => yScale(d.year))
  .attr("transform", "translate(27 ,32)")
  .text(d => d.year)
  .attr("fill", "var(--color-text-light")

  // LABELS IN DE BARS
  d3.select('#labelsright2')
  .selectAll('text')
  .data(appleData)
  .join('text')
  .attr('y', d => yScale(d.year))
  .attr("transform", "translate(120 ,32)")
  .text(d => "€ " + d.revenue)
  .attr("fill", "var(--color-text-light")
}





// Dit is om de klaar te kleuren 

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

// Hier zorg ik ervoor dat de .mapButtons luisteren naar changeMap
const buttons = document.querySelectorAll('.mapButtons');

buttons.forEach(button => {
	button.addEventListener('click', changeMap);
})

// Dit is het event voor de functies: filer > chart
window.addEventListener('DOMContentLoaded', (e) => {
  d3.selectAll("div.mapButtons button").on("click", (e) => 
  moreData(e.target.value));
  moreData("Amerika");
  d3.select("body").on("touchend", e => d3.select("#tooltip2").style("opacity", 0));
});