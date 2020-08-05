import requests
import json
from PIL import Image
from io import BytesIO


headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
resp = requests.get('https://api.upcitemdb.com/prod/trial/lookup?upc=818094003001', headers=headers)
data = json.loads(resp.text)
for item in data['items']:
  print("{}\t{}\t{}\t{}-{}\n".format(item['ean'], item['title'], item['brand'], item['lowest_recorded_price'], item['highest_recorded_price']))
  if len(item['images']) != 0:
      print(item['images'][0] + "\n")
  else:
      print("No Image Available\n")
  for offer in item['offers']:
    print("{}\t{}\t{}".format(offer['domain'], offer['title'], offer['price']))
