import os
import csv
import numpy as np

files = ["PLT_chrome_.csv", "PLT_chrome_fetch.csv", "PLT_firefox_.csv", "PLT_firefox_fetch.csv"]

cols = []
for filename in files:
    col = np.loadtxt(filename)
    cols.append(col.reshape(col.shape[0], 1))

res = np.concatenate(cols, axis=1)

with open("PLT_merged.csv", "w") as fout:
    writer = csv.writer(fout)
    for row in res:
        writer.writerow(map(lambda x: int(x), row))
