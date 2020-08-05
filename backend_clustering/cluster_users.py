# -*- coding: utf-8 -*-
"""
Created on Sat Jan 25 10:21:00 2020

@author: ACAMPBELL
        austin-campbell1@hotmail.com
"""

import math
import numpy as np
import pandas as pd
import json

CAT_FILE = "prodCategories.txt"
DATA = "mockData.csv"

ATTRIBUTES = []
with open(CAT_FILE) as cat_file:
    ATTRIBUTES = cat_file.readline().split(",")


def euclid_dist(row, centroid):
    sum_squares = 0
    for key, val in centroid.coords.items():
        sum_squares += (val - row[key])**2
    return math.sqrt(sum_squares)


class Centroid():
    def __init__(self, row, id):
        self.coords = {}
        self.id = id
        for attr in ATTRIBUTES:
            self.coords[attr] = row[attr]

    def __repr__(self):
        return str(self.coords.items())


def cent_euclid_dist(centroid1, centroid2):
    sum_squares = 0
    for key, val in centroid1.coords.items():
        sum_squares += (val - centroid2.coords[key])**2
    return math.sqrt(sum_squares)


def closest_centroid(row, centroids, dist_func=euclid_dist):
    return pd.Series(min(centroids, key=lambda x: dist_func(row, x)).id)


class Run():
    def __init__(self, centroids, score):
        self.centroids = centroids
        self.score = score



def main():

    k = 5
    dist_metric = euclid_dist
    df = pd.read_csv(DATA)

    statistics = {}

    for attr in ATTRIBUTES:
        mean = df[attr].mean()
        std = df[attr].std()
        statistics[attr] = (mean, std)
        df[attr] = (df[attr] - mean) / std

    with open("statistics.txt", "w") as out:
        json.dump(statistics, out)

    #initialize centroids
    centroids = []
    df_cents = df.sample(n=k)
    for i in range(k):
        centroids.append(Centroid(df_cents.iloc[i], i))

    changed = True
    while(changed == True):
        changed = False
        df["group"] = df.apply(lambda x: closest_centroid(x, centroids), axis=1)
        for cent in centroids:
            for key, val in cent.coords.items():
                new_coord = df[df["group"] == cent.id][key].mean()
                if cent.coords[key] != new_coord:
                    changed = True
                    cent.coords[key] = df[df["group"] == cent.id][key].mean()

    df["sq_err"] = df.apply(lambda x: dist_metric(x, centroids[int(x["group"])])**2, axis=1)
    wc_score = df["sq_err"].sum()

    print("WC-SSE={}".format(wc_score))
    for i in range(len(centroids)):
        print("Centroid{}={}".format(i, centroids[i]))


    df.to_csv("clusters.csv")


    for i in range(len(centroids)):
        with open("centroid-{}.txt".format(i), "w") as out:
            json.dump(centroids[i].coords, out)



if __name__ == "__main__":
    main()
