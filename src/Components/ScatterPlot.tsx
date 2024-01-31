import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ScatterData } from "../data";

interface Props {
  data: ScatterData[];
}

const ScatterPlot: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.temperature)!,
        d3.max(data, (d) => d.temperature)!,
      ])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.iceCreamSales)!])
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(".0f"));
    const yAxis = d3.axisLeft(yScale);

    svg.selectAll("g").remove(); // Clear previous axes

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", 30)
      .attr("fill", "black")
      .text("Temperature (°C)");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis)
      .append("text")
      .attr("x", -innerHeight / 2)
      .attr("y", -40)
      .attr("fill", "black")
      .attr("transform", "rotate(-90)")
      .text("Ice Cream Sales");

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.temperature))
      .attr("cy", (d) => yScale(d.iceCreamSales))
      .attr("r", 5)
      .attr("fill", "steelblue");
  }, [data]);

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default ScatterPlot;
