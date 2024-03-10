// const PrismaClient = require('@prisma/client').PrismaClient
import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function start() {
    await db.product.create({
        data: {
            name: "Apple iPhone 15 Pro Max",
            img: "/products/iphone15promax1.jpg",
            desc: "256GB Natural Titanium",
            price: 1346,
            rating: 0
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 15",
            img: "/products/iPhone13128GBGreen.avif",
            desc: "128GB Blue",
            price: 999,
            rating: 0
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 14",
            img: "/products/iPhone13128GBGreen.avif",
            desc: "128GB nanoSim/eSim Midnight",
            price: 810,
            rating: 0
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 11",
            img: "/products/iPhone11128GBWhite.avif",
            desc: "128GB nanoSim/eSim White",
            price: 530,
            rating: 0
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 15",
            img: "/products/iPhone15256GBGreen.avif",
            desc: "256GB Green (Dual Sim)",
            price: 999,
            rating: 0
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 14 Pro Max",
            img: "/products/iPhone14ProMax512GBSpaceBlack.avif",
            desc: "512GB nanoSim/eSim Space Black",
            price: 1755,
            rating: 0
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 13",
            img: "/products/iPhone13128GBGreen.avif",
            desc: "128GB nanoSim/eSim Green",
            price: 740,
            rating: 0
        }
    })
}

start()