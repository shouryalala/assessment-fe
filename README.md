# Frontend Performance Assessment

Welcome to this frontend development assessment! You'll be working with a Next.js application that displays Spotify music data in a table format.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Initial Exploration

Take some time to explore the codebase and understand how the application works. The current sample data in `public/spotify-sample.json` contains a small dataset for initial testing.

## Task 1: Load Real Dataset

The current sample file is just for testing. Please follow these steps to work with a more realistic dataset:

1. **Download the full dataset:**
   - Download the file from this link: https://drive.google.com/file/d/1uZ4w2lcSLvEcmiX4oXat_L2cM56JQkj6/view?usp=sharing
   - Save it to the `public/` folder
   - Update the code to use `spotify-dataset.json` instead of `spotify-sample.json`

2. **Test with the larger dataset:**
   - Restart your development server
   - Navigate through the application and observe its behavior
   - Try expanding different rows to view detailed information

## Task 2: Export Functionality Analysis

The application includes a "Export to CSV" feature in the header. Your task is to:

1. **Test the export functionality:**
   - Click the "Export to CSV" button
   - Observe what happens during the export process
   - Note any issues with user experience

2. **Analyze and improve:**
   - Examine the export implementation in the code
   - Identify performance bottlenecks and inefficiencies
   - Implement optimizations to improve the export experience

## What We're Looking For

- **Code Analysis**: Ability to identify performance issues in existing code
- **Problem Solving**: Understanding of JavaScript performance optimization techniques
- **User Experience**: Consideration for how performance affects user interaction
- **Clean Code**: Implementation of efficient, maintainable solutions

## Questions to Consider

While working on this assessment, think about:
- What makes the export process slow or inefficient?
- How does the application behave with larger datasets?
- What optimization strategies could improve performance?
- How can you maintain functionality while improving efficiency?

## Submission

Please document your findings and the changes you made to optimize the application. Include:
- Description of issues identified
- Explanation of your optimization approach
- Any trade-offs or considerations made during implementation

Good luck!
