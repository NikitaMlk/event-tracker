# event-tracker
Розробка Фулстек-застосунку для перегляду та відслідковування івентів.

---

## 🚀 Функції
- **Організація заходів**: Переглядання та відстежування події.
- **Система голосування**: Голосування за події на які ви збираєтесь піти.
- **Сторінка зі статистикою**: Візуалізуйте дані про події за допомогою діаграм.
- **Інтеграція з календарем**: Візуалізуйте події за датою з кольоровим маркуванням.
- **Email cповіщення**: Можливість надсилання електронних листів.

---

## 🛠️ Tech Stack

### **Frontend**
- **React**
- **Vite**
- **Axios**
- **React Router**
- **Chart.js**

### **Backend**
- **Node.js**
- **Express.js**
- **Mongoose**
- **Nodemailer**

### **База даних**
- **MongoDB**

### **Інші інструменти**
- **dotenv**
- **Ethereal Email**

---

## 🗄️ Про базу даних

### Collections
1. **Events**
   - Поля: `title`, `description`, `date`, `location`, `category`.
2. **Votes**
   - Поля: `eventName`, `email`, `status` ("Going"/"Not Going").
3. **Users**
   - Поля: `email`, `name`.

---

## ⚙️ Налаштування середовища

Переконайтеся, що у вас є файл `.env` у корені вашого проекту з наступними змінними:

```plaintext
# Database
MONGO_URI=mongodb://localhost:27017/event-tracker

# Ethereal Email
ETHEREAL_EMAIL=<your_ethereal_email>
ETHEREAL_PASSWORD=<your_ethereal_password>

# Port
PORT=5000
```

---

## 🌟 Додаткові примітки
- **Тестування Email**: Використовуються облікові дані Ethereal Email для імітації надсилання електронної пошти.
- **ETHEREAL дані**: Генеруються за допомогою скрипту `testAccount.js`.

---

## 📧 Contributing
Внески у програму вітаються!😄
