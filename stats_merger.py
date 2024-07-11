import os
import pandas as pd

projects = {
    "Torn Spotlight Search": "tornSpotlightSearch"
}

all_stats = pd.read_csv(f"stats.csv")
for project in projects:
    folder = projects[project]

    stats_folder = f"{folder}/stats"

    # Read all csv files and merge them and write to a single csv file and delete original csv files
    for file in sorted(os.listdir(stats_folder)):
        if file.endswith(".csv"):
            stats = pd.read_csv(f"{stats_folder}/{file}")
            stats[project] = stats["Installs"]
            stats = stats[["Date", project]]
            all_stats = pd.concat([all_stats, stats])
            # os.remove(f"{stats_folder}/{file}")

    print(f"{file} has {len(stats)} rows")

all_stats.drop_duplicates(inplace=True)
all_stats.to_csv("'stats.csv', index=False")
# print(f"{stats_folder}/all_stats.csv has {len(all_stats)} rows")
