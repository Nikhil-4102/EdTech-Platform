
<h1># StudyNotion - Ed-Tech Platform</h1>

StudyNotion is a fully functional ed-tech platform that enables users to create, consume, and rate educational content. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), StudyNotion aims to provide a seamless and interactive learning experience for students while offering instructors a platform to showcase their expertise.

## Features
- **Student Features**:
  - Browse courses, view course details, and add courses to the wishlist.
  - Rate courses after completing them.
  - Manage personal account and profile.
  - Checkout and purchase courses with payment integration.
  
- **Instructor Features**:
  - Create, edit, and delete courses.
  - Monitor course insights and ratings.
  - Manage course content and media.
  - View and edit instructor profile details.

- **Admin Features (Future Scope)**:
  - Manage users and instructors.
  - View platform insights and analytics.
  - Moderate courses and content.

## Tech Stack
- **Front-end**: React.js, Redux, TailwindCSS, Figma (UI/UX design)
- **Back-end**: Node.js, Express.js, MongoDB, JWT, Bcrypt, Mongoose
- **Database**: MongoDB (via MongoDB Atlas)
- **Media Management**: Cloudinary
- **Payment Integration**: Razorpay
- **Deployment**:
  - Front-end: Vercel
  - Back-end: Render or Railway
  - Database: MongoDB Atlas

## System Architecture
The platform follows a **client-server architecture**:
1. **Front-end**: Built using ReactJS to provide a dynamic and interactive UI.
2. **Back-end**: A monolithic architecture using Node.js and Express.js, serving RESTful APIs.
3. **Database**: MongoDB for flexible data storage of courses, users, and media.

## API Design
The platform uses RESTful API endpoints for various functionalities:
- **Authentication**: Sign up, login, OTP verification, password reset.
- **Courses**: Create, update, delete, and rate courses.
- **User**: View and manage user profile, wishlist, cart, and checkout.

Sample API endpoints:
- **POST** `/api/auth/signup` – Create a new user account.
- **POST** `/api/auth/login` – Log in and generate a JWT token.
- **GET** `/api/courses` – Get a list of all available courses.
- **POST** `/api/courses` – Create a new course.

## Deployment
- **Frontend**: Deployed on Vercel.
- **Backend**: Deployed on Render or Railway.
- **Database**: Managed through MongoDB Atlas.
- **Media**: Stored on Cloudinary.

## Future Enhancements
1. **Gamification**: Adding badges, points, and leaderboards for increased user engagement.
2. **Personalized Learning Paths**: Tailored learning experiences based on student preferences.
3. **Social Learning Features**: Group discussions, peer feedback, and collaborative projects.
4. **Mobile App**: A dedicated mobile application for easier access to courses.
5. **Machine Learning Recommendations**: Personalized course recommendations powered by machine learning.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (for database)
- Cloudinary account (for media storage)
- Razorpay account (for payment integration)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/studynotion.git
   cd studynotion
   ```

2. Install the dependencies:
   - **Frontend**:
     ```bash
     cd client
     npm install
     ```

   - **Backend**:
     ```bash
     cd server
     npm install
     ```

3. Set up environment variables in a `.env` file in the backend:
   ```
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_SECRET=your_razorpay_secret
   ```

4. Run the project locally:
   - **Frontend**:
     ```bash
     cd client
     npm start
     ```
   - **Backend**:
     ```bash
     cd server
     npm start
     ```

The application should now be running on `http://localhost:3000` (Frontend) and `http://localhost:5000` (Backend).

## Contributing
We welcome contributions to StudyNotion. Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new pull request.

## License
This project is licensed under the MIT License.

## Acknowledgments
- MERN stack for a robust and scalable tech stack.
- Cloudinary for efficient media management.
- Razorpay for seamless payment integration.

---

Let me know if you'd like to add or modify anything!
