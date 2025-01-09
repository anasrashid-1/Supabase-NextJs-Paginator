# Table Component with Pagination and Infinite Scrolling

This project is a React component for displaying a table with data fetched from a Supabase database. It supports pagination, infinite scrolling, and dynamic limit selection for the number of items displayed per page.


<img src="https://github.com/user-attachments/assets/65a834f0-aada-46b2-b026-add76ff7de2e" width="48%" /> 
<img src="https://github.com/user-attachments/assets/6c3b3762-d50a-4be9-a503-acb7f118979a" width="48%" />


## Features
- **Pagination**: Navigate through pages of data with ease.
- **Infinite Scrolling**: Automatically load more data when scrolling to the bottom of the table.
- **Dynamic Limit Selection**: Change the number of items displayed per page.
- **Responsive Design**: Optimized for different screen sizes.
- **Skeleton Loader**: Displays a loading skeleton while fetching data.

## Technologies Used
- React
- TypeScript
- Supabase
- CSS (TailwindCSS for styling)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anasrashid-1/Supabase-NextJs-Paginator.git
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Supabase project and update the connection details in the `supabase` instance (in `lib/supabase.ts`).

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Run the application in your browser at `http://localhost:3002`.
2. The table will display data fetched from the `newproducts` table in Supabase database.
3. Use the dropdown to select the number of items displayed per page or select "All" for infinite scrolling.
4. Navigate through pages using the "Previous" and "Next" buttons.
