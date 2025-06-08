# Project Setup Guide  

This guide provides step-by-step instructions to set up and run the backend and frontend of the project.

---

## Prerequisites  
Ensure you have the following installed on your system:  
- Node.js (v16 or higher)
- vs code

---

## Backend Setup  

The backend should be run inside the **`intern`** folder. Follow these steps:  

### 1. Set Up WSL  
Follow the steps in this article: [How to Install WSL 2 Ubuntu 20.04 LTS on Windows](https://medium.com/@sjmwatsefu/how-to-install-wsl-2-ubuntu-20-04-lts-on-windows-and-open-visual-studio-code-from-the-terminal-e580761e84f8)  

**Important:**  
- Skip the "Update the Windows Subsystem for Linux (WSL) to WSL 2" section.  
- Continue directly to "Installing Node.js on WSL2".
- ignore everything from "Configuring Git and GitHub on WSL2"

### 2. Install Dependencies  
1. Open the Linux terminal.  
2. Navigate to the `intern` folder:  
   ```bash
   cd path/to/intern
### 3. After that run the following commands:
## Backend ##
 npm install <br/>
 npm install nodemon <br/>
 sudo apt update && sudo apt install octave<br/>
 if using python3 use python3 otherwise replace python3 with python and pip3 with pip<br/>
 sudo apt update<br/>
sudo apt install python3-venv<br/>
python3 -m venv env<br/>
source env/bin/activate<br/>
pip install numpy pandas ipython librosa matplotlib<br/>
 npm run dev <br/>
on linux terminal you should see "backend is running on host"<br/>

## frontend ##
Frontend can be run on powershell/cmd prompt<br/>
 npm install<br/>
 npm start <br/>
it directly opens the website<br/>
