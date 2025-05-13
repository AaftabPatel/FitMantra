import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the path based on your project structure

const trainers = [
  {
    name: "Anjali Sharma",
    location: "Mumbai",
    job: "Yoga Instructor",
    contact: "9876543210",
    socials: "https://instagram.com/anjaliyoga",
    image: "https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Rohit Verma",
    location: "Delhi",
    job: "Fitness Coach",
    contact: "9765432180",
    socials: "https://instagram.com/rohitfit",
    image: "https://images.pexels.com/photos/927437/pexels-photo-927437.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Neha Patel",
    location: "Bangalore",
    job: "Pilates Trainer",
    contact: "9654321870",
    socials: "https://instagram.com/nehapilates",
    image: "https://images.pexels.com/photos/868704/pexels-photo-868704.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Aman Gupta",
    location: "Pune",
    job: "Strength Trainer",
    contact: "9543218706",
    socials: "https://instagram.com/amangym",
    image: "https://images.pexels.com/photos/4057333/pexels-photo-4057333.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Meera Das",
    location: "Kolkata",
    job: "Meditation Coach",
    contact: "9432187056",
    socials: "https://instagram.com/meeramindful",
    image: "https://images.pexels.com/photos/2035066/pexels-photo-2035066.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];


// Optional: Prevent duplicates based on trainer name
const isTrainerExists = async (name) => {
  const q = query(collection(db, 'trainers'), where('name', '==', name));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

const TrainerUploader = async () => {
  for (const trainer of trainers) {
    try {
      const exists = await isTrainerExists(trainer.name);
      if (exists) {
        console.log('⚠️ Already exists:', trainer.name);
        continue;
      }

      await addDoc(collection(db, 'trainers'), trainer);
      console.log('✅ Added:', trainer.name);
    } catch (error) {
      console.error('❌ Error adding trainer:', trainer.name, error);
    }
  }
};

export default TrainerUploader;
