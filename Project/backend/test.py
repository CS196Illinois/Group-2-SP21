import pandas as pd
import praw
import re
import requests

reddit = praw.Reddit(
    client_id = "EUjAh6lhD_gNuQ",
    client_secret = "gKxohPVBljW4jQ1KLfqVafpgMT6tPw",
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
)
df = []


for post in reddit.subreddit('wallstreetbets').hot(limit=500):
    
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

ticker_df = pd.read_csv('tickers.csv').rename(columns = {"Symbol":"Term", "Name":"Company_Name"})

stonks_df = pd.merge(ticker_df, word_df, on="Term")

stonks_df = stonks_df.sort_values(by="Frequency", ascending = False, ignore_index = True).head(20)


output = "\n\n~~Top 10 Stonks on WSB~~\n"+ "1) "+ stonks_df['Company_Name'][0] + " (" + stonks_df['Term'][0] + ") " + " - " + str(stonks_df['Frequency'][0]) + " mentions\n"+ "2) "+ stonks_df['Company_Name'][1] + " (" + stonks_df['Term'][1] + ") " + " - " + str(stonks_df['Frequency'][1]) + " mentions\n"+ "3) "+ stonks_df['Company_Name'][2] + " (" + stonks_df['Term'][2] + ") " + " - " + str(stonks_df['Frequency'][2]) + " mentions\n"+ "4) "+ stonks_df['Company_Name'][3] + " (" + stonks_df['Term'][3] + ") " + " - " + str(stonks_df['Frequency'][3]) + " mentions\n"+ "5) "+ stonks_df['Company_Name'][4] + " (" + stonks_df['Term'][4] + ") " + " - " + str(stonks_df['Frequency'][4]) + " mentions\n"+ "6) "+ stonks_df['Company_Name'][5] + " (" + stonks_df['Term'][5] + ") " + " - " + str(stonks_df['Frequency'][5]) + " mentions\n"+ "7) "+ stonks_df['Company_Name'][6] + " (" + stonks_df['Term'][6] + ") " + " - " + str(stonks_df['Frequency'][6]) + " mentions\n"+ "8) "+ stonks_df['Company_Name'][7] + " (" + stonks_df['Term'][7] + ") " + " - " + str(stonks_df['Frequency'][7]) + " mentions\n"+ "9) "+ stonks_df['Company_Name'][8] + " (" + stonks_df['Term'][8] + ") " + " - " + str(stonks_df['Frequency'][8]) + " mentions\n"+ "10) "+ stonks_df['Company_Name'][9] + " (" + stonks_df['Term'][9] + ") " + " - " + str(stonks_df['Frequency'][9]) + " mentions"
