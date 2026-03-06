const fs = require("fs");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const chalk = require("chalk");
const express = require("express");
const { igdl, ttdl, twitter, youtube, pinterest } = require("btch-downloader");

// Load environment variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const ADMIN_USER_ID = parseInt(process.env.ADMIN_USER_ID) || 7314801720;

// Keep alive untuk Replit
const keepAlive = require('./keep-alive');
keepAlive();

// ===== LOAD & SAVE DATA =====
let users = [];
let userLang = {};
function loadData() {
  try {
    if (fs.existsSync("data.json")) {
      const raw = fs.readFileSync("data.json");
      const parsed = JSON.parse(raw);
      users = parsed.users || [];
      userLang = parsed.userLang || {};
      console.log("✅ Data loaded from file.");
    }
  } catch (err) {
    console.error("❌ Failed to load data:", err.message);
  }
}
function saveData() {
  try {
    const data = { users, userLang };
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    console.log("💾 Data saved.");
  } catch (err) {
    console.error("❌ Failed to save data:", err.message);
  }
}
loadData();

// ===== EXPRESS KEEPALIVE =====
app.get("/", (req, res) => {
  res.json({
    response: {
      status: "true",
      message: "Bot Successfully Activated!",
      author: "SATRIADEV",
    },
  });
});
app.listen(port, () => console.log(`Server on ${port}`));

// ===== BOT CONFIG =====
const token = process.env.BOT_TOKEN || "7919596620:AAGWhiUA1C3CHAFYWSHYnvoqxowgudR35B8";
const bot = new TelegramBot(token, { polling: true });
let Start = new Date();

// ===== HELPER =====
const logs = (msg, color = "green") =>
  console.log(chalk[color](`[${new Date().toLocaleTimeString()}] ${msg}`));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Download file as buffer untuk memastikan kirim file, bukan link
async function downloadAsBuffer(url) {
  try {
    const response = await axios.get(url, { 
      responseType: 'stream',
      timeout: 60000,
      maxRedirects: 5
    });
    return response.data;
  } catch (error) {
    logs(`Failed to download file: ${error.message}`, "yellow");
    // Fallback: return URL jika gagal download
    return url;
  }
}

function notifyAdmin(userId, name, username, link) {
  const userInfo = `📢 *User Active Interaction:*\n*User ID:* \`${userId}\`\n*Name:* ${name || "Unknown"}\n*Username:* ${username ? `@${username}` : "Unknown"}\n*Message:* ${link || "Unknown"}`;
  bot
    .sendMessage(ADMIN_USER_ID, userInfo, { parse_mode: "Markdown" })
    .catch((error) =>
      logs(`[ ERROR ] Gagal mengirim pesan ke admin: ${error.message}`, "red"),
    );
}

// ===== EXPAND SHORT URL =====
async function expandTikTokUrl(url) {
  if (/^https:\/\/(vm|vt)\.tiktok\.com\//.test(url)) {
    try {
      const res = await axios.get(url, {
        maxRedirects: 0,
        validateStatus: null,
      });
      if (res.headers.location) return res.headers.location;
    } catch (e) {
      logs("Gagal expand short url", "yellow");
    }
  }
  return url;
}

