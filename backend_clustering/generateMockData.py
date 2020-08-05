# -*- coding: utf-8 -*-
"""
Created on Sat Jan 25 11:10:16 2020

@author: ACAMPBELL
        austin-campbell1@hotmail.com
"""


import numpy as np
import pandas as pd

CAT_FILE = "C:\\Users\\ACAMPBELL\\repos\\BoilerMakeVII\\prodCategories.txt"


def gen_cluster(weights, df):
    for i in range(len(df.index) + 1, len(df.index) + 101):
        df.loc[i] = [x[0]*x[1] for x in zip(weights,list(np.random.randint(100, size = len(weights))))]



attributes = []
with open(CAT_FILE) as cat_file:
    attributes = cat_file.readline().split(",")


df = pd.DataFrame(columns = attributes)

#weights = list(np.random.randint(100, size = len(attributes)))
weights = [80, 0, 40, 10, 40, 5, 0, 60]
gen_cluster(weights, df)

weights = [0, 70, 30, 20, 0, 30, 50, 60]
gen_cluster(weights, df)

weights = [0, 0, 10, 85, 0, 10, 20, 34]
gen_cluster(weights, df)

weights = [33, 48, 85, 71, 28, 74, 41, 34]
gen_cluster(weights, df)


df.to_csv("C:\\Users\\ACAMPBELL\\repos\\BoilerMakeVII\\mockData.csv")