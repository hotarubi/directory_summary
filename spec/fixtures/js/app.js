
/*jslint white: false, onevar: true, browser: true, devel: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: false, newcap: true, immed: true */
/*global jQuery, $, Raphael */

function BarChart(domID, scale, ratio, data) {
	if ( !(this instanceof arguments.callee) ) {
    return new arguments.callee(arguments);
  }
  
  var self          = this,
      width         = 100 * scale,
      height        = width * ratio,
      bar_height    = height * 0.25,
      bar_length    = width * 0.8,
      x             = width * 0.1,
      y             = height * 0.375,
      color_orange  = '#FFA05C',
      color_red     = '#FC5A5E',
      color_blue    = '#CCE6FF',
      color_green   = '#239017',
      color_dark    = '#3D3D3D'
      bar_data      = [];
      
  self.bubblePath = "M 39.00,39.00l-9.00,0.00 l-6.00,9.00l-6.00-9.00L9.00,39.00 c-4.971,0.00-9.00-4.032-9.00-9.00L0.00,9.00 c0.00-4.971, 4.029-9.00, 9.00-9.00 l30.00,0.00 c 4.968,0.00, 9.00,4.029, 9.00,9.00l0.00,21.00 C 48.00,34.968, 43.968,39.00, 39.00,39.00z";
  
  self.init = function() {
    self.paper = Raphael(domID, width, height);
    self.parseData();
    self.draw();
  };
  
  self.parseData = function() {
    if ( data.actual > data.total_benchmark ) {
      bar_data.push([1.0, color_green, data.actual]);
      bar_data.push([data.total_benchmark / data.actual, color_blue, data.total_benchmark]);
      bar_data.push([data.benchmark_td / data.actual, color_orange, data.benchmark_td]);
    } else if ( data.actual > data.benchmark_td ) {
      bar_data.push([1.0, color_blue, data.total_benchmark]);
      bar_data.push([data.actual / data.total_benchmark, color_green, data.actual]);
      bar_data.push([data.benchmark_td / data.total_benchmark, color_orange, data.benchmark_td]);
    } else {
      bar_data.push([1.0, color_blue, data.total_benchmark]);
      bar_data.push([data.benchmark_td / data.total_benchmark, color_red, data.benchmark_td]);
      bar_data.push([data.actual / data.total_benchmark, color_orange, data.actual]);
    }
  };
  
  self.draw = function() {
    $(bar_data).each(function(i, d){
      self.drawBar(d[0], d[1]);
      self.drawTooltip(d[0], d[2]);
    });
  };
  
  self.drawBar = function(proportion, color) {
    var bar, hoverFunc, hideFunc;
    bar = self.paper.rect(x, y, bar_length * proportion, bar_height);
    bar.attr({
      'stroke-width': 0,
      'fill':         color,
      'fill-opacity': 1.0,
      'stroke':       color_dark
    });
    hoverFunc = function() {
      bar.animate({'stroke-width': 1}, 1000, 'bounce');
    };
    hideFunc = function() {
      bar.animate({'stroke-width': 0 }, 1000, 'bounce');      
    };
    $(bar.node).hover(hoverFunc, hideFunc);
  };
  
  self.drawTooltip = function(proportion, text) {
    var tooltip, label, hoverFunc, hideFunc, scale = 0.5;
    tooltip = self.paper.path(self.bubblePath);
    tooltip.translate(bar_length * proportion, - bar_height / 2);
    tooltip.scale(scale);
    tooltip.attr({
        'stroke-width': 0,
        'fill'        : color_dark,
        'fill-opacity': 0.9
    });
    
    label = self.paper.text(bar_length * (proportion + 0.12), bar_height * 0.6, text);
    label.attr({
        'fill': '#ffffff'
      , 'font-size': 6
      , 'font-family': "'League Gothic', 'Futura-CondensedMedium', 'Gill Sans MT Condensed', 'Arial Narrow', sans-serif"
    });
    label.toBack();
    tooltip.toBack();
    
    hoverFunc = function() {
      tooltip.animate({scale: 0.6}, 1000, 'bounce');
    };
    hideFunc = function() {
      tooltip.animate({scale: scale}, 1000, 'bounce');      
    };
    $(tooltip.node).hover(hoverFunc, hideFunc);
    $(label.node).hover(hoverFunc, hideFunc);
  };
  
  self.init();
}

var chart;
jQuery(function () {
  
  chart = new BarChart('bar-chart', 2.5, 0.3, {actual: 2400.0, benchmark_td: 2000.0, total_benchmark: 4000.0});
  
});


