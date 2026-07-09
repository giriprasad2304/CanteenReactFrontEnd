require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/db/db');
const itemModel = require('./src/models/item.model');

const dummyItems = [
    // ── Starters ──────────────────────────────────────────
    {
        name: "Veg Spring Rolls",
        price: 60,
        Quantity: 50,
        category: "starter",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400"
    },
    {
        name: "Chicken 65",
        price: 120,
        Quantity: 40,
        category: "starter",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400"
    },
    {
        name: "Paneer Tikka",
        price: 100,
        Quantity: 35,
        category: "starter",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400"
    },
    {
        name: "Masala Papad",
        price: 30,
        Quantity: 60,
        category: "starter",
        image: "https://images.unsplash.com/photo-1606491048802-8342506d6471?w=400"
    },

    // ── Main Course ────────────────────────────────────────
    {
        name: "Veg Biryani",
        price: 120,
        Quantity: 30,
        category: "main course",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400"
    },
    {
        name: "Chicken Biryani",
        price: 180,
        Quantity: 25,
        category: "main course",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400"
    },
    {
        name: "Dal Makhani",
        price: 90,
        Quantity: 40,
        category: "main course",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400"
    },
    {
        name: "Butter Chicken",
        price: 160,
        Quantity: 20,
        category: "main course",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400"
    },
    {
        name: "Idly (2 pcs)",
        price: 20,
        Quantity: 80,
        category: "main course",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400"
    },
    {
        name: "Masala Dosa",
        price: 50,
        Quantity: 60,
        category: "main course",
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400"
    },

    // ── Sides ──────────────────────────────────────────────
    {
        name: "Sambar",
        price: 25,
        Quantity: 100,
        category: "side",
        image: "https://images.unsplash.com/photo-1606491048802-8342506d6471?w=400"
    },
    {
        name: "Coconut Chutney",
        price: 15,
        Quantity: 100,
        category: "side",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"
    },
    {
        name: "Raita",
        price: 30,
        Quantity: 50,
        category: "side",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400"
    },
    {
        name: "Pickle",
        price: 10,
        Quantity: 200,
        category: "side",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400"
    },

    // ── Beverages ──────────────────────────────────────────
    {
        name: "Mango Lassi",
        price: 50,
        Quantity: 40,
        category: "beverage",
        image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400"
    },
    {
        name: "Masala Chai",
        price: 20,
        Quantity: 80,
        category: "beverage",
        image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=400"
    },
    {
        name: "Fresh Lime Soda",
        price: 35,
        Quantity: 60,
        category: "beverage",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400"
    },
    {
        name: "Buttermilk",
        price: 20,
        Quantity: 70,
        category: "beverage",
        image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400"
    },
];

async function seed() {
    await connectDB();
    // Small delay to let mongoose connect
    await new Promise(r => setTimeout(r, 1500));

    try {
        const existing = await itemModel.countDocuments();
        if (existing > 0) {
            console.log(`⚠️  ${existing} items already exist. Clearing and re-seeding...`);
            await itemModel.deleteMany({});
        }

        const inserted = await itemModel.insertMany(dummyItems);
        console.log(`✅  Seeded ${inserted.length} items successfully!`);

        const counts = await itemModel.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);
        console.log('\n📊 Items by category:');
        counts.forEach(c => console.log(`   ${c._id}: ${c.count}`));
    } catch (err) {
        console.error('❌ Seed failed:', err);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from DB.');
    }
}

seed();
