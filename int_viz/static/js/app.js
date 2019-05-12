function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    
    // Use d3 to select the panel with id of `#sample-metadata`
    var samplemeta =d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    samplemeta.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    d3.json(`metadata/${sample}`).then(data=>{
      Object.entries(data).forEach(meta=>
        samplemeta.append("tr").text(`${meta[0]}: ${meta[1]}`))
    });
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((items) => {
    
    
    var data = [{
  values: items.sample_values.slice(0,10),
  labels: items.otu_ids.slice(0,10),
  hovertext:items.otu_labels.slice(0,10),
  hoverinfo: 'hovertext',
  type: 'pie'
}];

var layout = {
  height: 700,
  width: 1000
  
};

Plotly.newPlot('pie', data, layout);
    var mx=d3.max(items.sample_values.slice(0,10));
    var data2 = [{
      y: items.sample_values.slice(0,10),
      x: items.otu_ids.slice(0,10),
      mode: 'markers',
      hovertext:items.otu_labels.slice(0,10),
      hoverinfo: 'hovertext',
      type: 'scatter',
      marker:{size:items.sample_values.slice(0,10).map(val=>(300*val/mx)),
      color:["#7FFF00","#9932CC","#FFD700","#F0E68C","#FF00FF",
      "#FFA500","#B0E0E6","#FF0000","#87CEEB","#FFFF00"]}
      
}];
var layout2 = {
  height: 600,
  width: 1500
};
Plotly.newPlot('bubble', data2, layout2);

  })

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  d3.select("#pie").html("");
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();


// var data = [{
//   values: [19, 26, 55],
//   labels: ['Residential', 'Non-Residential', 'Utility'],
//   type: 'pie'
// }];

// var layout = {
//   height: 400,
//   width: 500
// };

// Plotly.newPlot('myDiv', data, layout);