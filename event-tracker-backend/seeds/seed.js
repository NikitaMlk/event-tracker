const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("../models/event");

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const events = [
      { "title": "Music Festival", "description": "A celebration of music from various genres.", "date": "2024-11-10", "location": "Los Angeles, CA", "category": "Music" },
      { "title": "Tech Conference", "description": "Annual technology conference with industry leaders.", "date": "2024-12-05", "location": "San Francisco, CA", "category": "Technology" },
      { "title": "Food Expo", "description": "A showcase of global cuisine and culinary innovations.", "date": "2024-09-15", "location": "Chicago, IL", "category": "Food" },
      { "title": "Art Gallery Opening", "description": "New art gallery exhibition featuring contemporary artists.", "date": "2024-08-21", "location": "New York, NY", "category": "Art" },
      { "title": "Health and Wellness Retreat", "description": "A weekend retreat focusing on mindfulness and physical health.", "date": "2024-10-03", "location": "Sedona, AZ", "category": "Health" },
      { "title": "Film Festival", "description": "An international film festival featuring independent films.", "date": "2024-11-15", "location": "Los Angeles, CA", "category": "Film" },
      { "title": "Coding Bootcamp", "description": "A 2-week intensive bootcamp for aspiring developers.", "date": "2024-10-25", "location": "Austin, TX", "category": "Education" },
      { "title": "Food Truck Rally", "description": "A gathering of food trucks offering a variety of street food.", "date": "2024-09-30", "location": "Portland, OR", "category": "Food" },
      { "title": "Startup Pitch Competition", "description": "A competition where startups pitch their ideas to investors.", "date": "2024-12-10", "location": "San Francisco, CA", "category": "Business" },
      { "title": "Jazz Night", "description": "Live jazz performances by local musicians.", "date": "2024-08-05", "location": "New Orleans, LA", "category": "Music" },
      { "title": "Fashion Show", "description": "A runway show featuring the latest fashion trends.", "date": "2024-10-17", "location": "Paris, France", "category": "Fashion" },
      { "title": "Comic-Con", "description": "A convention celebrating comic books, movies, and pop culture.", "date": "2024-07-25", "location": "San Diego, CA", "category": "Entertainment" },
      { "title": "Yoga in the Park", "description": "Outdoor yoga session with an instructor.", "date": "2024-08-15", "location": "Central Park, NY", "category": "Health" },
      { "title": "Pop-up Art Exhibit", "description": "An immersive art exhibit displayed for a limited time.", "date": "2024-09-03", "location": "Brooklyn, NY", "category": "Art" },
      { "title": "Science Expo", "description": "Exhibition showcasing the latest breakthroughs in science.", "date": "2024-11-12", "location": "Washington, D.C.", "category": "Science" },
      { "title": "Rock Concert", "description": "Live rock concert featuring popular bands.", "date": "2024-12-20", "location": "Denver, CO", "category": "Music" },
      { "title": "Sustainability Summit", "description": "A conference on sustainability practices and green technologies.", "date": "2024-09-12", "location": "Seattle, WA", "category": "Business" },
      { "title": "Winter Sports Championship", "description": "International competition in winter sports.", "date": "2024-12-18", "location": "Lake Tahoe, CA", "category": "Sports" },
      { "title": "Holiday Market", "description": "A market featuring handmade gifts and holiday decorations.", "date": "2024-11-28", "location": "Chicago, IL", "category": "Holiday" },
      { "title": "Photography Workshop", "description": "A hands-on workshop to learn photography techniques.", "date": "2024-10-10", "location": "Los Angeles, CA", "category": "Education" },
      { "title": "Theater Performance", "description": "A live theater performance of a classic play.", "date": "2024-08-22", "location": "London, UK", "category": "Theater" },
      { "title": "Farming Expo", "description": "A gathering to showcase agricultural technology and practices.", "date": "2024-09-25", "location": "Des Moines, IA", "category": "Agriculture" },
      { "title": "Tech Talk", "description": "A series of talks on emerging technology trends.", "date": "2024-10-29", "location": "Silicon Valley, CA", "category": "Technology" },
      { "title": "Wine Tasting", "description": "A wine tasting event featuring local wineries.", "date": "2024-11-22", "location": "Napa Valley, CA", "category": "Food" },
      { "title": "Business Expo", "description": "An exhibition for entrepreneurs and small business owners.", "date": "2024-12-07", "location": "Las Vegas, NV", "category": "Business" },
      { "title": "Cycling Race", "description": "A professional cycling race through scenic routes.", "date": "2024-09-17", "location": "Portland, OR", "category": "Sports" },
      { "title": "E-sports Tournament", "description": "An online and in-person e-sports tournament featuring popular games.", "date": "2024-12-12", "location": "Los Angeles, CA", "category": "Entertainment" },
      { "title": "Gaming Expo", "description": "A convention showcasing the latest in gaming technology.", "date": "2025-01-20", "location": "Austin, TX", "category": "Entertainment" },
      { "title": "Health & Fitness Conference", "description": "A conference focused on the latest health and fitness trends.", "date": "2025-03-02", "location": "Miami, FL", "category": "Health" },
      { "title": "Blockchain Summit", "description": "A summit focused on blockchain technology and its applications.", "date": "2025-04-10", "location": "New York, NY", "category": "Technology" },
      { "title": "AI and Robotics Expo", "description": "An expo dedicated to artificial intelligence and robotics.", "date": "2025-06-22", "location": "San Francisco, CA", "category": "Technology" } 
    ];

    await Event.insertMany(events);
    console.log("Database seeded!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
