# ⚡ Quick Start Guide

## 🎯 Pilih Platform

### Option 1: Replit (Untuk Testing)
✅ Mudah dan cepat  
✅ Tidak perlu install apapun  
✅ Gratis  
⚠️ Bot akan sleep jika tidak ada aktivitas  

👉 **Baca:** [REPLIT-SETUP.md](REPLIT-SETUP.md)

### Option 2: Render (Untuk Production)
✅ Lebih stabil  
✅ Auto-deploy dari GitHub  
✅ Gratis (dengan limitasi)  
✅ Production-ready  

👉 **Baca:** [RENDER-SETUP.md](RENDER-SETUP.md)

### Option 3: Local (Untuk Development)
✅ Full control  
✅ Instant testing  
⚠️ Harus running terus  

👉 **Lihat di bawah**

---

## 🚀 Quick Start - Replit

### 1. Upload ke Replit
- Buka [Replit.com](https://replit.com)
- Create Repl → Import from GitHub atau Upload files
- Upload semua file project

### 2. Set Secrets
Di tab "Secrets" (ikon kunci):
```
BOT_TOKEN = your_bot_token_here
ADMIN_USER_ID = your_telegram_user_id
PORT = 8080
```

### 3. Run
Klik tombol "Run" atau:
```bash
node index.js
```

### 4. Test
- Buka Telegram
- Kirim `/start` ke bot
- Kirim link Instagram/TikTok/Twitter/YouTube/Pinterest
- Bot akan kirim file video/foto langsung

### 5. Keep Alive (Optional)
Setup UptimeRobot untuk ping bot setiap 5 menit:
- URL: https://your-repl-name.your-username.repl.co
- Interval: 5 minutes

---

## 🚀 Quick Start - Render

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### 2. Deploy di Render
- Buka [Render.com](https://render.com)
- New → Web Service
- Connect GitHub repo
- Set environment variables:
  - BOT_TOKEN
  - ADMIN_USER_ID
  - PORT
- Deploy

### 3. Setup Cron Job
Di [cron-job.org](https://cron-job.org):
- URL: https://your-app.onrender.com
- Interval: Every 10 minutes

### 4. Test
- Buka Telegram
- Test bot dengan berbagai link

---

## 🚀 Quick Start - Local

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Edit file `.env`:
```env
BOT_TOKEN=your_bot_token_here
ADMIN_USER_ID=your_telegram_user_id
PORT=8080
```

### 3. Run Bot
```bash
node index.js
```

Atau di Windows:
```bash
npm start
```

### 4. Test
- Buka Telegram
- Kirim `/start` ke bot
- Test dengan link dari berbagai platform

---

## 📋 Checklist

### Sebelum Deploy
- [ ] Bot token sudah didapat dari @BotFather
- [ ] Admin User ID sudah didapat
- [ ] Semua file sudah siap
- [ ] Dependencies sudah terinstall

### Setelah Deploy
- [ ] Bot merespon `/start`
- [ ] Bot bisa download dari Instagram
- [ ] Bot bisa download dari TikTok
- [ ] Bot bisa download dari Twitter
- [ ] Bot bisa download dari YouTube
- [ ] Bot bisa download dari Pinterest
- [ ] Bot kirim FILE (bukan link)
- [ ] Admin menerima notifikasi

### Production
- [ ] Bot running di Render/VPS
- [ ] Cron job setup untuk keep alive
- [ ] Monitoring setup
- [ ] Backup data.json

---

## 🎯 Platform yang Didukung

| Platform | Video | Foto | Audio | Kualitas |
|----------|-------|------|-------|----------|
| Instagram | ✅ | ✅ | ❌ | HD |
| TikTok | ✅ | ✅ | ✅ | HD |
| Twitter | ✅ | ✅ | ❌ | HD |
| YouTube | ✅ | ❌ | ✅ | HD |
| Pinterest | ✅ | ✅ | ❌ | Original |

---

## 🔧 Troubleshooting

### Bot tidak merespon
1. Cek BOT_TOKEN benar
2. Cek bot tidak running di tempat lain
3. Cek logs untuk error
4. Restart bot

### Bot kirim link (bukan file)
- Seharusnya tidak terjadi
- Cek fungsi `downloadAsBuffer()` dipanggil
- Cek logs untuk error download

### Download gagal
- Cek koneksi internet
- Cek URL valid
- Cek API btch-downloader masih aktif
- Coba platform lain

### Bot sleep di Replit
- Setup UptimeRobot untuk ping setiap 5 menit
- Atau upgrade ke Replit Hacker plan
- Atau pindah ke Render

---

## 📚 Dokumentasi Lengkap

- [README.md](README.md) - Overview & Features
- [REPLIT-SETUP.md](REPLIT-SETUP.md) - Deploy ke Replit
- [RENDER-SETUP.md](RENDER-SETUP.md) - Deploy ke Render

---

## 💡 Tips

1. **Development**: Gunakan Replit atau local
2. **Production**: Gunakan Render atau VPS
3. **Testing**: Test semua platform sebelum production
4. **Monitoring**: Setup UptimeRobot atau Pingdom
5. **Backup**: Backup data.json secara berkala

---

## 🎉 Selesai!

Bot Anda siap digunakan! Pilih platform yang sesuai kebutuhan:

- **Replit**: Cepat, mudah, gratis (untuk testing)
- **Render**: Stabil, production-ready, gratis (dengan limitasi)
- **Local**: Full control (untuk development)

Selamat menggunakan! 🚀
