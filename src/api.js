
import { initializeApp } from "firebase/app"
import { 
    getFirestore, 
    doc, 
    collection, 
    getDocs, 
    getDoc,
    query,
    where
}  from "firebase/firestore/lite" //Lite version doesn't incluide live features

const firebaseConfig = {
  apiKey: "AIzaSyAsQ-DiwB0orLuBpnXUELuHT2RILrPuf_k",
  authDomain: "scrimba-vanlife-6e976.firebaseapp.com",
  projectId: "scrimba-vanlife-6e976",
  storageBucket: "scrimba-vanlife-6e976.appspot.com",
  messagingSenderId: "21919428336",
  appId: "1:21919428336:web:c8280a1053575039401c35"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const filteredQuery = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(filteredQuery)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getHostVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getUserData(id) {
    const docRef = doc(db, "users", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }
    return data
}