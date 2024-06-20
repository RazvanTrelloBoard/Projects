from bs4 import BeautifulSoup
import requests
import csv
# from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd
import time
import json
import re
import gspread_dataframe as gd
import gspread
from gspread_dataframe import set_with_dataframe
from google.oauth2.service_account import Credentials
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

scopes = ['https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive']

credentials = Credentials.from_service_account_file('trusty-mantra-375121-43c336a3f4e8.json', scopes=scopes)

gc = gspread.authorize(credentials)

gauth = GoogleAuth()
drive = GoogleDrive(gauth)

# open a google sheet
gs = gc.open_by_key("189PDYXSLaMLyqmfg6lDAs-")
# select a work sheet from its name
sheet = gs.worksheet('Sheet10')

website ='https://www.lunzo.ro/accesorii-pentru-curatarea-dintilor'
root = 'https://www.lunzo.ro'
result = requests.get(website)
content = result.text
soup = BeautifulSoup(content, 'lxml')

pagination = soup.find('div',class_='in-paging')
pages = pagination.find_all('a',class_='in-paging__item')
last_page = pages[+1].text
print(last_page)

for page in range(1, 3):
    website = f'{root}/accesorii-pentru-curatarea-dintilor?page={page}'
    root = 'https://www.lunzo.ro/'
    result = requests.get(website)
    content = result.text
    soup = BeautifulSoup(content, 'lxml')

    box = soup.find('div', class_='js-product-list-ajax-filter-products-with-controls')
    links = set()  # use a set instead of a list to store unique links
    try:
        for link in box.find_all('a', href=True):
            if link['href']:
                links.add(link['href'])  # add link to set instead of list
    except:
        pass
    links = list(links)  # convert the set back to a list


    with open('Libris.csv', 'a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        for link in links:
            try:
                website = f'{link}'
                print(website)
                # website = "https://www.lunzo.ro/receptor-audio-bluetooth"
                result = requests.get(website)
                content = result.text
                soup = BeautifulSoup(content, 'lxml')
                box = soup.find('div', class_='box-detail')
                title = soup.find("h1", class_="box-detail__heading")
                titlu = title.text.strip()
                price_div = soup.find("div", class_="box-detail-add__price")
                price_text = price_div.find("div", attrs={"product-price-text": "priceText"}).text.strip()
                pret = price_text.replace("\xa0", "")
                img_tag = box.find('img')
                # for images in img_tag:
                image = img_tag.get('src')
                    # image_url = img_tag['src']
                    # print(image_url)
                # print(image)
                description_div = soup.find('div', {'id': 'description'})
                description = description_div.text.strip()

            except:
                pass

            writer.writerow([titlu, pret, image, description])
    with open('Libris.csv', 'r', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        data = list(reader)
        sheet.clear()
        sheet.update(data)
with open('Libris.csv', 'w', newline='', encoding='utf-8') as file:
        pass