// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function() { 

  $("table.tablesorter")  
  .tablesorter({debug: false, widgets: ['zebra'], sortList: [[0,0], [1,0]]})  
  .tablesorterFilter({filterContainer: $("#filter-box"),  
                      filterClearContainer: $("#filter-clear-button"),  
                      filterColumns: [1,2],  
                      filterCaseSensitive: false})
	.tablesorterPager({container: $(".pager"), positionFixed: false});

	$("a.button").click(function(){
	   this.blur();
	});
	$("a.button").wrapInner("<span></span>")

});
