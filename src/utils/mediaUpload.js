// import app from "../config/firebase";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage(app, "gs://hotel-management-89.appspot.com");

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

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
    .from("Images")
    .upload(file.name, file, {
        cacheControl: "3600",
        upsert: false
    })
}