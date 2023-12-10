function createGaugeChart(wfreq) {
    let data = [{
        type: "indicator",
        mode: "gauge+number",
        value: wfreq,
        title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
        gauge: {
            axis: { range: [null, 9] },
            bar: { color: "black" }, // Gauge handle
            steps: [
                { range: [0, 1], color: "#ffffcc" },
                { range: [1, 2], color: "#ffeda0" },
                { range: [2, 3], color: "#fed976" },
                { range: [3, 4], color: "#feb24c" },
                { range: [4, 5], color: "#fd8d3c" },
                { range: [5, 6], color: "#f7fcb9" },
                { range: [6, 7], color: "#addd8e" },
                { range: [7, 8], color: "#78c679" },
                { range: [8, 9], color: "#31a354" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: wfreq
            }
        }
    }];

    let layout = { 
        width: 600, 
        height: 450, 
        margin: { t: 0, b: 0 }
    };

    Plotly.newPlot('gauge', data, layout);
}



function updateChartsAndMetadata(selectedId) {
    let selectedSample = globalData.samples.find(sample => sample.id === selectedId);
    let selectedMetadata = globalData.metadata.find(metadata => metadata.id == selectedId);

    createBarChart(selectedSample);
    createBubbleChart(selectedSample);
    displaySampleMetadata(selectedMetadata);
    createGaugeChart(selectedMetadata.wfreq); // Update the gauge chart
}
