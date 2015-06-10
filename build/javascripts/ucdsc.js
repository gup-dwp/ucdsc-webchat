$(function() {

    $('#calendar').fullCalendar({
      header: {
  				left: 'prev,next today',
  				center: 'title',
  				right: 'month,agendaWeek,agendaDay'
  			},
  			selectable: true,
        selectHelper: true,
        eventLimit: true, // allow "more" link when too many events,
        snapDuration: '00:60:00',
  			select: function(start, end) {
  				var title = prompt('Event Title:','', 'Enter Time:');
  				var eventData;
  				if (title) {
  					eventData = {
  						title: title,
  						start: start,
  						end: end,
              name: 'test'

  					};
  					$('#calendar').fullCalendar('renderEvent', eventData, false);
            console.log(JSON.stringify(eventData)) // stick? = true
  				}
  				//$('#calendar').fullCalendar('unselect');
  			},
  			editable: true,
        events: [
  				{
            title: 'Long Event',
  					start: '2015-06-07',
  					end: '2015-06-10',
            color: 'red'
  				},
          {
              title: 'Meeting with A Customer',
    					start: '2015-06-05T08:00Z',
    					end: '2015-056-05T10:00Z'
    				},
            {
                title: 'Meeting with B Customer',
      					start: '2015-06-05T12:00Z',
      					end: '2015-056-05T14:00Z'
      				}
        ]
    });

    $('#chart').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Performance'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday'
            ],
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: 'Calls'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'John',
            data: [3, 4, 3, 5, 4]
        }, {
            name: 'Jane',
            data: [1, 3, 4, 3, 3]
        }]
    });

    $('.footer-link').click(function() {
      $(this).next('ul').toggle();
      return false;
    });

    // Put event listeners into place
    /*window.addEventListener("DOMContentLoaded", function() {
    	// Grab elements, create settings, etc.
    	var canvas = document.getElementById("canvas"),
    		context = canvas.getContext("2d"),
    		video = document.getElementById("video"),
    		videoObj = { "video": true },
    		errBack = function(error) {
    			console.log("Video capture error: ", error.code);
    		};

    	// Put video listeners into place
    	if(navigator.getUserMedia) { // Standard
    		navigator.getUserMedia(videoObj, function(stream) {
    			video.src = stream;
    			video.play();
    		}, errBack);
    	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    		navigator.webkitGetUserMedia(videoObj, function(stream){
    			video.src = window.webkitURL.createObjectURL(stream);
    			video.play();
    		}, errBack);
    	}
    	else if(navigator.mozGetUserMedia) { // Firefox-prefixed
    		navigator.mozGetUserMedia(videoObj, function(stream){
    			video.src = window.URL.createObjectURL(stream);
    			video.play();
    		}, errBack);
    	}
    }, false);
*/
})
