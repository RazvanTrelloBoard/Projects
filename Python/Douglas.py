import csv
import requests
import requests
from lxml import etree
import csv
from bs4 import BeautifulSoup
import csv
import requests
import gzip
import urllib.request
import json
import gspread
from oauth2client.service_account import ServiceAccountCredentials
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
gs = gc.open_by_key("14wuIbDbbEFkEsQdIcF3o3yfGngLgZRK3JGXMnOZ8roI")
# select a work sheet from its name
sheet = gs.worksheet('Douglas')

url = 'https://productdata.awin.com/datafeed/download/apikey/c4b78e7dede7e8e1de4c0c57e1e10d71/fid/41413/format/csv/language/en/delimiter/%2C/compression/gzip/columns/data_feed_id%2Cmerchant_id%2Cmerchant_name%2Caw_product_id%2Caw_deep_link%2Caw_image_url%2Caw_thumb_url%2Ccategory_id%2Ccategory_name%2Cbrand_id%2Cbrand_name%2Cmerchant_product_id%2Cmerchant_category%2Cean%2Cproduct_name%2Cdescription%2Cpromotional_text%2Clanguage%2Cmerchant_deep_link%2Cmerchant_image_url%2Ccurrency%2Csearch_price%2Cdelivery_cost%2Cweb_offer%2Cin_stock%2Cis_for_sale%2Ccondition%2Cproduct_type%2Cparent_product_id%2Ccommission_group%2Clast_updated%2Ccolour%2Cproduct_price_old/'

gz_file_path = "data.gz"
csv_file_path = "auto.csv"

urllib.request.urlretrieve(url, gz_file_path)

with gzip.open(gz_file_path, 'rb') as gz_file:
    # Read the contents of the decompressed file
    file_contents = gz_file.read()
    decoded_contents = file_contents.decode('utf-8')

    with open(csv_file_path, 'a', encoding='utf-8') as csv_file:
        csv_file.write(decoded_contents)

with open('auto.csv', 'r', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        data = list(reader)
        sheet.clear()
        sheet.update(data)
with open('auto.csv', 'w', newline='', encoding='utf-8') as file:
    pass