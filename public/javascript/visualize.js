const WIDTH = 1660;
const HEIGHT = 810;
const MARGIN = 30;
const SIZE_OF_COLLECTION = 10;
const MAX_NUMBER = 1000;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;
const BAR_WIDTH = 10;

var _xScale,_yScale;

var generateRandomNumber = function(){
	return Math.round(Math.random() * MAX_NUMBER);
};

var prepare = function(givenData){
	prepared = [];
	for(var i = 0; i<givenData.length; i++){
		prepared.push({"number": givenData[i], "index": i});
	}
	return prepared;
}

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var _line = d3.line()
		.x(function(d){return _xScale(d["index"])})
		.y(function(d){return _yScale(d["number"])});

var createChart = function(){
	var svg = d3.select('.container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);

	_xScale = d3.scaleLinear()
			.domain([0,SIZE_OF_COLLECTION-1])
			.range([0, INNER_WIDTH]);

	_yScale = d3.scaleLinear()
			.domain([1,MAX_NUMBER])
			.range([INNER_HEIGHT, 0]);

	var xAxis = d3.axisBottom(_xScale).ticks(10);
	var yAxis = d3.axisLeft(_yScale).ticks(20);

	svg.append('g')
			.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
			.call(xAxis)

	svg.append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.call(yAxis);

	svg.append('g')
		.attr('transform',  translate(MARGIN, MARGIN))
		.attr("class","line_chart")
		.append('path');
};

var updateLineChart = function(data){
	var path = d3.select('.line_chart').selectAll('path').datum(prepare(data));

	path.attr("d",_line)
		.classed('random-number', true)
		.attr('transform',null)
		.transition()
		.duration(400)
		.ease(d3.easeLinear)
		.attr('transform',translate(_xScale(-1),0));
};

var updateBarChart = function(data){
	var g = d3.select('svg').selectAll('g');
	var rects = g.selectAll('rect').data(prepare(data));

	rects.enter().append("rect");

	rects.attr('x',function(d){return _xScale(d["index"]) - (BAR_WIDTH/2)})
		.attr('y',function(d){return _yScale(d["number"])})
		.attr("width", BAR_WIDTH)
		.attr("height", function(d){return INNER_HEIGHT - _yScale(d["number"])});
}

var updateData = function(data){
	data.push(generateRandomNumber());
	// updateBarChart(data)
	updateLineChart(data);
	data.shift(1);
} 

var providePreviousData = function(){
	var collection = [];
	for(var count = 0; count < SIZE_OF_COLLECTION; count++)
		collection.push(generateRandomNumber());
	return collection;
}
var show = function(){
	createChart();
	var previousData = providePreviousData(); 
	setInterval(updateData,430,previousData);
}
window.onload = show;
