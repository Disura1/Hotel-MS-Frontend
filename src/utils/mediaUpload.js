// import app from "../config/firebase";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage(app, "gs://hotel-management-89.appspot.com");

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ktuoawzzqcqvidxiqkzy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0dW9hd3p6cWNxdmlkeGlxa3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5Mzc2MTcsImV4cCI6MjA5MDUxMzYxN30.jvAbkT1pPwjsb05C3THNnpcMipfexMD7NBj3rXWS-mU"

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