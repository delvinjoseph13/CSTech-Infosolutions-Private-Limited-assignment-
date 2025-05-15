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

Upload CSV & Distribute Lists
Upload a .csv or .xlsx file with the following format:

| FirstName | Phone      | Notes                   |
| --------- | ---------- | ----------------------- |
| Alice     | 9876543210 | Interested in call back |
| Bob       | 8765432109 | Asked for pricing       |
| Charlie   | 7654321098 | Wants demo              |
| David     | 6543210987 | No response             |
| Eva       | 5432109876 | Schedule follow-up      |



Distribution Logic

The application fetches a maximum of 5 agents from the database.

Uploaded list items are evenly distributed using a round-robin method.

If the number of items is not divisible by 5, remaining items are assigned one-by-one from the start.