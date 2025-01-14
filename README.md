# Table Component with Pagination and Infinite Scrolling

This project is a React component for displaying a table with data fetched from a Supabase database. It supports pagination, infinite scrolling, dynamic limit selection for the number of items displayed per page, and a **Product Page** where new products can be added with **real-time notifications** for all users except the notification sender.

<img src="https://github.com/user-attachments/assets/65a834f0-aada-46b2-b026-add76ff7de2e" width="48%" /> 
<img src="https://github.com/user-attachments/assets/6c3b3762-d50a-4be9-a503-acb7f118979a" width="48%" />


## Features
- **Pagination**: Navigate through pages of data with ease.
- **Infinite Scrolling**: Automatically load more data when scrolling to the bottom of the table.
- **Dynamic Limit Selection**: Change the number of items displayed per page.
- **Responsive Design**: Optimized for different screen sizes.
- **Skeleton Loader**: Displays a loading skeleton while fetching data.
- **Product Page**: Add new products to the database with a real-time notification system.
- **Real-Time Notifications**: Notifications are sent to all users except the one who added the product, using Socket.IO.

## Technologies Used
- NextJs
- TypeScript
- Supabase
- Socket.IO
- CSS (TailwindCSS for styling)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anasrashid-1/Supabase-NextJs-Paginator.git
   cd app
