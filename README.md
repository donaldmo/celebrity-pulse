

# Celebrity Pulse

Celebrity Pulse is a web application that allows users to stay updated with the latest news and trends about their favorite celebrities.

## Project Structure

```
client/
server/
  ├── API/
  ├── Controller/
  ├── Models/
  ├── Views/
  ├── app.py
  ├── requirements.txt
```

## Getting Started

### Cloning the Repository

First, clone the repository from GitHub:

```sh
git clone https://github.com/donaldmo/celebrity-pulse.git
```

### Setting Up the Server

Navigate into the `server` directory:

```sh
cd server
```

### Creating a Virtual Environment

Create a virtual environment to manage your dependencies:

```sh
python -m venv .venv
```

Activate the virtual environment:

- On Windows:
  ```sh
  .venv\Scripts\activate
  ```
- On macOS and Linux:
  ```sh
  source .venv/bin/activate
  ```

### Installing Requirements

Open the `requirements.txt` file and install each requirement one by one. Here is an example:

1. Open `requirements.txt` on vscode:
    ```sh
    code .
    ```
   
2. Install each requirement:
    ```sh
    pip install streamlit
    pip install firebase_admin
    pip install python_dotenv
    pip install streamlit-shadcn-ui
    pip install pyrebase4
    pip install google-auth
    pip install httpx-oauth
    ```

### Running the Application

Once all the dependencies are installed, you can run the application using Streamlit:

```sh
streamlit run app.py
```

## Acknowledgments

- Streamlit for providing an easy way to create data-driven web applications.
- Firebase for backend services.
- All other libraries and tools used in this project.
---
