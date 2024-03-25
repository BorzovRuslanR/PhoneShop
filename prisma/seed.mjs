// const PrismaClient = require('@prisma/client').PrismaClient
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function start() {
    
  /** @type {import("@prisma/client").Manufacturer | null} */
  let apple = await db.manufacturer.findFirst({
    where: {
      name: "Apple",
    },
  });
  if (apple && process.env.NODE_ENV === "production") {
    console.log("Data already exists, skipping seed");
    return;
  }
  if (!apple) {
    apple = await db.manufacturer.create({
      data: {
        name: "Apple",
      },
    });
  }
    



    await db.product.create({
        data: {
            name: "Apple iPhone 15 Pro Max",
            img: "/products/iphone15promax1.jpg",
            desc: "256GB Natural Titanium",
            price: 1346,
            manufacturerId: apple.id
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 15",
            img: "/products/iPhone13128GBGreen.avif",
            desc: "128GB Blue",
            price: 999,
            manufacturerId: apple.id
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 14",
            img: "/products/iPhone13128GBGreen.avif",
            desc: "128GB nanoSim/eSim Midnight",
            price: 810,
            manufacturerId: apple.id
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 11",
            img: "/products/iPhone11128GBWhite.avif",
            desc: "128GB nanoSim/eSim White",
            price: 530,
            manufacturerId: apple.id
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 15",
            img: "/products/iPhone15256GBGreen.avif",
            desc: "256GB Green (Dual Sim)",
            price: 999,
            manufacturerId: apple.id
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 14 Pro Max",
            img: "/products/iPhone14ProMax512GBSpaceBlack.avif",
            desc: "512GB nanoSim/eSim Space Black",
            price: 1755,
            manufacturerId: apple.id
        }
    })
    await db.product.create({
        data: {
            name: "Apple iPhone 13",
            img: "/products/iPhone13128GBGreen.avif",
            desc: "128GB nanoSim/eSim Green",
            price: 740,
            manufacturerId: apple.id
        }
    })
}

start()