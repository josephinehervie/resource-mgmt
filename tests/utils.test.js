

// Import required modules and utilities
const fs = require('fs').promises;
const { addResource } = require('../utils/AddResourceUtil');

// Builds a fake Express response object
const mockResponse = () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
});

describe('Unit Tests for Utils', () => {
    // Reset mocks before each test to avoid "leaking" state between tests
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('addResource should add a resource', async () => {
        // resources.json starts as an empty array
        fs.readFile.mockResolvedValueOnce(JSON.stringify([]));
        fs.writeFile.mockResolvedValue();

        const req = {
            body: {
                name: 'Test Resource',
                location: 'Room 101',
                description: 'Projector and screen',
                owner: 'user@example.com',
            },
        };
        const res = mockResponse();

        await addResource(req, res);

        expect(res.status).toHaveBeenCalledWith(201);

        const response = res.json.mock.calls[0][0];
        expect(response.length).toEqual(1);
        expect(response[0].name).toEqual('Test Resource');
    });


});