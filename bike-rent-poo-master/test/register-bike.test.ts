import request from 'supertest'
import server from '../src/server'
import prisma from '../src/external/database/db'

describe('Register a bike route', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('registers a bikes with valid data', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: 'montain bike',
                type: 'mountain',
                bodySize: 20,
                maxLoad: 50,
                rate: 7,
                description: 'mountain bike',
                ratings: 12,
                imageUrls: ['http://imagebike.com']
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })

    it.only('returns error 400 when trying to register duplicate bike', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: 'montain bike',
                type: 'mountain',
                bodySize: 20,
                maxLoad: 50,
                rate: 7,
                description: 'mountain bike',
                ratings: 12,
                imageUrls: ['http://imagebike.com']
            })
            .expect(201)

        await request(server)
            .post('/api/bikes')
            .send({
                name: 'montain bike',
                type: 'mountain',
                bodySize: 20,
                maxLoad: 50,
                rate: 7,
                description: 'mountain bike',
                ratings: 12,
                imageUrls: ['http://imagebike.com']
            })
            .expect(400)
    }, 20000)
      
    it.only('removes a bike with valid ID', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: 'montain bike',
                type: 'mountain',
                bodySize: 20,
                maxLoad: 50,
                rate: 7,
                description: 'mountain bike',
                ratings: 12,
                imageUrls: ['http://imagebike.com']
            })
            .expect(201)

        await request(server)
            .delete('/api/bikes')
            .send()
            .expect(204)
    }, 2000)
    
    it.only('returns error 404 when trying to remove non-existent bike', async () => {
        await request(server)
            .delete('/api/bikes')
            .send()
            .expect(404)
    }, 2000)
})

