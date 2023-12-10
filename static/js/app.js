// URL to fetch the JSON data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Global variable to store the fetched data
let globalData = null;

// Initialize the dashboard
function init() {
    let dropdown = d3.select("#selDataset");

    // Fetching the JSON data from the URL
    d3.json(url).then((data) => {
        data.names.forEach((name) => {
            dropdown.append("option").text(name).property("value", name);
        });

        globalData = data;

        // Use the first sample from the list to build the initial visualizations
        const firstSample = data.names[0];
        updateChartsAndMetadata(firstSample);
    });
}
init();

// Function to update the charts and metadata based on the selected sample ID
function updateChartsAndMetadata(selectedId) {
    let selectedSample = globalData.samples.find(sample => sample.id === selectedId);
    let selectedMetadata = globalData.metadata.find(metadata => metadata.id == selectedId);

    createBarChart(selectedSample);
    createBubbleChart(selectedSample);
    displaySampleMetadata(selectedMetadata);
}

// Function to create a horizontal bar chart using Plotly
function createBarChart(sample) {
    let sortedIndices = sample.sample_values.map((value, index) => [value, index])
                                    .sort((a, b) => b[0] - a[0])
                                    .map(pair => pair[1])
                                    .slice(0, 10);

    let topOtuIds = sortedIndices.map(index => `OTU ${sample.otu_ids[index]}`);
    let topSampleValues = sortedIndices.map(index => sample.sample_values[index]);
    let topOtuLabels = sortedIndices.map(index => sample.otu_labels[index]);

    let trace = {
        x: topSampleValues,
        y: topOtuIds,
        text: topOtuLabels,
        type: 'bar',
        orientation: 'h'
    };

    let data = [trace];

    let layout = {
        title: 'Top 10 OTUs',
        xaxis: { title: 'Sample Values' },
        yaxis: {
            title: 'OTU IDs',
            autorange: 'reversed'
        }
    };

    Plotly.newPlot('bar', data, layout);
}

// Function to create a bubble chart using Plotly
function createBubbleChart(sample) {
    let trace = {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids,
            colorscale: 'Earth'
        }
    };

    let data = [trace];

    let layout = {
        title: 'Bacteria Cultures Per Sample',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' },
        height: 600,
        width: 1000
    };

    Plotly.newPlot('bubble', data, layout);
}

// Function to display the sample metadata
function displaySampleMetadata(metadata) {
    let panel = d3.select("#sample-metadata");
    panel.html(""); // Clear existing metadata

    Object.entries(metadata).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
}

// Function called when the dropdown selection changes
function optionChanged(newSampleId) {
    updateChartsAndMetadata(newSampleId);
}
