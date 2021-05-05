import pandas as pd
import praw
import re
import requests
import json
from dotenv import load_dotenv
import os
import time

load_dotenv()
starttime = time.time()

while True:
    reddit = praw.Reddit(
        client_id = os.getenv("USER_ID"),
        client_secret = os.getenv("CLIENT_SECRERT"),
        user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
    )
    df = []


    for post in reddit.subreddit('CryptoCurrency').hot(limit=500):
        
        content = {
            "title" : post.title,
            "text" : post.selftext
        }
        
        df.append(content)

    df = pd.DataFrame(df)

    regex = re.compile('[^a-zA-Z ]')
    word_dict = {}

    for (index, row) in df.iterrows():
        # titles
        title = row['title']
        
        title = regex.sub('', title)
        title_words = title.split(' ')
        
        # content
        content = row['text']
        
        content = regex.sub('', content)
        content_words = content.split(' ')
        
        # combine
        words = title_words + content_words
        
        for x in words:
            
            if x in ['A', 'B', 'GO', 'ARE', 'ON', 'IT', 'ALL', 'NEXT', 'PUMP', 'AT', 'NOW', 'FOR', 'TD', 'CEO', 'AM', 'K', 'BIG', 'BY', 'LOVE', 'CAN', 'BE', 'SO', 'OUT', 'STAY', 'OR', 'NEW','RH','EDIT','ONE','ANY']:
                pass
            elif x in word_dict:
                word_dict[x] += 1
            else:
                word_dict[x] = 1

    word_df = pd.DataFrame.from_dict(list(word_dict.items())).rename(columns = {0:"Term", 1:"Frequency"})

    ticker_df = pd.read_csv('cryptolist.csv').rename(columns = {"Symbol":"Term", "Name":"Company_Name"})

    stonks_df = pd.merge(ticker_df, word_df, on="Term")

    stonks_df = stonks_df.sort_values(by="Frequency", ascending = False, ignore_index = True).head(20)

    data = {}
    data['cryptos'] = []
    data['cryptos'].append({
        'name': stonks_df['Company_Name'][0],
        'hits': str(stonks_df['Frequency'][0]),
        'rank': '1'
    })
    data['cryptos'].append({
        'name': stonks_df['Company_Name'][1],
        'hits': str(stonks_df['Frequency'][1]),
        'rank': '2'
    })
    data['cryptos'].append({
        'name': stonks_df['Company_Name'][2],
        'hits': str(stonks_df['Frequency'][2]),
        'rank': '3'
    })

    with open('data.txt', 'a') as outfile:
        json.dump(data, outfile)

    print(stonks_df['Company_Name'][0] + " (" + stonks_df['Term'][0] + ") " + " - " + str(stonks_df['Frequency'][0]))
    print(stonks_df['Company_Name'][1] + " (" + stonks_df['Term'][1] + ") " + " - " + str(stonks_df['Frequency'][1]))
    print(stonks_df['Company_Name'][2] + " (" + stonks_df['Term'][2] + ") " + " - " + str(stonks_df['Frequency'][2]))
    time.sleep(3600.0 - ((time.time() - starttime) % 3600.0))

