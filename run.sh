python3 -m venv venv
source venv/bin/activate  # For Linux/macOS
# For Windows:
# venv\Scripts\activate

pip install -r requirements.txt
python -m uvicorn server:app --reload
