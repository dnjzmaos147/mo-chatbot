import requests as rq
from selenium import webdriver
from bs4 import BeautifulSoup

# from selenium.webdriver.common.keys import Keysp


# base_url = 'https://pjt3591oo.github.io/'

# with open("test.csv", "a") as f:
#     columns = ["title", "link"]
#     column = ','.join(columns) + '\n'
#     f.write(column)

def get_ports(soup):
    print("check port")
    return soup.select('div.month div.month_txt li.blit_star')

def data_parse(posts):
    print("parse")
    for post in posts:
        date = post.find('span',{"class":"width_txt"}).text
        title = post.find('span',{"class":"weight_txt"}).text
        # mongo_connection.save(date, title)
        print(date)
        print(title)

        # csv_save(date, title)
        
# def csv_save(date, title):
#     with open("date.csv", "a") as f:
#         row = ('%s, %s\n')%(date, title)
#         f.write(row)

base_url = 'https://www.daelim.ac.kr/hme/stu_service/prg/stu_plan.do?calTime=2&year=2020'

res = rq.get(base_url)
soup = BeautifulSoup(res.content, 'lxml')

posts = get_ports(soup)
data_parse(posts)