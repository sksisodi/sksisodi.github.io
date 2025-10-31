import praw
from websocket import create_connection
import json
import time

# --- 1. Reddit and App Configuration ---
CLIENT_ID = "YOUR_CLIENT_ID" 
CLIENT_SECRET = "YOUR_CLIENT_SECRET"
USERNAME = "YOUR_REDDIT_USERNAME"
PASSWORD = "YOUR_REDDIT_PASSWORD"
SUBREDDIT_NAME = "python" # Change this to your desired subreddit

# --- 2. WebSocket Configuration ---
# This is the address where your Node/Python/Go backend server is listening
WEBSOCKET_URL = "ws://127.0.0.1:8000/ws" 

# --- 3. PRAW Setup ---
reddit = praw.Reddit(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    username=USERNAME,
    password=PASSWORD,
    user_agent="RealTimePipeline by /u/YOUR_REDDIT_USERNAME" 
)

def stream_reddit_data():
    """Connects to Reddit and streams new submissions to the WebSocket server."""
    print(f"Starting stream for r/{SUBREDDIT_NAME}...")
    
    try:
        # Connect to the WebSocket server
        ws = create_connection(WEBSOCKET_URL)
        print(f"Connected to WebSocket server at {WEBSOCKET_URL}")

        # Stream new submissions (posts) from the subreddit
        for submission in reddit.subreddit(SUBREDDIT_NAME).stream.submissions(skip_existing=True):
            data = {
                "id": submission.id,
                "title": submission.title,
                "author": str(submission.author),
                "url": submission.url,
                "time": int(time.time())
            }
            
            # Send the JSON data to the WebSocket server
            ws.send(json.dumps(data))
            print(f"Sent new post: {submission.title}")

    except Exception as e:
        print(f"Error in streaming or WebSocket connection: {e}")
        print("Attempting to reconnect in 10 seconds...")
        time.sleep(10)
        stream_reddit_data() # Recursive call to reconnect

if __name__ == "__main__":
    stream_reddit_data()