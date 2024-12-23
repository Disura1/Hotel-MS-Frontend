import app from "../config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app, "gs://hotel-management-89.appspot.com");

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://acxxreftsamlgqcdomju.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjeHhyZWZ0c2FtbGdxY2RvbWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2OTk3ODUsImV4cCI6MjA0ODI3NTc4NX0.d_FttPNfKu-VJk4MGi7Kq-zspn-MeVsBLoUDZRcj5bA"

export const supabase = createClient(supabaseUrl, supabaseKey)

export default function uploadMedia(file){
    if(!file){
        console.log("No file selected");
        return;
    }

    const fileRef = ref(storage, file.name);

    return uploadBytes(fileRef, file)
        
}

/*.then((snapshot)=>{
    getDownloadURL(snapshot.ref).then((url)=>{
        console.log(url)
    })
})*/

export function uploadMediaToSupabase(file){
    if(!file){
        console.log("No file selected")
        return
    }
    return supabase.storage
    .from("images")
    .upload(file.name, file, {
        cacheControl: "3600",
        upsert: false
    })
}