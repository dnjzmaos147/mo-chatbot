from flask import Flask,render_template,request
import os
import requests as rq
from pprint import pprint as pp
import json
from bs4 import BeautifulSoup

# from selenium.webdriver.common.keys import Keys

app = Flask(__name__)




@app.route('/')
def index():

    schedule_data = []

    def get_month(sjd):
        for d in sjd:
            strd = d['date']
            month = ""
            for i in range(5, 7):
                month = month + strd[i]
            sd_json = {
               'month':month,
               'date':strd,
               'title':d['title']
            }
            schedule_data.append(sd_json)

    schedule = []
    def get_ports(soup):
        return soup.select('div.month div.month_txt li.blit_star')

    def data_parse(posts):
        
        for post in posts:
            date = post.find('span',{"class":"width_txt"}).text
            title = post.find('span',{"class":"weight_txt"}).text
            schedule_json = {
                'date':date,
                'title':title
            }
            
            schedule.append(schedule_json)



    base_url = 'https://www.daelim.ac.kr/hme/stu_service/prg/stu_plan.do?calTime=2&year=2020'

    res = rq.get(base_url)
    soup = BeautifulSoup(res.content, 'lxml')

    posts = get_ports(soup)
    data_parse(posts)

    

    get_month(schedule)
    ff= str(schedule_data)
    print(ff)

    return render_template('index.html', schedule=ff)

