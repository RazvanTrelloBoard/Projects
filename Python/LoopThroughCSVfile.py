import csv

with open('feed.csv', newline='') as csvfile:
    data = csv.reader(csvfile, delimiter=',')
    # Create a list of dictionaries from the data
    rows = [dict(zip(['web-scraper-order','web-scraper-start-url','page','get text','get text-href'], row)) for row in data]

for row in rows:
    if row['get text'] == 'QuickMobile.ro':
        quickmobile_url = row['get text-href']
        break

print(quickmobile_url)