// ===== DETECT PLATFORM =====
function detectPlatform(url) {
  if (/instagram\.com\/(p|reel|tv)\//.test(url)) return "instagram";
  if (/tiktok\.com/.test(url)) return "tiktok";
  if (/(twitter|x)\.com/.test(url)) return "twitter";
  if (/(youtube\.com|youtu\.be)/.test(url)) return "youtube";
  if (/(pin\.it|pinterest\.com)/.test(url)) return "pinterest";
  return null;
}

// ===== DOWNLOAD HANDLER =====
async function downloadContent(url) {
  const platform = detectPlatform(url);
  if (!platform) throw new Error("Platform tidak didukung");

  let result;
  
  switch (platform) {
    case "instagram":
      result = await igdl(url);
      if (!result.status) throw new Error("Gagal mengunduh dari Instagram");
      return {
        platform: "Instagram",
        items: result.result || [],
        title: "Instagram Content"
      };
      
    case "tiktok":
      result = await ttdl(url);
      if (!result.status) throw new Error("Gagal mengunduh dari TikTok");
      return {
        platform: "TikTok",
        video: result.video && result.video.length > 0 ? result.video[0] : null,
        audio: result.audio && result.audio.length > 0 ? result.audio[0] : null,
        title: result.title || "TikTok Video",
        thumbnail: result.thumbnail
      };
      
    case "twitter":
      result = await twitter(url);
      if (!result.status) throw new Error("Gagal mengunduh dari Twitter");
      return {
        platform: "Twitter",
        videos: result.url || [],
        title: result.title || "Twitter Post"
      };
      
    case "youtube":
      result = await youtube(url);
      if (!result.status) throw new Error("Gagal mengunduh dari YouTube");
      return {
        platform: "YouTube",
        video: result.mp4,
        audio: result.mp3,
        title: result.title || "YouTube Video",
        thumbnail: result.thumbnail
      };
      
    case "pinterest":
      result = await pinterest(url);
      if (!result.status) throw new Error("Gagal mengunduh dari Pinterest");
      const pinResult = result.result?.result || result.result;
      return {
        platform: "Pinterest",
        image: pinResult?.image || pinResult?.images?.orig?.url,
        video: pinResult?.video_url,
        title: pinResult?.title || pinResult?.description || "Pinterest Content"
      };
      
    default:
      throw new Error("Platform tidak dikenali");
  }
}

// ===== COMMANDS =====
bot.setMyCommands([
  { command: "/start", description: "Start bot" },
  { command: "/lang", description: "Change language / Ganti bahasa" },
  { command: "/runtime", description: "Check bot runtime" },
  { command: "/help", description: "Help / Bantuan" },
]);

// ===== RUNTIME =====
bot.onText(/^\/runtime$/, (msg) => {
  const From = msg.chat.id;
  const lang = userLang[From] || "EN";
  const now = new Date();
  const uptimeMs = now - Start;
  const uptimeSec = Math.floor(uptimeMs / 1000);
  const uptimeMin = Math.floor(uptimeSec / 60);
  const uptimeH = Math.floor(uptimeMin / 60);

  const uptimeMessage =
    lang === "EN"
      ? `Active: ${uptimeH} hour ${uptimeMin % 60} minute ${uptimeSec % 60} second.`
      : `Aktif: ${uptimeH} jam ${uptimeMin % 60} menit ${uptimeSec % 60} detik.`;

  bot.sendMessage(From, uptimeMessage);
});

// ===== START =====
bot.onText(/^\/start$/, (msg) => {
  const fromId = msg.chat.id;
  if (!users.includes(fromId)) {
    users.push(fromId);
    saveData();
  }

  const lang = userLang[fromId] || "EN";
  const startMsg =
    lang === "EN"
      ? "ℹ With this bot you can easily and quickly download HD content from:\n\n✅ Instagram\n✅ TikTok\n✅ Twitter/X\n✅ YouTube\n✅ Pinterest\n\nJust send a link!"
      : "ℹ Dengan bot ini, Anda dapat mengunduh konten HD dengan mudah dan cepat dari:\n\n✅ Instagram\n✅ TikTok\n✅ Twitter/X\n✅ YouTube\n✅ Pinterest\n\nCukup kirimkan tautan!";

  bot.sendMessage(fromId, startMsg);
  notifyAdmin(msg.from.id, msg.from.first_name, msg.from.username, "/start");
});

// ===== HELP =====
bot.onText(/^\/help$/, (msg) => {
  const fromId = msg.chat.id;
  const lang = userLang[fromId] || "EN";

  const helpMsg =
    lang === "EN"
      ? `📖 Download Instructions:

1. Open Instagram, TikTok, Twitter, YouTube, or Pinterest app.
2. Select the content you want to download.
3. Click the share button (↪️) or copy link option.
4. Send the link to this bot.
5. Get HD videos and photos in seconds!

Supported platforms:
✅ Instagram (posts, reels, IGTV)
✅ TikTok (videos, photos)
✅ Twitter/X (videos, photos)
✅ YouTube (videos)
✅ Pinterest (images, videos)`
      : `📖 Petunjuk Unduh:

1. Buka aplikasi Instagram, TikTok, Twitter, YouTube, atau Pinterest.
2. Pilih konten yang ingin kamu unduh.
3. Klik tombol bagikan (↪️) atau opsi salin tautan.
4. Kirim tautan ke bot ini.
5. Dapatkan video dan foto HD dalam hitungan detik!

Platform yang didukung:
✅ Instagram (postingan, reels, IGTV)
✅ TikTok (video, foto)
✅ Twitter/X (video, foto)
✅ YouTube (video)
✅ Pinterest (gambar, video)`;

  bot.sendMessage(fromId, helpMsg);
});

// ===== CHANGE LANGUAGE BUTTON =====
bot.onText(/^\/lang$/, (msg) => {
  const fromId = msg.chat.id;

  const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🇬🇧 English", callback_data: "LANG_EN" }],
        [{ text: "🇮🇩 Indonesia", callback_data: "LANG_ID" }],
      ],
    },
  };

  bot.sendMessage(
    fromId,
    "🌐 Choose your language / Pilih bahasa:",
    inlineKeyboard,
  );
});

