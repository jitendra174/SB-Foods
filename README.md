Here is a clean and professional `README.md` tailored for your **SB Foods – OrderOnTheGo** project:

---

```markdown
# 🍽️ SB Foods – OrderOnTheGo

SB Foods is a full-stack food ordering web application built using the **MERN stack (MongoDB, Express, React, Node.js)**. It offers a seamless experience for users to browse restaurants, explore menus, add to cart, and place orders — all with a stylish modern UI and lightning-fast performance.

---

## 🚀 Features

### 🧑‍🍳 User Features
- Browse 15+ real restaurants with images and categories
- Filter by food category, rating, and price
- Add food to cart and place orders
- Login/signup with session persistence
- View profile, order history, and settings

### 👨‍💼 Admin Features
- Admin login dashboard
- Add/edit/delete restaurants and menu items
- Secure routes and session-based access control

### 🌟 UI Highlights
- Built with Tailwind CSS + Framer Motion
- Responsive, modern, Swiggy-inspired layout
- Clean homepage with promotional sections
- Smooth animations and theme consistency

---

## 🧾 Tech Stack

| Layer        | Technology                             |
|--------------|-----------------------------------------|
| Frontend     | React + Vite + Tailwind CSS             |
| Animations   | Framer Motion                           |
| Backend      | Node.js + Express.js                    |
| Database     | MongoDB Atlas                           |
| Auth         | JWT-based (user + admin sessions)       |
| Deployment   | Render (separate services for client/server) |

---

## 🗂️ Folder Structure

```

sbfoods/
├── client/           # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx, main.jsx, etc.
│   └── vite.config.js
├── server/           # Express backend
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── index.js, .env
├── .gitignore
├── README.md

```

---

## 🌍 Deployment on Render

### 1️⃣ Backend (Express API)
- Root: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment:
```

PORT=5000
MONGO\_URI=your\_mongodb\_uri
JWT\_SECRET=your\_jwt\_secret

````

### 2️⃣ Frontend (React Vite)
- Root: `client`
- Build Command: `npm install && npm run build`
- Publish directory: `client/dist`

Make sure your API URL in frontend is set via:
```env
VITE_API_URL=https://your-backend.onrender.com/api
````

---

## 📦 Installation (Local)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/sbfoods.git
cd sbfoods
```

### 2. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 3. Run the project locally

```bash
# In one terminal
cd server
npm run dev

# In another terminal
cd client
npm run dev
```

---

## 📧 Contact

For suggestions or issues, please reach out at [support@sbfoods.com](mailto:support@sbfoods.com)

---

## 🏁 License

This project is for internship/demo use and not for commercial resale.

---

Made with ❤️ by Team SB Foods

```

---

Let me know if you want this `README.md` added to your project, or if you want badges, screenshots, or deployment links included too.
```
