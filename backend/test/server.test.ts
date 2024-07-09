import { server } from "../src/server"
import Prisma from "../src/db";
import request from 'supertest';
import { test } from "tap";
import fastify from "@fastify/cors";
import { prismaMock } from "../src/singleton";

jest.mock('../src/db', () => ({
  entry:{
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
  }
}));
describe("POST", () => {
  it("Given a valid request, should create a new post", async () => {
    const newEntry ={
      id: '8a6e0804-2bd0-4672-b79d-d97027f9071a',
      title: 'New Post!',
      description: 'This is a description.',
      created_at: new Date(),
      scheduled_at: new Date(Date.now()+(1000*60*60*24))
    };
  
    prismaMock.entry.create.mockResolvedValue(newEntry);
  
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: newEntry
    });
    expect(response.statusCode).toBe(200);
  })

  it("Given a valid request without a scheduled_at, should create a new post", async () => {
    const newEntry ={
      id: '8a6e0804-2bd0-4672-b79d-d97027f9071a',
      title: 'New Post!',
      description: 'This is a description.',
      created_at: new Date(),
      scheduled_at: null
    };
  
    prismaMock.entry.create.mockResolvedValue(newEntry);
  
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: newEntry
    });
    expect(response.statusCode).toBe(200);
  })
})

describe("GET", () => {

  beforeAll(async () => {
    await Prisma.entry.deleteMany({});
  })

  afterAll(async () => {
    await Prisma.$disconnect();
  })

  it("Should fetch all posts", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/get/"
    });
    expect(response.statusCode).toBe(200);
  })

  it("Should fetch a single post when given a valid id", async () => {
    const newEntry = {
      id: '91abfa09-8ce3-4df4-bc60-4fa094c1f6bc',
      title: 'Single Post!',
      description: 'This is a single description.',
      created_at: new Date().toISOString(),
      scheduled_at: null
    }

    const firstResponse = await server.inject({
      method: "POST",
      url: "/create/",
      payload: newEntry
    })
    console.log("Status code:", firstResponse.statusCode)
    expect(firstResponse.statusCode).toBe(200);

    await new Promise(resolve => setTimeout(resolve, 1000))

    const response = await server.inject({
      method: "GET",
      url: `/get/${newEntry.id}`
    })
    console.log("Second response:",response.payload)

    expect(response.statusCode).toBe(200);
    const payload = JSON.parse(response.payload);
    expect(payload.id).toBe(newEntry.id);
    expect(payload.title).toBe(newEntry.title);
    expect(payload.description).toBe(newEntry.description);
    expect(payload.created_at).toBe(newEntry.created_at);
    expect(payload.scheduled_at).toBe(newEntry.scheduled_at);
  })

  it("Given invalid id, should return 500", async () => {
    const response = await server.inject({
      method: "GET",
      url: `/get/1`
    })
    expect(response.statusCode).toBe(500);
  })
})

describe("DELETE",  () =>{
  beforeAll(async () => {
    await Prisma.entry.deleteMany({});
  });

  afterAll(async () => {
    await Prisma.$disconnect();
  })

  it("Given a valid id, should return 200", async () => {
    const newEntry = {
      id: '8a6e0804-2bd0-4672-b79d-d97027f9071c',
      title: 'Post to Delete!',
      description: 'This post will be deleted.',
      created_at: new Date().toISOString(), 
      scheduled_at: null
    };

    const createResponse = await server.inject({
      method: "POST",
      url: "/create/",
      payload: newEntry
    });

    console.log("Create Response Status:", createResponse.statusCode);
    expect(createResponse.statusCode).toBe(200);

    const deleteResponse = await server.inject({
      method: "DELETE",
      url: `/delete/${newEntry.id}`
    });

    console.log("Delete Response Status:", deleteResponse.statusCode);
    expect(deleteResponse.statusCode).toBe(200);

    const fetchResponse = await server.inject({
      method: "GET",
      url: `/get/${newEntry.id}`
    });

    expect(fetchResponse.statusCode).toBe(500);

  })
})


describe("PUT", () => {
  beforeAll(async () => {
    await Prisma.entry.deleteMany({});
  });

  afterAll(async () => {
    await Prisma.$disconnect();
  })

  it("Given a valid entry ID and valid body, should return 200", async () => {
    //Creating a new entry
    const newEntry = {
      id: '8a6e0804-2bd0-4672-b79d-d97027f9071d',
      title: 'Post to Update!',
      description: 'This post will be updated.',
      created_at: new Date().toISOString(),
      scheduled_at: null
    };

    const createResponse = await server.inject({
      method: "POST",
      url: "/create/",
      payload: newEntry
    });

    console.log("Create Response Status:", createResponse.statusCode);
    expect(createResponse.statusCode).toBe(200);

    //Updating the entry
    const updatedEntry = {
      ...newEntry,
      title: 'Updated Post Title!',
      description: 'This is the updated description.',
    };

    const updateResponse = await server.inject({
      method: "PUT",
      url: `/update/${newEntry.id}`,
      payload: updatedEntry
    });

    console.log("Update Response Status:", updateResponse.statusCode);
    expect(updateResponse.statusCode).toBe(200);
  })
})

