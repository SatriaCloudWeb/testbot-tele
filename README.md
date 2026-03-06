# Telegram Multi-Platform Downloader Bot

Bot Telegram untuk download konten HD dari berbagai platform media sosial.

## Platform yang Didukung

✅ **Instagram** - Posts, Reels, IGTV (video & foto)  
✅ **TikTok** - Video & foto slideshow  
✅ **Twitter/X** - Video & foto dari tweet  
✅ **YouTube** - Video & audio  
✅ **Pinterest** - Gambar & video  

## Fitur

- Download konten dalam kualitas HD
- Support multi-bahasa (English & Indonesia)
- Broadcast message untuk admin
- Auto-detect platform dari URL
- User management system

## Instalasi

1. Clone repository ini

2. Install dependencies:

```shell
npm install
```

3. Setup bot di Telegram dengan mengikuti [dokumentasi resmi Telegram Bot](https://core.telegram.org/bots#botfather). Dapatkan bot token dari BotFather.

4. Ganti token bot di file `index.js`:

```javascript
let token = 'YOUR_TOKEN_HERE'
```

5. Ganti ADMIN_USER_ID dengan Telegram User ID Anda:

```javascript
const ADMIN_USER_ID = YOUR_USER_ID;
```

## Menjalankan Bot

```shell
node index.js
```

## Cara Menggunakan

1. Start chat dengan bot di Telegram
2. Kirim `/start` untuk memulai
3. Kirim link dari platform yang didukung
4. Bot akan mengirimkan konten dalam kualitas HD

## Commands

- `/start` - Mulai bot
- `/help` - Bantuan penggunaan
- `/lang` - Ganti bahasa
- `/runtime` - Cek waktu aktif bot
- `/broadcast` - (Admin only) Kirim pesan ke semua user

## API

Bot ini menggunakan [btch-downloader](https://btch.foo.ng/) untuk download konten dari berbagai platform.

## Catatan

- Pastikan Anda memiliki izin untuk mengunduh konten
- Download konten berhak cipta mungkin melanggar terms of service platform
- Bot ini hanya untuk tujuan edukasi

## License

MIT License
