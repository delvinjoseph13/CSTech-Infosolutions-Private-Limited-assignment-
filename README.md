# 📁 Agent List Distributor

This is a full-stack web application that allows uploading of `.csv` or `.xlsx` files containing contact lists. The uploaded data is automatically distributed to a set of agents and stored in a MongoDB database.

---

## 🔧 Technologies Used

- **Frontend:** ReactJS, Axios, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **File Parsing:** `csvtojson`, `xlsx`
- **File Upload Handling:** `multer`

---

## 🛠️ Setup Instructions

### 📁 Backend Setup

1. **Clone the Repository**

   git clone https://github.com/delvinjoseph13/CSTech-Infosolutions-Private-Limited-assignment-.git
   
   cd backend


2. **Install Dependencies**

npm install

3. **Environment Variables**

Create a .env file with the following contents:
PORT=8000
MONGO_URI=mongodb://localhost:27017/agent-distributor

or use MongoDb Atlas

4. **Run the Server**

npm start



Frontend Setup

1 . **Navigate to Frontend Folder**

cd machine-test-frontend

2. **Install Dependencies**

npm install

3. **Start the Frontend**

npm run dev
