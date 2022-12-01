// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';


// Dit gedeelde is om de laptop aan en uit te doen
let laptopButton = document.querySelector("#on");

laptopButton.addEventListener("click", schermUit);

function schermUit() {
  let hetScherm = document.querySelector("#overlay div.screen");
  hetScherm.classList.toggle("uit")
}



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


// Hier maak ik een functie aan om de chart te maken
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

  // TITEL
  d3.select("#titel")
    .selectAll("text")
    .data(dataItems)
    .join("text")
    .attr("transform", "translate(80,70)")
    .attr("font-size", "20px")
    .text((d) => "Aantal verkochte " + d.item + "'s")
    .attr("fill", "var(--color-text-light)")
  
  // BARS
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

    // DE X AS
    d3.select("#scaleBottom")
      .call(axisBottom)
    
    // LABEL VOOR X AS
    d3.select("#labelsBottom")
      .append("text")
      .text("Jaar")
      .attr("y", chartHeight + 143)
      .attr("x", chartWidth + 59)
      .attr("fill", "var(--color-text-light)")
   
    // DE Y AS
    d3.select("#scaleLeft") 
      .call(axisLeft)
      
    // LABEL VOOR Y AS
    d3.select("#labelsLeft")
    .selectAll("text")
    .data(dataItems)
    .join("text")
    .text("Verkoopaantallen in miljarden") 
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-5.1em")
    .attr("fill", "var(--color-text-light)")
}

// Dit is het event voor de functies: filer > chart
 window.addEventListener('DOMContentLoaded', (e) => {
      d3.selectAll("div.items button").on("click", (e) => 
      getData(e.target.value));
      getData("Mac");
  });