# 🚀 Deploy Bot ke Render (Production)

## Kenapa Render?

✅ Gratis untuk bot kecil  
✅ Tidak sleep seperti Replit  
✅ Lebih stabil untuk production  
✅ Auto-deploy dari GitHub  
✅ SSL/HTTPS gratis  

## Langkah-langkah Deploy

### 1. Persiapan GitHub

#### A. Buat Repository Baru
1. Buka [GitHub.com](https://github.com)
2. Klik "New repository"
3. Nama: `telegram-downloader-bot`
4. Public atau Private (terserah)
5. Jangan centang "Initialize with README"
6. Create repository

#### B. Push Code ke GitHub

Di terminal/command prompt:

```bash
# Initialize git (jika belum)
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit - Telegram Downloader Bot"

# Add remote (ganti dengan URL repo Anda)
git remote add origin https://github.com/username/telegram-downloader-bot.git

# Push
git branch -M main
git push -u origin main
```

### 2. Setup Render

#### A. Buat Akun Render
1. Buka [Render.com](https://render.com)
2. Sign up dengan GitHub account
3. Authorize Render untuk akses GitHub

#### B. Create Web Service
1. Dashboard → "New +" → "Web Service"
2. Connect repository: `telegram-downloader-bot`
3. Konfigurasi:

```
Name: telegram-downloader-bot
Region: Singapore (atau terdekat)
Branch: main
Runtime: Node
Build Command: npm install
Start Command: node index.js
Instance Type: Free
```

#### C. Environment Variables

Klik "Advanced" → "Add Environment Variable":

```
BOT_TOKEN = 7919596620:AAGWhiUA1C3CHAFYWSHYnvoqxowgudR35B8
ADMIN_USER_ID = 7314801720
PORT = 8080
```

#### D. Deploy

1. Klik "Create Web Service"
2. Tunggu build selesai (3-5 menit)
3. Cek logs untuk memastikan bot running

### 3. Verifikasi Deployment

#### A. Cek Status
Buka URL Render Anda:
```
https://telegram-downloader-bot.onrender.com
```

Seharusnya muncul:
```json
{
  "response": {
    "status": "true",
    "message": "Bot Successfully Activated!",
    "author": "SATRIADEV"
  }
}
```

#### B. Test Bot
1. Buka Telegram
2. Kirim `/start` ke bot
3. Kirim link dari platform yang didukung
4. Verifikasi bot kirim file (bukan link)

### 4. Auto-Deploy dari GitHub

Setiap kali Anda push ke GitHub, Render akan otomatis deploy ulang:

```bash
# Edit code
git add .
git commit -m "Update feature"
git push

# Render akan auto-deploy
```

## 🔧 Troubleshooting

### Build Failed
Cek logs di Render dashboard:
- Pastikan `package.json` benar
- Pastikan semua dependencies terinstall

### Bot Tidak Merespon
- Cek environment variables sudah benar
- Cek BOT_TOKEN valid
- Cek logs untuk error

### "409 Conflict" Error
- Bot sudah running di tempat lain (Replit/local)
- Stop bot di tempat lain
- Restart service di Render

### Service Sleep (Free Tier)
Render free tier akan sleep setelah 15 menit tidak ada request.

**Solusi: Gunakan Cron Job**

Buat cron job di [cron-job.org](https://cron-job.org):
- URL: https://telegram-downloader-bot.onrender.com
- Interval: Every 10 minutes
- Method: GET

## 📊 Monitoring

### Render Dashboard
- Logs: Real-time logs
- Metrics: CPU, Memory usage
- Events: Deploy history

### Telegram
- Bot akan kirim notifikasi ke admin untuk setiap user interaction

## 🔒 Keamanan

### Environment Variables
✅ Gunakan Environment Variables di Render  
❌ Jangan hardcode token di code  
❌ Jangan commit `.env` ke GitHub  

### .gitignore
Pastikan file ini ada di `.gitignore`:
```
node_modules/
.env
data.json
*.log
test-*.js
```

## 💰 Pricing

### Free Tier
- ✅ 750 hours/month
- ✅ Cukup untuk 1 bot 24/7
- ⚠️ Sleep setelah 15 menit tidak ada request
- ⚠️ Cold start ~30 detik

### Paid Tier ($7/month)
- ✅ Tidak sleep
- ✅ Instant response
- ✅ Lebih banyak resources

## 🚀 Upgrade ke Paid (Optional)

Jika bot Anda ramai:
1. Dashboard → Service Settings
2. Instance Type → Starter ($7/month)
3. Save Changes

## 📝 Maintenance

### Update Bot
```bash
# Edit code
git add .
git commit -m "Update: description"
git push

# Render auto-deploy
```

### Rollback
Di Render Dashboard:
1. Events tab
2. Pilih deploy sebelumnya
3. Klik "Rollback to this version"

### View Logs
```bash
# Di Render Dashboard → Logs
# Atau gunakan Render CLI
```

## 🎯 Best Practices

1. **Gunakan Environment Variables** untuk semua config
2. **Monitor logs** secara berkala
3. **Setup cron job** untuk keep alive (free tier)
4. **Backup data.json** secara berkala
5. **Test di Replit** sebelum deploy ke Render

## 📋 Checklist Deploy

- [ ] Code sudah di GitHub
- [ ] Render service created
- [ ] Environment variables set
- [ ] Bot deployed successfully
- [ ] URL accessible
- [ ] Bot merespon di Telegram
- [ ] Bot kirim file (bukan link)
- [ ] Cron job setup (untuk keep alive)
- [ ] Monitoring setup

## 🎉 Selesai!

Bot Anda sekarang running di Render dengan:
- ✅ Auto-deploy dari GitHub
- ✅ Lebih stabil dari Replit
- ✅ Gratis (dengan limitasi)
- ✅ Production-ready

## 🔗 Links

- Render Dashboard: https://dashboard.render.com
- Render Docs: https://render.com/docs
- Cron Job: https://cron-job.org
- UptimeRobot: https://uptimerobot.com

## 💡 Tips

1. Gunakan Replit untuk development/testing
2. Gunakan Render untuk production
3. Setup monitoring dengan UptimeRobot
4. Backup data.json secara berkala
5. Monitor logs untuk error

Selamat! Bot Anda sudah production-ready! 🚀
