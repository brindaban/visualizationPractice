const SCREEN_WIDTH = 1500;
const MAX_RANGE = 100;
const SIZE_OF_COLLECTION = 10;

var providePreviousData = function(){
	var collection = [];
	for(var count = 0; count < SIZE_OF_COLLECTION; count++)
		collection.push(Math.floor(Math.random() * MAX_RANGE));
	return collection;
}

var randomData = providePreviousData();

var _xScale = d3.scaleLinear()
			.domain([0,MAX_RANGE])
			.range([0, SCREEN_WIDTH]);

var _colorScale = d3.scaleLinear()
			.domain([0,MAX_RANGE])
			.range(["#a9b0e8","#495be5"])

var createHorizentalBarChart = function(data){
	var allDivs = d3.select('.bar_container').selectAll('div').data(data);

	allDivs.enter().append('div');

	allDivs.text(function(d){return d})
	.classed("bar", true)
	.style("width", function(d){return _xScale(d)+"px"})
	.style("background", function(d){return _colorScale(d)});

	allDivs.exit().remove();
}

var updateRandomValue = function(){
	var randomNumber = Math.floor(Math.random() * MAX_RANGE);
	randomData.push(randomNumber);
	createHorizentalBarChart(randomData);
	randomData.shift();

}

var update = function(){
	updateRandomValue();
}
var show = function(){
	setInterval(update,1000);
}
window.onload = show;