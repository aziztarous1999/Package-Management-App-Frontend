# 📦 Package Management App (Frontend)

A **React Native (Expo)** mobile application for creating and tracking packages.
This app connects to the Flask + MongoDB backend API.

---

## ✨ Features

- 🔑 User Authentication (Register & Login with JWT)
- 📦 Create new packages with recipient info
- 🔍 Track a package by its tracking ID
- 📋 View all created packages in a styled card list
- 🖼 Background images for Auth screens
- 🎨 Custom theming and modals for success/error states
- 📲 Clipboard support (copy tracking ID)
- ⚡ Smooth navigation & animations with React Native Reanimated
- 🔔 Haptic feedback on success/error

---

## 🛠️ Tech Stack

- **React Native (Expo)**
- **Expo Router** (navigation)
- **Axios** (API requests)
- **Expo SecureStore** (JWT storage)
- **React Native Reanimated** (animations)
- **Expo Clipboard & Haptics**
- **Backend:** Flask + MongoDB (see [Backend Repo](../colis-backend))

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/package-management-app.git
cd package-management-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API URL

This project uses the backend Flask API running locally.
The Expo config (app.json) already includes the API URL:

```bash
"extra": {
  "EXPO_PUBLIC_API_URL": "http://192.168.1.7:5000"
}
```

Replace **192.168.1.7** with your machine’s LAN IP if different.
Run ipconfig (Windows) or ifconfig (Mac/Linux) to find it.
Make sure your phone and PC are on the same Wi-Fi network.

### 4. Run the backend

Go to your backend project (colis-backend) and start Flask:

```bash
cd ../colis-backend
venv\Scripts\activate   # on Windows
# or source venv/bin/activate (Linux/Mac)

python app.py
```

You should see something like this on the backend console:

```bash
 * Running on http://127.0.0.1:5000
 * Running on http://192.168.1.7:5000
```

Use the **LAN URL** (e.g. http://192.168.1.7:5000) in app.json.

### 5. Run the react native app using expo

Back in the frontend folder:

```bash
cd ../package-management-app
npx expo start
```

* On physical device: open Expo Go app, scan the QR code (LAN mode).
* On emulator: press a for Android or i for iOS.

### 🎥 Demo Video :
  [Watch on Google Drive](https://drive.google.com/file/d/1wR7BkxInR3urzqG3MBhulWv0r8p15IMa/view?usp=sharing)

### 📸 Demo Screenshots

Register Screen
  ![Register](https://github.com/aziztarous1999/Package-Management-App-Frontend/blob/main/demo/1.jpg)

Login Screen
  ![Login](https://github.com/aziztarous1999/Package-Management-App-Frontend/blob/main/demo/2.jpg)

Create Package
  ![CreatePackage](https://github.com/aziztarous1999/Package-Management-App-Frontend/blob/main/demo/4.jpg)

My Packages
  ![Packages](https://github.com/aziztarous1999/Package-Management-App-Frontend/blob/main/demo/3.jpg)

Track Package
  ![TrackPackage1](https://github.com/aziztarous1999/Package-Management-App-Frontend/blob/main/demo/5.jpg)
  ![TrackPackage2](https://github.com/aziztarous1999/Package-Management-App-Frontend/blob/main/demo/6.jpg)