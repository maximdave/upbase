import request from 'supertest';
import app from '../app';

import {
	testDbConnect,
	dbDisconnect,
} from '../database/mongodbMemoryServer';

beforeAll(async () => {
	await testDbConnect();
 
});
afterAll(async () => {
	await dbDisconnect();
});

const currentUser: Record<string, any> = {};

describe('POST/ signup and signin', () => {  
	test('test for sign up', async () => {
		const user = {
			firstName: 'David',
			lastName: 'Enoragbon',
			userName: 'maximdave',
			gender: 'male',
			email: 'enoragbondavid35@gmail.com',
			password: '123456',
		};
		const res = await request(app).post('/upbase/signUp').send(user);

		currentUser._id = res.body.user._id;
		currentUser.email = res.body.user.email;
		expect(res.status).toBe(201);
		expect(res.body.message).toBe('User Created Successfully');

	});

	test('test for sign in', async () => {
		const res = await request(app).post('/upbase/signIn').send({
			email: 'enoragbondavid35@gmail.com',
			password: '123456',
		});
		expect(res.status).toBe(200);
		expect(res.body.status).toBe('success');
  
		const token = res.body.token;
		currentUser.token = token;
	});
});
