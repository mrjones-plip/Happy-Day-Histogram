/**
 * Generate an entirely HTML based histogram for events across a day
 * Version 1.4
 * @param targetId - ID in DOM to render into
 * @param hourData array of ints - total min per hour
 * @param color string - CSS color
 * @constructor
 */
function HappyDayHistogram (targetId, hourData, color ) {

    let bottom = 0;
    let top = 100;
    let width;
    let finalHTML = '';
    let max = 60;
    let i = 0;
    let label, aOrP, extraClass, lastHour;
    let count = 0;
    let totalHours = 0;
    let hour = 0;
    let localColor = '#043864'; // a dark blue kinda job

    if (color !== undefined) {
        localColor = color;
    }

    finalHTML += '<style>#' + targetId + ' .filledBottom { background-color: ' + localColor + ';}</style>';

    // zero out and then inject html for histogram
    finalHTML += '<div class="dayHistogram">' +
        '<div class="yAxisLabel">' + max + '</div>' +
        '<div class="yAxis">&nbsp;</div>' +
        '<div class="data">';

    // count days with non-zero minutes
    for (i = 0; i < hourData.length; i++) {
        if (hourData[i] > 0) {
            totalHours += 1;
            lastHour = i;
        }
    }

    for (i = 0; i < hourData.length; i++) {

        hour = hourData[i];
        if (hour <= 0){
            continue;
        }
        if(count === 0){
            extraClass = ' firstHour ';
        }

        width = Math.floor((1 / totalHours * 100 ));
        finalHTML +=
        '<div class="hour hour' + i + '" style="width: ' + width + '%">' +
        '<div class="chart">';

        // round bottom to closest 2
        bottom = Math.ceil((hour / max * 100) / 2) * 2;
        top = 100 - bottom ;

        // Build up HTML for the column
        finalHTML += '<div class="bar">' +
                '<div class="emptyTop" style="height: ' + top + '%">&nbsp;</div>';
        finalHTML += '<div class="filledBottom " style="height: ' + bottom  + '%">&nbsp;</div>';
        finalHTML += '</div>';

        label = Number(i);
        aOrP = 'a';
        if (label === 0 ) {
            label = 12;
        } else if (label >= 12 ){
            label = i - 12;
            aOrP = 'p';
        }
        label = label + aOrP;

        finalHTML +=
            '</div>' + // close chart
            '<div class="name"> ' + label + '</div>' + // add month label
            '</div>'; // close month

        count += 1;
    }

    // close out 'yearHistogram' and 'data' divs
    finalHTML += '</div></div><br style="clear:both"/>';

    document.getElementById(targetId).innerHTML = finalHTML;
}
