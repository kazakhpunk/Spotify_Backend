import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URL;
if (!uri) {
  throw new Error('MONGODB_URL is not defined in the environment variables');
}

const client = new MongoClient(uri);

const songs = [
  {
    title: "The Perfect Pair",
    artist: "Beabadoobee",
    album: "Beatopia",
    imageUrl: "https://spotify-clone-nfac.s3.amazonaws.com/images/ThePerfectPair.jpeg",
    url: "https://spotify-clone-nfac.s3.amazonaws.com/songs/Beabadoobee+-+The+Perfect+Pair.mp3"
  },
  {
    title: "Среди тысячи",
    artist: "SunThugga, Delle",
    imageUrl: "https://spotify-clone-nfac.s3.amazonaws.com/images/%D0%A1%D1%80%D0%B5%D0%B4%D0%B8%D0%A2%D1%8B%D1%81%D1%8F%D1%87%D0%B8.jpeg",
    url: "https://spotify-clone-nfac.s3.amazonaws.com/songs/Sunthugga+%D0%A1%D1%80%D0%B5%D0%B4%D0%B8+%D0%A2%D1%8B%D1%81%D1%8F%D1%87%D0%B8+Ft+Delle.mp3"
  },
  {
    title: "A Night To Remember",
    artist: "Beabadoobee, Laufey",
    imageUrl: "https://spotify-clone-nfac.s3.amazonaws.com/images/ANightToRemember.jpeg",
    url: "https://spotify-clone-nfac.s3.amazonaws.com/songs/Beabadoobee+A+Night+To+Remember+ft+Laufey.mp3"
  },
  {
    title: "106.2 Breeze Fm",
    artist: "Mac Demarco",
    album: "Rock and Roll Night Club",
    imageUrl: "https://spotify-clone-nfac.s3.amazonaws.com/images/106.2BreezeFm.jpeg",
    url: "https://spotify-clone-nfac.s3.amazonaws.com/songs/Mac+Demarco+106.2+Breeze+Fm.mp3"
  },
  {
    title: "In A Sentimental Mood",
    artist: "John Coltrane",
    imageUrl: "https://spotify-clone-nfac.s3.amazonaws.com/images/InASentimentalMood.jpeg",
    url: "https://spotify-clone-nfac.s3.amazonaws.com/songs/John+Coltrane+-+In+A+Sentimental+Mood.mp3"
  }
];

async function storeMetadata() {
  try {
    await client.connect();
    const database = client.db('spotify'); 
    const collection = database.collection('songs');

    const result = await collection.insertMany(songs);
    console.log(`${result.insertedCount} songs inserted`);
  } catch (error) {
    console.error('Error inserting songs:', error);
  } finally {
    await client.close();
  }
}

storeMetadata().catch(console.error);
