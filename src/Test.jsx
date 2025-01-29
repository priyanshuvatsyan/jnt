import { db, auth, storage } from '../firebase';

// Example: Adding data to Firestore
import { collection, addDoc } from "firebase/firestore";

async function Test() {
    try {
        const docRef = await addDoc(collection(db, "products"), {
            name: "Kurkure",
            category: "Snacks",
            price: 10
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

module.exports = Test;