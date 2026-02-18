import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";

// Load env vars
dotenv.config({ path: "backend/.env" });

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123", // Will be hashed by pre-save hook
        role: "ADMIN",
    },
    {
        name: "Test User",
        email: "user@example.com",
        password: "user123",
        role: "USER",
    },
];

const products = [
    // Airpodes
    {
        productName: "AirPods Pro 2nd Gen",
        brandName: "Apple",
        category: "Airpodes",
        productImage: ["https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361"],
        description: "Rebuilt from the sound up. AirPods Pro (2nd generation) with MagSafe Charging Case (USB-C).",
        price: 24900,
        sellingPrice: 19900,
    },
    {
        productName: "Galaxy Buds2 Pro",
        brandName: "Samsung",
        category: "Airpodes",
        productImage: ["https://images.samsung.com/is/image/samsung/p6pim/in/sm-r510nzwainu/gallery/in-galaxy-buds2-pro-r510-sm-r510nzwainu-533190453?$650_519_PNG$"],
        description: "24-bit Hi-Fi audio for quality listening experience. ANC with 3 high SNR microphones eliminates more exterior noise.",
        price: 17999,
        sellingPrice: 10999,
    },
    // Watches
    {
        productName: "Apple Watch Series 9",
        brandName: "Apple",
        category: "Watches",
        productImage: ["https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-card-40-s9-202309?wid=340&hei=264&fmt=p-jpg&qlt=95&.v=1692650379201"],
        description: "Smarter. Brighter. Mightier. Apple Watch Series 9 helps you stay connected, active, healthy, and safe.",
        price: 41900,
        sellingPrice: 38900,
    },
    {
        productName: "Galaxy Watch 6",
        brandName: "Samsung",
        category: "Watches",
        productImage: ["https://images.samsung.com/is/image/samsung/p6pim/in/2307/gallery/in-galaxy-watch6-r945-sm-r945fzsains-537406351?$650_519_PNG$"],
        description: "Unlock your potential with Galaxy Watch6. Track your sleep, fitness, and wellness with ease.",
        price: 29999,
        sellingPrice: 19999,
    },
    // Mobiles
    {
        productName: "iPhone 15",
        brandName: "Apple",
        category: "Mobiles",
        productImage: ["https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777972"],
        description: "Dynamic Island, 48MP Main camera, and USB-C. Durable color-infused glass and aluminum design.",
        price: 79900,
        sellingPrice: 70900,
    },
    {
        productName: "Galaxy S24 Ultra",
        brandName: "Samsung",
        category: "Mobiles",
        productImage: ["https://images.samsung.com/is/image/samsung/p6pim/in/sm-s928bzTQinu/gallery/in-galaxy-s24-s928-sm-s928bztqinu-539572978?$650_519_PNG$"],
        description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity.",
        price: 129999,
        sellingPrice: 119999,
    },
    // Mouse
    {
        productName: "MX Master 3S",
        brandName: "Logitech",
        category: "Mouse",
        productImage: ["https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1"],
        description: "An icon remastered. Meet MX Master 3S – an instant classic remastered with extreme precision and tactile typing.",
        price: 9995,
        sellingPrice: 8500,
    },
    // Televisions
    {
        productName: "Sony BRAVIA XR",
        brandName: "Sony",
        category: "Televisions",
        productImage: ["https://www.sony.co.in/image/426baa12739327521759604106579308?fmt=pjpeg&wid=1200&hei=470&bgcolor=F1F5F9&bgc=F1F5F9"],
        description: "Cognitive Processor XR™. Intelligent TV processing technology that understands how humans see and hear.",
        price: 129900,
        sellingPrice: 99900,
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected");

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        console.log("🗑️  Cleared existing Users and Products");

        // Insert Users
        // Trigger pre-save hooks by saving one by one or using create (insertMany might bypass hooks depending on options, but create triggers them)
        for (const user of users) {
            await new User(user).save();
        }
        console.log("👤 Users Created");

        // Insert Products
        await Product.insertMany(products);
        console.log("📦 Products Created");

        console.log("✅ Data Imported!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
};

seedDB();
