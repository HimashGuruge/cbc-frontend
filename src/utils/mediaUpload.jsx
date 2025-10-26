import { createClient } from "@supabase/supabase-js";

// Supabase project එකේ API key
const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBibmljbHFmc2l4b3BoeXJ0bnhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMjIwMjgsImV4cCI6MjA3NTc5ODAyOH0.AlcPKtcNcFZ97aFwvXHf1IQRRQopin3Y_MJCqyqWIWA`;

// Supabase project URL
const url = "https://pbniclqfsixophyrtnxh.supabase.co";

// Supabase storage එකට file එක upload කරන function එක
export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {

    // 1️⃣ පළමුව check කරනවා file එක තියෙනවාද කියලා
    if (file == null) {
      reject("File not added"); // file එකක් නැත්නම් promise එක reject කරනවා
    }

    // 2️⃣ Original file name එක ගන්නවා
    let fileName = file.name;

    // 3️⃣ File extension එක extract කරනවා
    const extension = fileName.split(".")[fileName.split(".").length - 1];

    // 4️⃣ Supabase client එක create කරනවා
    const supabase = createClient(url, key);

    // 5️⃣ Timestamp එක generate කරනවා unique file name එකක් කරන්න
    const timestamp = new Date().getTime();

    // 6️⃣ Timestamp එක, file name එක සහ extension එක combine කරනවා
    // ⚠️ දැන් double extension එක වෙන්න පුළුවන්
    fileName = timestamp + file.name + "." + extension;

    // 7️⃣ "images" bucket එකට file එක upload කරනවා
    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600", // cache එක 1 hour set කරනවා
        upsert: false,        // file එක already තියෙනවා නම් replace නොකරනවා
      })
      .then(() => {
        // 8️⃣ Upload වුන file එකට public URL generate කරනවා
        const publicUrl = supabase.storage
          .from("images")
          .getPublicUrl(fileName).data.publicUrl;

        // 9️⃣ Promise එක public URL එක return කරලා resolve කරනවා
        resolve(publicUrl);
      })
      .catch((err) => {
        // 🔟 Error handling කරන්න reject කරනවා
        reject(err);
      });
  });
}
