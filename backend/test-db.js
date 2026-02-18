import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "backend/.env" });

console.log("Testing MongoDB Connection...");
console.log("URI:", process.env.MONGODB_URI?.split("@")[1]); // Log only the host part for privacy

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connection Successful!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Connection Failed:", err.message);
        process.exit(1);
    }
})();