// ===== CALLBACK QUERY FOR LANGUAGE =====
bot.on("callback_query", async (query) => {
  const fromId = query.from.id;
  let selectedLang = "";

  if (query.data === "LANG_EN") selectedLang = "EN";
  if (query.data === "LANG_ID") selectedLang = "ID";
  if (!selectedLang) return;

  userLang[fromId] = selectedLang;

  // Hapus tombol
  await bot.editMessageReplyMarkup(
    { inline_keyboard: [] },
    { chat_id: query.message.chat.id, message_id: query.message.message_id },
  );

  // Kirim pesan sukses sesuai bahasa
  const langText =
    selectedLang === "EN"
      ? "🌐 Language successfully updated. You can always change the language with the /lang command."
      : "🌐 Bahasa berhasil diperbarui. Kamu selalu bisa mengubah bahasa dengan perintah /lang.";

  await bot.answerCallbackQuery(query.id);
  await bot.sendMessage(fromId, langText);
});

// ===== HANDLE ALL MESSAGES =====
bot.on("message", async (msg) => {
  const From = msg.chat.id;
  const text = msg.text;

  // Jangan notif admin kalau pesan adalah /start
  if (text && text.startsWith("/start")) return;

  notifyAdmin(msg.from.id, msg.from.first_name, msg.from.username, text);

  if (!users.includes(From)) {
    users.push(From);
    saveData();
  }

  if (text && /^\/(start|help|lang|runtime|broadcast)$/.test(text)) return;

  // Cek apakah text adalah URL yang didukung
  if (!text || !/^https?:\/\//.test(text)) return;

  const platform = detectPlatform(text);
  if (!platform) return;

  const lang = userLang[From] || "EN";

  try {
    // Expand short URL untuk TikTok
    let url = text;
    if (platform === "tiktok") {
      url = await expandTikTokUrl(text);
    }

    await bot.sendMessage(
      From,
      lang === "ID" ? "⏳ Mengunduh konten HD..." : "⏳ Downloading HD content...",
    );

    const data = await downloadContent(url);
    logs(`✅ Download dari ${data.platform}`, "green");

    // Handle Instagram
    if (data.platform === "Instagram") {
      if (data.items && data.items.length > 0) {
        for (const item of data.items) {
          await bot.sendChatAction(From, "upload_video");
          const fileStream = await downloadAsBuffer(item.url);
          await bot.sendVideo(From, fileStream, { 
            caption: data.title,
            supports_streaming: true 
          });
          await sleep(800);
        }
      }
    }

    // Handle TikTok
    else if (data.platform === "TikTok") {
      if (data.video) {
        await bot.sendChatAction(From, "upload_video");
        const videoStream = await downloadAsBuffer(data.video);
        await bot.sendVideo(From, videoStream, { 
          caption: data.title,
          supports_streaming: true 
        });
        if (data.audio) {
          await sleep(1200);
          const audioStream = await downloadAsBuffer(data.audio);
          await bot.sendAudio(From, audioStream, { caption: "TikTok Audio" });
        }
      }
    }

    // Handle Twitter
    else if (data.platform === "Twitter") {
      if (data.videos && data.videos.length > 0) {
        // Ambil video HD (index 0 biasanya HD)
        const videoUrl = data.videos[0].hd || data.videos[0].sd;
        if (videoUrl) {
          await bot.sendChatAction(From, "upload_video");
          const videoStream = await downloadAsBuffer(videoUrl);
          await bot.sendVideo(From, videoStream, { 
            caption: data.title,
            supports_streaming: true 
          });
        }
      }
    }

    // Handle YouTube
    else if (data.platform === "YouTube") {
      if (data.video) {
        await bot.sendChatAction(From, "upload_video");
        const videoStream = await downloadAsBuffer(data.video);
        await bot.sendVideo(From, videoStream, { 
          caption: data.title,
          supports_streaming: true 
        });
      }
      if (data.audio) {
        await sleep(1200);
        const audioStream = await downloadAsBuffer(data.audio);
        await bot.sendAudio(From, audioStream, { caption: `${data.title} - Audio` });
      }
    }

    // Handle Pinterest
    else if (data.platform === "Pinterest") {
      if (data.video) {
        await bot.sendChatAction(From, "upload_video");
        const videoStream = await downloadAsBuffer(data.video);
        await bot.sendVideo(From, videoStream, { 
          caption: data.title,
          supports_streaming: true 
        });
      } else if (data.image) {
        await bot.sendChatAction(From, "upload_photo");
        const imageStream = await downloadAsBuffer(data.image);
        await bot.sendPhoto(From, imageStream, { caption: data.title });
      }
    }

    bot.sendMessage(
      From,
      lang === "EN" ? "✅ Download complete!" : "✅ Unduhan selesai!",
    );
  } catch (e) {
    logs(`ERROR: ${e.message}`, "red");
    bot.sendMessage(
      From,
      lang === "EN"
        ? `❌ Failed to download content. Error: ${e.message}`
        : `❌ Gagal mengunduh konten. Error: ${e.message}`,
    );
  }
});

// ===== BROADCAST (ADMIN ONLY) =====
bot.onText(/^\/broadcast(?:\s+([\s\S]+))?$/i, async (msg, match) => {
  const fromId = msg.chat.id;
  if (fromId !== ADMIN_USER_ID)
    return bot.sendMessage(fromId, "❌ You don't have access to this command.");

  let content = match[1];
  let reply = msg.reply_to_message;

  if (!content && !reply)
    return bot.sendMessage(
      fromId,
      "ℹ Usage:\n- `/broadcast text`\n- Reply to media then type `/broadcast`",
    );

  if (users.length === 0)
    return bot.sendMessage(
      fromId,
      "⚠ No users to broadcast. Ask users to send /start first.",
    );

  bot.sendMessage(fromId, `🚀 Broadcast starting to ${users.length} users...`);
  let success = 0;

  for (let uid of users) {
    try {
      if (content) {
        await bot.sendMessage(uid, `📢 Broadcast:\n\n${content}`);
      } else if (reply) {
        if (reply.photo) {
          const fileId = reply.photo[reply.photo.length - 1].file_id;
          await bot.sendPhoto(uid, fileId, {
            caption: reply.caption || "📢 Broadcast",
          });
        } else if (reply.video) {
          await bot.sendVideo(uid, reply.video.file_id, {
            caption: reply.caption || "📢 Broadcast",
          });
        } else if (reply.document) {
          await bot.sendDocument(uid, reply.document.file_id, {
            caption: reply.caption || "📢 Broadcast",
          });
        } else if (reply.audio) {
          await bot.sendAudio(uid, reply.audio.file_id, {
            caption: reply.caption || "📢 Broadcast",
          });
        } else if (reply.voice) {
          await bot.sendVoice(uid, reply.voice.file_id, {
            caption: "📢 Broadcast",
          });
        } else if (reply.text) {
          await bot.sendMessage(uid, `📢 Broadcast:\n\n${reply.text}`);
        }
      }
      success++;
      await sleep(300);
    } catch (e) {
      logs(`Failed to send to ${uid}: ${e.message}`, "red");
    }
  }

  bot.sendMessage(
    fromId,
    `✅ Broadcast complete. Sent to ${success}/${users.length} users.`,
  );
});
