import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Form, Button } from 'react-bootstrap';

const generateRandomData = (numPoints = 10) => {
    const labels = [];
    const intensityData = [];
    const likelihoodData = [];
    
    for (let i = 0; i < numPoints; i++) {
        labels.push(`Point ${i + 1}`);
        intensityData.push(Math.floor(Math.random() * 100));  // Random values between 0-100
        likelihoodData.push(Math.floor(Math.random() * 100));  // Random values between 0-100
    }

    return {
        labels,
        datasets: [
            {
                label: 'Intensity',
                data: intensityData,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
            {
                label: 'Likelihood',
                data: likelihoodData,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
            },
        ],
    };
};

const RandomChart = () => {
    const chartRef = useRef(null);
    const myChart = useRef(null);
    
    // States for filter values
    const [filters, setFilters] = useState({
        endYear: '2023',
        topic: 'Technology',
        sector: 'Finance',
        region: 'North America',
        pestle: 'Economic',
        source: 'Research Paper',
    });

    const [filteredData, setFilteredData] = useState(generateRandomData(10));  // Default random data

    useEffect(() => {
        // Simulate applying filters on data
        const newData = generateRandomData(10); // New random data for every change
        setFilteredData(newData);  // Update filtered data
    }, [filters]);

    // Handle changes in filter values
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (chartRef.current) {
            if (myChart.current) {
                myChart.current.destroy();  // Destroy previous chart instance if exists
            }

            const ctx = chartRef.current.getContext('2d');
            myChart.current = new Chart(ctx, {
                type: 'line',
                data: filteredData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }

        return () => {
            if (myChart.current) myChart.current.destroy();
        };
    }, [filteredData]);

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <Form>
                    <Form.Group controlId="formEndYear">
                        <Form.Label>End Year</Form.Label>
                        <Form.Control
                            as="select"
                            name="endYear"
                            value={filters.endYear}
                            onChange={handleFilterChange}
                        >
                            <option>2025</option>
                            <option>2024</option>
                            <option>2023</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formTopic">
                        <Form.Label>Topic</Form.Label>
                        <Form.Control
                            as="select"
                            name="topic"
                            value={filters.topic}
                            onChange={handleFilterChange}
                        >
                            <option>Technology</option>
                            <option>Science</option>
                            <option>Health</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formSector">
                        <Form.Label>Sector</Form.Label>
                        <Form.Control
                            as="select"
                            name="sector"
                            value={filters.sector}
                            onChange={handleFilterChange}
                        >
                            <option>Finance</option>
                            <option>Healthcare</option>
                            <option>Education</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formRegion">
                        <Form.Label>Region</Form.Label>
                        <Form.Control
                            as="select"
                            name="region"
                            value={filters.region}
                            onChange={handleFilterChange}
                        >
                            <option>North America</option>
                            <option>Europe</option>
                            <option>Asia</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formPestle">
                        <Form.Label>PESTLE</Form.Label>
                        <Form.Control
                            as="select"
                            name="pestle"
                            value={filters.pestle}
                            onChange={handleFilterChange}
                        >
                            <option>Economic</option>
                            <option>Political</option>
                            <option>Social</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formSource">
                        <Form.Label>Source</Form.Label>
                        <Form.Control
                            as="select"
                            name="source"
                            value={filters.source}
                            onChange={handleFilterChange}
                        >
                            <option>Research Paper</option>
                            <option>News Article</option>
                            <option>Blog Post</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>

            {/* Chart */}
            <canvas ref={chartRef} />
        </div>
    );
};

export default RandomChart;
