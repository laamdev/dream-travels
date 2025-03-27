import { db } from "./index";
import { trips, itineraries } from "./schema";
import { v4 as uuidv4 } from "uuid";

const tripsData = [
  {
    id: "1",
    title: "Portugal",
    description:
      "Embark on a journey through Portugal, where the charming streets of Lisbon captivate you, the golden beaches of the Algarve await, and Portuguese cuisine delights with authentic flavors. Explore castles in Sintra and create unforgettable memories in this destination full of history and beauty. Portugal invites you to experience something truly unique!",
    photo_url:
      "https://a.cdn-hotels.com/gdcs/production82/d1923/447a348f-f875-4885-b00a-e9a90603fef5.jpg",
    introduction:
      "Portugal is a country located in southwestern Europe on the Iberian Peninsula. It is the westernmost country of mainland Europe, and is bordered by the Atlantic Ocean to the west and south and by Spain to the north and east. The Atlantic archipelagos of the Azores and Madeira are also part of Portugal.",
    status: "todo",
    itinerary: [
      {
        day: 1,
        location: "Lisbon",
        description:
          "Explore the Alfama neighborhood and visit São Jorge Castle.",
      },
      {
        day: 2,
        location: "Lisbon",
        description:
          "Visit the Jerónimos Monastery and the Monument to the Discoveries.",
      },
    ],
  },
  {
    id: "2",
    title: "Hawaii",
    description:
      "Embark on a tropical escapade to Hawaii, where the lush landscapes of Oahu, the volcanic wonders of Maui, and the serene beaches of Kauai beckon. Immerse yourself in the Aloha spirit, savor the flavors of traditional Hawaiian cuisine, and witness the breathtaking beauty of the Pacific archipelago. Hawaii invites you to experience the perfect blend of paradise and adventure.",
    photo_url:
      "https://cdn.aarp.net/content/dam/aarp/travel/Domestic/2021/12/1140-oahu-hero.jpg",
    introduction:
      "Hawaii is a U.S. state located in the central Pacific Ocean. It is an archipelago of 137 islands, with the eight main islands being the most prominent. As the most remote state, Hawaii is surrounded by the Pacific Ocean in all directions.",
    status: "todo",
    itinerary: [
      {
        day: 1,
        location: "Honolulu, Oahu",
        description:
          "Explore the vibrant city of Honolulu, visit Waikiki Beach, and hike to the summit of Diamond Head for panoramic views.",
      },
      {
        day: 2,
        location: "North Shore, Oahu",
        description:
          "Discover the legendary North Shore, known for its big waves, explore Haleiwa town, and relax on the scenic beaches.",
      },
    ],
  },
  {
    id: "3",
    title: "China",
    description:
      "Explore China, from the bustling streets of Beijing to the ancient wonders of the Great Wall. Delight your senses with exquisite Chinese cuisine, explore temples in Xi'an, immerse yourself in the modernity of Shanghai, and create unforgettable memories in this destination full of history and beauty. China invites you to experience a unique journey, where rich tradition meets 21st-century innovation.",
    photo_url:
      "https://content.skyscnr.com/m/6a82667a63ac12a3/original/GettyImages-156384414.jpg",
    introduction:
      "China is a country in East Asia, the world's most populous and the fourth largest by land area. It borders 14 countries and has coastlines along the Pacific Ocean to the east.",
    status: "todo",
    itinerary: [],
  },
  {
    id: "4",
    title: "Japan",
    description:
      "Embark on a captivating journey to Japan, where the seamless blend of ancient traditions and modern innovation awaits. Immerse yourself in Tokyo's vibrant streets, explore historic temples in Kyoto, and savor the delicate flavors of authentic Japanese cuisine. From the iconic Mount Fuji to the serene gardens of Kanazawa, Japan invites you to discover a captivating blend of cultural richness and natural beauty.",
    photo_url:
      "https://humanidades.com/wp-content/uploads/2017/07/japon-7-e1571188423405-800x415.jpg",
    introduction:
      "Japan is an island nation in East Asia, located in the Pacific Ocean. It consists of four main islands—Honshu, Hokkaido, Kyushu, and Shikoku—and numerous smaller islands, stretching from north to south along the eastern coast of Asia.",
    status: "todo",
    itinerary: [
      {
        day: 1,
        location: "Tokyo",
        description:
          "Experience the vibrant energy of Shibuya Crossing and visit the historic Meiji Shrine.",
      },
      {
        day: 2,
        location: "Tokyo",
        description:
          "Explore the high-tech district of Akihabara and indulge in sushi at Tsukiji Fish Market.",
      },
    ],
  },
  {
    id: "5",
    title: "Mexico",
    description:
      "Embark on an immersive journey through Mexico, where the vibrant culture of Mexico City beckons, the ancient wonders of Chichen Itza await, and the spicy delights of Mexican cuisine tantalize your taste buds. From the historic charm of Oaxaca to the pristine beaches of Tulum, Mexico invites you to delve into a rich tapestry of experiences that showcase its diverse landscapes and cultural treasures.",
    photo_url:
      "https://cdn.britannica.com/60/92960-050-327CF926/pyramid-Mayan-Chichen-Itza-Mex.jpg",
    introduction:
      "Mexico is a country in North America, bordered by the United States to the north, the Pacific Ocean to the south and west, and the Gulf of Mexico and Caribbean Sea to the east. It is known for its rich cultural heritage and diverse landscapes.",
    status: "todo",
    itinerary: [],
  },
  {
    id: "6",
    title: "South Korea",
    description:
      "Explore the enchanting landscapes and rich cultural heritage of South Korea. From the bustling streets of Seoul to the historic sites of Gyeongju, and the serene beauty of Jeju Island, South Korea invites you on an immersive journey through its vibrant cities and picturesque landscapes.",
    photo_url:
      "https://lp-cms-production.imgix.net/2019-06/09a64fea2933f6da77ab07d671d1f678-south-korea.jpg",
    introduction:
      "South Korea is a country in East Asia, located on the southern half of the Korean Peninsula. It is bordered by North Korea to the north and surrounded by the Yellow Sea to the west and the Sea of Japan (East Sea) to the east",
    status: "done",
    itinerary: [
      {
        day: 1,
        location: "Seoul",
        description:
          "Discover the modern charm of Seoul with visits to Gyeongbokgung Palace and the bustling Dongdaemun Design Plaza.",
      },
      {
        day: 2,
        location: "Seoul",
        description:
          "Explore the vibrant neighborhoods of Insadong and Myeongdong, known for their traditional markets and trendy shops.",
      },
      {
        day: 3,
        location: "Gyeongju",
        description:
          "Immerse yourself in the ancient history of Gyeongju by visiting Bulguksa Temple and the historic Seokguram Grotto.",
      },
      {
        day: 4,
        location: "Gyeongju",
        description:
          "Stroll through the picturesque streets of the Yangdong Folk Village and visit the beautiful Anapji Pond.",
      },
    ],
  },
  {
    id: "7",
    title: "Slovenia",
    description:
      "Embark on a picturesque journey to Slovenia, where the charming streets of Ljubljana enchant, the emerald waters of Lake Bled captivate, and the flavors of Slovenian cuisine delight your taste buds. From the medieval charm of Škofja Loka to the majestic Triglav National Park, Slovenia invites you to explore its diverse landscapes and embrace the warmth of its rich cultural heritage.",
    photo_url:
      "https://miro.medium.com/v2/resize:fit:1400/1*h_nQx6iZZ3wUe-RTgzlMjw.jpeg",
    introduction:
      "Slovenia is a small country in Central Europe, bordered by Austria to the north, Italy to the west, Hungary to the northeast, and Croatia to the south and southeast. It has a small Adriatic coastline to the southwest.",
    status: "done",
    itinerary: [
      {
        day: 1,
        location: "Ljubljana",
        description:
          "Stroll through the historic streets of Ljubljana, visit Ljubljana Castle, and indulge in local delicacies at the Central Market.",
      },
      {
        day: 2,
        location: "Bled",
        description:
          "Experience the magic of Lake Bled, take a traditional pletna boat to Bled Island, and hike to Bled Castle for panoramic views.",
      },
      {
        day: 3,
        location: "Škofja Loka",
        description:
          "Explore the medieval town of Škofja Loka, wander through its charming old town, and visit the Škofja Loka Castle.",
      },
    ],
  },
];

export async function seed() {
  try {
    for (const trip of tripsData) {
      await db.insert(trips).values({
        id: trip.id,
        title: trip.title,
        introduction: trip.introduction,
        description: trip.description,
        photo_url: trip.photo_url,
        status: trip.status,
      });

      if (trip.itinerary && trip.itinerary.length > 0) {
        for (const item of trip.itinerary) {
          await db.insert(itineraries).values({
            id: uuidv4(),
            trip_id: trip.id,
            day: item.day,
            location: item.location,
            description: item.description,
          });
        }
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}
