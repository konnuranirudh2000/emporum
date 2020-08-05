# -*- coding: utf-8 -*-
"""
Created on Sat Jan 25 13:48:43 2020

@author: ACAMPBELL
        austin-campbell1@hotmail.com
"""

import json
import pyrebase
import time

CAT_FILE = "prodCategories.txt"

ATTRIBUTES = []
with open(CAT_FILE) as cat_file:
    ATTRIBUTES = cat_file.readline().split(",")

config = {
  "apiKey": "AIzaSyAJ1S6MKvqtt6rJ_S3JQMswqYcuWrCJQJg",
  "authDomain": "emporum-f33c4.firebaseapp.com",
  "databaseURL": "https://emporum-f33c4.firebaseio.com/",
  "storageBucket": "emporum-f33c4.appspot.com"
}

firebase = pyrebase.initialize_app(config)

CENTROID_FILENAME = "centroid-{}.txt"
STATS_FILENAME = "statistics.txt"
CLUSTER_DATA = "clusters.csv"

def import_centroids(centroids):
    i = 0
    while(True):
        try:
            with open(CENTROID_FILENAME.format(i)) as infile:
                centroids.append((json.load(infile), i))
        except FileNotFoundError:
            return centroids
        i += 1


def import_stats():
    with open(STATS_FILENAME) as infile:
        stats = json.load(infile)
    return stats


def dist(centroid, user):
    sum_squares = 0
    for key, val in centroid.items():
        sum_squares += (val - user[key])**2
    return sum_squares


def closest_centroid(centroids, user_data, stats):
    if "items" not in user_data.keys():
        return None
    cat_count = {}
    for key in ATTRIBUTES:
        cat_count[key] = 0

    for key, val in user_data["items"].items():
        cat_count[val["Category"]] += 1

    print(cat_count)
    #standardize cat_count to compare with centroid coordinates
    #stats[key][0] -> mean
    #stats[key][1] -> SD
    for key in cat_count.keys():
        cat_count[key] = (cat_count[key] - stats[key][0]) / stats[key][1]
    return min(centroids, key=lambda x: dist(x[0], cat_count))


def loop(db, centroids, stats):
    membership = {}
    for i in range(len(centroids)):
        membership[i] = []

    while(True):
        all_users = db.child("Users").get()
        for user in all_users.each():
            print(user.key()) # Morty
            print(user.val()) # {name": "Mortimer 'Morty' Smith"}

            if ("updated" not in user.val().keys()) or (user.val()["updated"] == 0):
                print("updating user")

                best = closest_centroid(centroids, user.val(), stats)
                if best is not None:
                    membership[best[1]].append(user.key())
                    db.child("Users").child(user.key()).update({"centroid": best[1]})
                db.child("Users").child(user.key()).update({"updated": 1})

        for key in membership.keys():
            db.child("clusters").child(key).set(membership[key])
        time.sleep(10)



def main():
    centroids = []
    import_centroids(centroids)

    stats = import_stats()

    db = firebase.database()

    loop(db, centroids, stats)


if __name__ == "__main__":
    main()