// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function() { 

  $("table.tablesorter")  
  .tablesorter({debug: false, widgets: ['zebra'], sortList: [[0,0], [1,0]]})  
  .tablesorterFilter({filterContainer: $("#filter-box"),  
                      filterClearContainer: $("#filter-clear-button"),  
                      filterCaseSensitive: false})
	.tablesorterPager({container: $(".pager"), positionFixed: false});

	$("a.button").click(function(){
	   this.blur();
	});
	$("a.button").wrapInner("<span></span>")
	
	$("input[name*='phone']").mask("(999) 999-9999");
	$("input[name*='_at']").mask("99/99/9999 99:99");
  $("input[name*='_on']").mask("99/99/9999");
  $("input[name*='zip']").mask("99999");
	$('input[@title]').example(function() {
		return $(this).attr('title');
	});
});
