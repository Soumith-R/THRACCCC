# THRACCCC Website

**Telangana Human Rights Anti-Corruption and Crime Control Council**

A comprehensive website for the NGO with complaint management system, admin dashboard, and email notifications.

## Features

### Frontend Features
- **Responsive Design**: Mobile-first responsive design based on the hero page
- **Hero Section**: Exact implementation of the provided hero page design
- **Complaint Form**: User-friendly complaint submission form
- **Status Check**: Real-time complaint status tracking
- **Contact Information**: Complete contact details and office information

### Backend Features
- **Node.js Server**: Express.js based backend
- **Email Integration**: Nodemailer for automated email notifications
- **Complaint Management**: Full CRUD operations for complaints
- **Admin Authentication**: JWT-based admin authentication
- **Status Tracking**: Real-time complaint status updates

### Admin Features
- **Dashboard**: Comprehensive admin dashboard with statistics
- **Complaint Management**: View, update, and manage all complaints
- **Status Updates**: Change complaint status with admin notes
- **Email Notifications**: Automatic email notifications on status updates

## Installation

1. **Clone/Navigate to the project directory**
   ```bash
   cd "c:\Users\soumith\OneDrive\Desktop\THRACCC"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Update the `.env` file with your email credentials
   - For Gmail, use an App Password instead of your regular password
   - Update JWT secret for production

4. **Start the server**
   ```bash
   npm start
   ```
   
   For development (with auto-restart):
   ```bash
   npm run dev
   ```

5. **Access the website**
   - Website: http://localhost:3000
   - Admin Login: http://localhost:3000/admin
   - Status Check: http://localhost:3000/status

## Default Admin Credentials

- **Username**: admin
- **Password**: admin123

**⚠️ Important: Change these credentials in production!**

## Email Configuration

To enable email notifications:

1. **For Gmail:**
   - Enable 2-Factor Authentication
   - Generate an App Password
   - Use the App Password in EMAIL_PASS

2. **Update .env file:**
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

## Project Structure

```
THRACCCC/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment configuration
├── public/                # Frontend files
│   ├── index.html         # Main website (based on hero page)
│   ├── admin.html         # Admin login page
│   ├── dashboard.html     # Admin dashboard
│   ├── status.html        # Complaint status check
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   └── js/
│       └── script.js      # Frontend JavaScript
└── images/                # Website assets
    ├── Hero page.png      # Hero page reference
    ├── web logo.png       # Website logo
    └── ...               # Other images
```

## API Endpoints

### Public Endpoints
- `GET /` - Main website
- `GET /status` - Status check page
- `POST /api/complaint` - Submit complaint
- `GET /api/complaint/:id` - Get complaint status

### Admin Endpoints
- `GET /admin` - Admin login page
- `GET /dashboard` - Admin dashboard
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/complaints` - Get all complaints (requires auth)
- `PUT /api/admin/complaint/:id` - Update complaint (requires auth)

## Complaint Workflow

1. **User submits complaint** → Receives complaint ID via email
2. **Admin reviews** → Updates status to "Under Review"
3. **Investigation** → Status updated to "Investigating"
4. **Resolution** → Status updated to "Resolved" or "Closed"
5. **Email notifications** → Sent at each status change

## Future Enhancements

The current system is designed to be easily extendable:

- **Database Integration**: Replace in-memory storage with PostgreSQL/MySQL
- **File Uploads**: Add support for document/image uploads
- **Advanced Search**: Full-text search and filtering
- **Analytics**: Detailed reporting and analytics
- **Multi-language**: Telugu language support
- **Mobile App**: React Native mobile application

## Development Notes

- The main page design is based on the Hero page.png provided
- All content matches the approved design from the heads
- Email templates can be customized in server.js
- Responsive design works on all devices
- Admin dashboard provides real-time complaint management

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS enabled
- Environment variable protection

## Support

For technical support or questions:
- Email: info@thracccc.org
- Phone: +91 40 XXXX XXXX

---

**Built for THRACCCC - Fighting for Justice, Transparency, and Human Rights in Telangana**
