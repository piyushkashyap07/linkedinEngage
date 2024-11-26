```markdown
# Project Setup Guide

This guide will walk you through the steps to set up and run the project locally. Follow each step carefully to ensure everything is properly configured.

## Steps to Get Started

### 1. Clone the Repository
Clone the repository to your local mac

### 2. Obtain Your Gemini API Key

To access the Gemini API, follow these steps:

1. Visit the [Gemini API Key page](https://aistudio.google.com/app/apikey).
2. Generate your API key.
3. Copy the generated API key.

### 3. Configure the Backend

Once you've obtained your Gemini API key, you'll need to insert it into the backend configuration:

1. Navigate to the `Backend` folder:
   ```bash
   cd Backend
   ```

2. Create a `.env` file (if it doesn't already exist) and add the following line:
   ```plaintext
   GOOGLE_API_KEY=<Your_Gemini_API_Key>
   ```

### 4. Set Up Python Environment

1. **Create a Python virtual environment** (if you haven't already):
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**:

   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```

3. **Install project dependencies**:

   Navigate to the `Backend` directory (if you're not already there), and run the following command to install all required packages:
   ```bash
   pip install -r requirements.txt
   ```

### 5. Run the Backend FastAPI Server

1. After installing the dependencies, run the FastAPI server using `uvicorn`:
   ```bash
   uvicorn app:app --reload
   ```

2. The FastAPI server should now be running locally. You can access it at:
   ```plaintext
   http://127.0.0.1:8000
   ```

### 6. Set Up the Chrome Extension

To load and test the Chrome extension locally:

1. Open Chrome and go to:
   ```plaintext
   chrome://extensions/
   ```

2. Enable **Developer Mode** (toggle on in the top right).

3. Click on **Load Unpacked** and select the extension folder from your project directory.

4. The extension will now be loaded and ready to use.

---

## Conclusion

You have now successfully set up and run the backend API with the Gemini API key integrated and the Chrome extension loaded. You're ready to test and develop further on the project!

If you encounter any issues, please refer to the [Troubleshooting Guide](./TROUBLESHOOTING.md) or raise an issue in the repository.
```

This `README.md` covers the entire process of setting up the project from cloning the repository to running the FastAPI backend and loading the Chrome extension. It provides a clean, structured walkthrough for both backend configuration and frontend extension deployment.
