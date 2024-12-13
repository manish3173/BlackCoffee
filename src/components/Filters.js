
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Filters = ({ filters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters({ ...localFilters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(localFilters);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEndYear">
                <Form.Label>End Year</Form.Label>
                <Form.Control
                    type="text"
                    name="endYear"
                    value={localFilters.endYear}
                    onChange={handleChange}
                    placeholder="Enter year"
                />
            </Form.Group>

            <Form.Group controlId="formTopic">
                <Form.Label>Topic</Form.Label>
                <Form.Control
                    type="text"
                    name="topic"
                    value={localFilters.topic}
                    onChange={handleChange}
                    placeholder="Enter topic"
                />
            </Form.Group>

            <Form.Group controlId="formSector">
                <Form.Label>Sector</Form.Label>
                <Form.Control
                    type="text"
                    name="sector"
                    value={localFilters.sector}
                    onChange={handleChange}
                    placeholder="Enter sector"
                />
            </Form.Group>

            <Form.Group controlId="formRegion">
                <Form.Label>Region</Form.Label>
                <Form.Control
                    type="text"
                    name="region"
                    value={localFilters.region}
                    onChange={handleChange}
                    placeholder="Enter region"
                />
            </Form.Group>

            <Form.Group controlId="formPestle">
                <Form.Label>PESTLE</Form.Label>
                <Form.Control
                    type="text"
                    name="pestle"
                    value={localFilters.pestle}
                    onChange={handleChange}
                    placeholder="Enter PESTLE"
                />
            </Form.Group>

            <Form.Group controlId="formSource">
                <Form.Label>Source</Form.Label>
                <Form.Control
                    type="text"
                    name="source"
                    value={localFilters.source}
                    onChange={handleChange}
                    placeholder="Enter source"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Apply Filters
            </Button>
        </Form>
    );
};

export default Filters;
