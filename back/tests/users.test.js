const assert = require('assert');
const request = require('supertest');
const api = "http://localhost:3000";

let mockUser = {
    name: "TestingName",    
    lastname: "TestingLastname",
    email: "testingEmail@gmail.com",
    password: "12345"
};

let mockLogin = {    
    email: "testingEmail@gmail.com",
    password: "12345"
};

var responseUser;
var token;

describe('POST', function() {
    
    test('Register an User', async () => {
        const response = await request(api)
        .post('/api/users/register')
        .send(mockUser)
        .expect(201)
        responseUser = response._body;
        console.log(responseUser);
    });

    test('Loggin User', async () => { 
        const response = await request(api)
        .post('/api/users/login')   
        .send(mockLogin)
        token = response._body;
    });    
    
});

describe('DELETE', function() {

    console.log(responseUser);

    test('Delete User by ID', async () => { 
        await request(api)
        .delete('/api/users/' + responseUser._id)
        .set({"X-Session-Token": token.token})
        .expect(200)
        done()
    });    
}); 

se podrá hacer un describe cuando termine el otro?

/*
describe('Getting all users', function() {
    test('Get all users', async () => { 
        await request(api)
        .get('/api/users')   
        .set({"X-Session-Token": ""})
        .expect(200)
    });
}); */

/*
describe('Posting a task', function() {
    test('Post Correct Task', async () => { 
        const response = await request(api)
        .post('/api/tasks') 
        .send(mockTask)
        .expect(201)
        responseTask = response._body
        assert(mockTask.name, response.body.name)
    });

    test('Post Task which obtain a 409 error due to name param contains a currently existing name', async () => { 
        await request(api)
        .post('/api/tasks') 
        .send(mockTask)
        .expect(409)
    });

    test('Post Task which obtain a 400 error due missing correct name param', async () => { 
        await request(api)
        .post('/api/tasks') 
        .send({})
        .expect(400)
    });
});

describe('Getting specified task', function() {
    test('Get Task by ID', async () => { 
        await request(api)
        .get('/api/tasks/' + responseTask._id) 
        .expect(200)
    }); 

    test('Get Task by ID which obtain a 404 because the ID doesnt exist', async () => {
        await request(api)
        .get('/api/tasks/fakeID') 
        .expect(404)        
    });

});

describe('Modify a task', function() {

    const newTask = {
        name: "Task-modified",
        status: "completed"
    }

    test('Updating a Task', async () => { 
        const response = await request(api)
        .put('/api/tasks/' + responseTask._id)
        .send(newTask)
        .expect(200)
        responseTask = response._body;
        assert(newTask.name, responseTask.name)
        assert(newTask.status, responseTask.status)
    });

    test('Updating a Task which obtain 409 because the name to update currently exists', async () => { 
        await request(api)
        .put('/api/tasks/' + responseTask._id)
        .send(newTask)
        .expect(409)        
    });

    test('Updating a Task which obtain 400 because the new data doesnt contain params', async () => { 
        await request(api)
        .put('/api/tasks/' + responseTask._id)
        .send({})
        .expect(400)        
    });

    test('Updating a Task which obtain a 404 because the ID doesnt exist', async () => { 
        await request(api)
        .put('/api/tasks/fakeID')
        .send(newTask)
        .expect(404)
    });

});

describe('Delete a task', function() {
    test('Delete Task by ID', async () => { 
        await request(api)
        .delete('/api/tasks/' + responseTask._id) 
        .expect(200)
    });       
    
});

*/

