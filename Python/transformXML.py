import requests
from lxml import etree
import csv
from bs4 import BeautifulSoup
import requests
import csv
# from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd
import time
import json
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
sheet = gs.worksheet('Feed')

# define URL
url = "http://212.146.97.236:444/FeedService.svc/getFeed/ListaPreturi"

# send GET request and get content
response = requests.get(url)
content = response.content

# parse XML content using lxml
root = etree.fromstring(content)

# create CSV file and write header row
with open("items.csv", "a", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["ItemCode", "CodUnic", "Grupa", "Subgrupa", "Categorie", "Producator", "Nume", "Garantie", "PN", "PretRRP", "MonedaRRP", "PretAchizitie", "MonedaAchizitie", "Stoc"])

    # iterate over <Produs> elements and extract data
    for produs in root.iter("Produs"):
        item_code = produs.find("ItemCode").text
        cod_unic = produs.find("CodUnic").text
        try:
            grupa = produs.find("Grupa").text
        except:
            if "Pantofi" in nume:
                grupa = "Fashion si sport"
            else:
                grupa = ""
        try:
            subgrupa = produs.find("Subgrupa").text
        except:
            if "Pantofi" in nume:
                subgrupa = "Incaltaminte"
            else:
                subgrupa = ""
        try:
            categorie = produs.find("Categorie").text
        except:
            if "Pantofi" in nume:
                categorie = "Pantofi sport"
            else:
                categorie = ""
        producator = produs.find("Producator").text
        nume = produs.find("Nume").text
        garantie = produs.find("Garantie").text
        pn = produs.find("PN").text
        try:
            pret_rrp = produs.find("PretRRP").text
        except AttributeError:
            pret_rrp = ""
        try:
            moneda_rrp = produs.find("MonedaRRP").text
        except AttributeError:
            moneda_rrp = ""
        pret_achizitie = produs.find("PretAchizitie").text
        moneda_achizitie = produs.find("MonedaAchizitie").text
        stoc = produs.find("Stoc").text

        # write data to CSV file
        writer.writerow([item_code, cod_unic, grupa, subgrupa, categorie, producator, nume, garantie, pn, pret_rrp, moneda_rrp, pret_achizitie, moneda_achizitie, stoc])

with open('items.csv', 'r', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        data = list(reader)
        sheet.clear()
        sheet.update(data)
with open('items.csv', 'w', newline='', encoding='utf-8') as file:
        pass