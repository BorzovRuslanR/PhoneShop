// @ts-check
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
  let xiaomi = await db.manufacturer.findFirst({
    where: {
      name: "Xiaomi",
    },
  });
  let samsung = await db.manufacturer.findFirst({
    where: {
      name: "Samsung",
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
  if (!xiaomi) {
    xiaomi = await db.manufacturer.create({
      data: {
        name: "Xiaomi",
      },
    });
  }
  if (!samsung) {
    samsung = await db.manufacturer.create({
      data: {
        name: "Samsung",
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
    await db.product.create({
        data: {
            name: "Xiaomi 14 Ultra",
            img: "/products/Xiaomi14Ultra.jpg",
            desc: "512GB nanoSim/eSim Space Black",
            price: 2055,
            manufacturerId: xiaomi.id
        }
    })
    await db.product.create({
        data: {
            name: "Galaxy A55 5G",
            img: "/products/Galaxy A55.jpg.webp",
            desc: "128GB nanoSim/eSim",
            price: 640,
            manufacturerId: samsung.id
        }
    })
    await db.product.create({
        data: {
            name: "Xiaomi 14",
            img: "/products/Xiaomi14Ultra.jpg",
            desc: "512GB nanoSim/eSim Space Black",
            price: 1055,
            manufacturerId: xiaomi.id
        }
    })
    await db.product.create({
        data: {
            name: "Galaxy A55",
            img: "/products/Galaxy A55.jpg.webp",
            desc: "128GB nanoSim/eSim",
            price: 540,
            manufacturerId: samsung.id
        }
    })
}

start()