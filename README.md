# 🔗 URLShortner884

A full-stack URL Shortener web app built with **Next.js 14 App Router**, **MongoDB**, and **Tailwind CSS**. Users can enter long URLs and receive unique short links that redirect to the original URL.

> Demonstrates dynamic routing, API routes, server-side redirection, error handling, and MongoDB integration.

---

## 🚀 Features

- 🔗 Shortens any valid URL
- ⚡️ Server-side redirection using dynamic `[id]` route
- 💾 MongoDB + Mongoose for persistent storage
- 📤 API route for creating short links
- ❌ Custom 404 page
- 🚨 Scoped error handling per route
- 💅 Responsive UI with Tailwind CSS
- 📄 Google Fonts (`Montserrat`, `Quicksand`) for improved typography

---

## 🧠 Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel (Recommended for Deployment)](https://vercel.com/)
- Google Fonts via `next/font`

---

## 🗂️ Folder Structure

```
/app
├── api/
│   └── shortURL/route.js     → API POST to shorten URL
├── [id]/                     → Dynamic redirect route
│   ├── page.jsx              → Finds shortCode & redirects
│   └── error.js              → Scoped error UI for [id]
├── not-found.js              → Global 404 page
├── layout.js                 → Shared layout wrapper
└── page.jsx                  → Home page with form

/components
└── UrlForm.jsx               → Controlled form UI

/model
└── UrlSchema.js              → Mongoose schema for URLs

/utils
└── connectDB.js              → MongoDB connection helper
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vraj884/URL_Shortner.git
cd URL_Shortner
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root:

```env
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:3000
```

> If deployed on Vercel, set:  
> `BASE_URL=https://your-vercel-project.vercel.app`

### 4. Run the Dev Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 API Endpoint

### `POST /api/shortURL`

**Request:**

```json
{
  "url": "https://example.com"
}
```

**Response:**

```json
{
  "url": "http://localhost:3000/abc123"
}
```

---

## 🧪 URL Validation

- URL must begin with `http://` or `https://`
- Both client-side and server-side validation
- Unique short code is auto-generated and saved
- Graceful error messages on failure or duplicates

---

## 📸 Screenshots

### Input View  
![Sending URL](/public/LongURL.png)

### Output View  
![Shortened URL](/public/ShortURL.png)

> _Make sure these image paths are correct or adjust as needed for GitHub preview._

---

## 🌐 Deployment

This app is optimized for deployment on [Vercel](https://vercel.com/).  
To deploy:

1. Push the project to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables (`MONGO_URI`, `BASE_URL`)
4. Deploy!

---

## 🧩 Planned Features

- 🔐 User authentication for link history
- 📊 Click analytics and logs
- ⏳ Expiry and time-limited links
- 🎛️ Admin dashboard for managing URLs
- ⚔️ API rate limiting for abuse prevention

---

## 🙋‍♂️ Author

**Vraj Patel**  
Feel free to fork, contribute, or connect with me!

---

## 📝 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute it with attribution.
