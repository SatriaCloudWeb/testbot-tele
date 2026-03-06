# 🚀 Setup Bot di Replit

## Langkah-langkah Setup

### 1. Buat Replit Baru
1. Buka [Replit.com](https://replit.com)
2. Login atau buat akun
3. Klik "Create Repl"
4. Pilih "Import from GitHub" atau "Upload files"

### 2. Upload Files
Upload semua file project ini ke Replit:
- ✅ index.js
- ✅ package.json
- ✅ .replit
- ✅ replit.nix
- ✅ keep-alive.js
- ✅ README.md

### 3. Setup Environment Variables (PENTING!)

Di Replit, buka tab "Secrets" (ikon kunci di sidebar kiri), lalu tambahkan:

```
Key: BOT_TOKEN
Value: 7919596620:AAGWhiUA1C3CHAFYWSHYnvoqxowgudR35B8

Key: ADMIN_USER_ID
Value: 7314801720

Key: PORT
Value: 8080
```

**ATAU** edit file `.env` langsung (tapi kurang aman):
```env
BOT_TOKEN=7919596620:AAGWhiUA1C3CHAFYWSHYnvoqxowgudR35B8
ADMIN_USER_ID=7314801720
PORT=8080
```

### 4. Install Dependencies

Replit akan otomatis install dependencies saat pertama kali run. Atau manual:

```bash
npm install
```

### 5. Run Bot

Klik tombol "Run" di Replit atau jalankan:

```bash
node index.js
```

### 6. Verifikasi Bot Berjalan

Cek console output:
```
✅ Data loaded from file.
Server on 8080
```

Buka browser dan akses URL Replit Anda, seharusnya muncul:
```json
{
  "response": {
    "status": "true",
    "message": "Bot Successfully Activated!",
    "author": "SATRIADEV"
  }
}
```

### 7. Test Bot di Telegram

1. Buka Telegram
2. Cari bot Anda
3. Kirim `/start`
4. Kirim link dari platform yang didukung
5. Bot akan kirim file video/foto langsung

## 🔧 Troubleshooting

### Bot tidak merespon
- Cek BOT_TOKEN sudah benar
- Cek console untuk error
- Restart Repl

### "Error: ETELEGRAM: 409 Conflict"
- Bot sudah running di tempat lain
- Stop bot di tempat lain dulu
- Restart Repl

### Dependencies error
```bash
rm -rf node_modules
npm install
```

### Bot mati setelah beberapa waktu
- Replit free tier akan sleep setelah tidak ada aktivitas
- Gunakan UptimeRobot untuk ping bot setiap 5 menit
- Atau upgrade ke Replit Hacker plan

## 🌐 Keep Bot Always Online (Free)

### Gunakan UptimeRobot

1. Buka [UptimeRobot.com](https://uptimerobot.com)
2. Buat akun gratis
3. Add New Monitor:
   - Monitor Type: HTTP(s)
   - Friendly Name: Telegram Bot
   - URL: https://your-repl-name.your-username.repl.co
   - Monitoring Interval: 5 minutes
4. Save

UptimeRobot akan ping bot setiap 5 menit agar tidak sleep.

## 📊 Monitoring

### Cek Status Bot
Akses URL Replit Anda di browser:
```
https://your-repl-name.your-username.repl.co
```

### Cek Logs
Lihat console di Replit untuk logs real-time.

### Cek User Count
Bot menyimpan data user di `data.json`

## 🔒 Keamanan

### JANGAN SHARE:
- ❌ BOT_TOKEN
- ❌ ADMIN_USER_ID
- ❌ File .env

### Gunakan Secrets di Replit
Lebih aman daripada hardcode di file.

## 🚀 Deploy ke Render (Production)

Setelah test di Replit berhasil, deploy ke Render untuk production:

1. Push code ke GitHub
2. Connect Render ke GitHub repo
3. Set environment variables di Render
4. Deploy

Render lebih stabil untuk production dibanding Replit.

## 📝 Catatan

- Replit free tier: Bot akan sleep setelah tidak ada aktivitas
- Gunakan UptimeRobot untuk keep alive
- Untuk production, gunakan Render atau VPS
- Bot sudah include keep-alive.js untuk auto-ping

## ✅ Checklist

- [ ] Upload semua file ke Replit
- [ ] Set environment variables (BOT_TOKEN, ADMIN_USER_ID)
- [ ] Run bot
- [ ] Test dengan `/start` di Telegram
- [ ] Test download dari setiap platform
- [ ] Setup UptimeRobot untuk keep alive
- [ ] Verifikasi bot kirim file (bukan link)

## 🎉 Selesai!

Bot Anda sekarang running di Replit dan siap digunakan!

Untuk production yang lebih stabil, deploy ke Render menggunakan panduan di `RENDER-SETUP.md`.
