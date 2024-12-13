import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import Chart from './Chart';
import { fetchData } from '../services/api';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        endYear: '',
        topic: '',
        sector: '',
        region: '',
        pestle: '',
        source: ''
    });

    useEffect(() => {
        fetchData().then((response) => {
            setData(response);
            setFilteredData(response);
        });
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setFilteredData(
            data.filter((item) => {
                return (
                    (!newFilters.endYear || item.end_year === newFilters.endYear) &&
                    (!newFilters.topic || item.topic.includes(newFilters.topic)) &&
                    (!newFilters.sector || item.sector.includes(newFilters.sector)) &&
                    (!newFilters.region || item.region.includes(newFilters.region)) &&
                    (!newFilters.pestle || item.pestle.includes(newFilters.pestle)) &&
                    (!newFilters.source || item.source.includes(newFilters.source))
                );
            })
        );
    };

    return (
        <Container fluid>
            <Row className="mt-4">
                <Col md={3}>
                    {/* Filters Card */}
                    <Card>
                        <Card.Body>
                            <Card.Title>Filters</Card.Title>
                            <Filters filters={filters} onFilterChange={handleFilterChange} />
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={9}>
                    {/* Chart Card */}
                    <Card>
                        <Card.Body>
                            <Card.Title>Data Visualization</Card.Title>
                            <Chart data={filteredData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
