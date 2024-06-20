from PIL import Image
import io
import requests
import csv
import gspread
from google.oauth2.service_account import Credentials
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

source_csv_url = "https://docs.google.com/spreadsheets/d/1m5Uxcxaos0t5l7NWV5t7N50yoq5cupFiwPs3t4lE7Gw/export?format=csv"
target_folder = "https://drive.google.com/drive/folders/"  
minimum_size = 600

scopes = ['https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive']
credentials = Credentials.from_service_account_file('trusty-mantra-375121-43c336a3f4e8.json', scopes=scopes)
client = gspread.authorize(credentials)

# Open the Google Sheets file
sheet = client.open_by_url(
    "https://docs.google.com/spreadsheets/d/1m5Uxcxaos0t5l7NWV5t7N50yoq5cupFiwPs3t4lE7Gw/edit#gid=0")
worksheet = sheet.get_worksheet(0)  

def download_image(url):
    response = requests.get(url)
    image_data = response.content
    return image_data

def resize_image(image_data):
    img = Image.open(io.BytesIO(image_data))
    width, height = img.size
    if width < minimum_size or height < minimum_size:
        ratio = max(minimum_size / width, minimum_size / height)
        new_width = int(width * ratio)
        new_height = int(height * ratio)
        img = img.resize((new_width, new_height), Image.ANTIALIAS)
    return img

def process_images():

    response = requests.get(source_csv_url)
    response.raise_for_status()
    csv_data = response.content.decode('utf-8').splitlines()
    reader = csv.reader(csv_data)

    headers = next(reader)
    url_index = headers.index("Image URL") 

    gauth = GoogleAuth()

    drive = GoogleDrive(gauth)

    print("Processing images...")
    for row_index, row in enumerate(reader):
        url = row[url_index]
        filename = url.split("/")[-1]
        image_data = download_image(url)
        img = resize_image(image_data)

        image_buffer = io.BytesIO()
        img.save(image_buffer, format="JPEG")
        image_buffer.seek(0)

        # Upload the resized image to Google Drive
        file = drive.CreateFile(
            {
                "title": filename,
                "parents": [{"id": "1y6guNSoYtjZYUm9iFhvkvCkD"}]
            }
        )
        file.SetContentFile(image_buffer)
        file.Upload()

        print(f"Resized image saved in Google Drive: {file['alternateLink']}")


    print("Image processing completed.")


process_images()