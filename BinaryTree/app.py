from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_login import login_user, logout_user, current_user, login_required

import pandas as pd
import time, subprocess
import numpy as np
from flask_login import UserMixin
import pymysql

# 웹 애플리케이션 초기화
app = Flask(__name__)
app.config.from_object(Config)

db = pymysql.connect(host='127.0.0.1', user='tb', password='1234', db='bt', charset='utf8')

user_id = None

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email

from flask_login import login_user, logout_user, current_user, login_required

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')
    
from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, id):
        self.id = id

# 탄소 배출량 계산 함수
def calculate_carbon_emissions():
    cpu_tdp = 65
    gpu_tdp = 70
    
    # 기본 PUE (Power Usage Effectiveness)
    default_pue = 1.11
    
    # 위치에 따른 탄소 배출 강도
    location_carbon_intensity = 475  # in gCO2e/kWh
    
    compile_command = f"javac temp.java"
    start_compile_time = time.time()  # 컴파일 시작 시간 측정
    compile_result = subprocess.run(compile_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    end_compile_time = time.time()
    
    runtime_hours = (end_compile_time - start_compile_time) / 3600
    
    # 전력 소비량 계산
    cpu_power = cpu_tdp * runtime_hours  # CPU 전력 소비량 (Wh)
    gpu_power = gpu_tdp * runtime_hours  # GPU 전력 소비량 (Wh)
    
    total_power = cpu_power + gpu_power
    
    # PUE를 고려한 실제 전력 소비량 (PUE = Power Usage Effectiveness)
    actual_power_consumption = total_power * default_pue
    
    # 에너지 소비량 (kWh)
    energy_consumption = actual_power_consumption / 1000  # kWh
    
    # 탄소 배출량 계산 (gCO2e)
    carbon_emissions = energy_consumption * location_carbon_intensity  # gCO2e
    
    return carbon_emissions

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start')
def start():
    return redirect(url_for('code_input'))

@app.route('/ranking')
def ranking():
    # '/ranking' 경로로 접속하면 ranking.html 페이지로 리다이렉트
    return redirect(url_for('ranking_page'))

@app.route('/start_page')
def start_page():
    # start.html을 렌더링하는 함수
    return render_template('start.html')

@app.route('/ranking_page')
def ranking_page():
    search_type = request.form.get('search_type')
    search_data = request.form.get('search_data')
    try:
        cursor = db.cursor()

        # 예제: 특정 이름을 가진 레코드 조회
        query = "SELECT id, username AS name, email, level, tce FROM Users;"
        cursor.execute(query)

        # 결과 가져오기
        rows = cursor.fetchall()

        if cursor.rowcount > 0:
            users = []
            for row in rows:
                users.append({'name': row[1], 'level':  row[2], 'carbon_reduction': row[3]})
            if search_type == 'ID':
                sorted_users = sorted(users, key=lambda x: x['carbon_reduction'], reverse=True)
            else:
                sorted_users = sorted(users, key=lambda x: x['level'], reverse=True)
            return render_template('ranking.html', users = sorted_users)
        else:
            return render_template('ranking.html')

    except:
        return redirect(url_for('index'))

@app.route('/profile')
def profile():
    try:
        cursor = db.cursor()
        global user_id

        # 예제: 특정 이름을 가진 레코드 조회
        query = "SELECT id, username AS name, email, level, tce FROM Users WHERE username = %s"
        cursor.execute(query, (user_id,))

        # 결과 가져오기
        rows = cursor.fetchall()

        if cursor.rowcount > 0:
            return render_template('profile.html', user_id=rows[0][0], user_email=rows[0][2], user_level=rows[0][3], user_total_emission=rows[0][4])
        else:
            return redirect(url_for('login'))

    except:
        return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST':
        id = request.form['user_id']
        password = request.form['user_pw']
        cursor = db.cursor()

        # 예제: 특정 이름을 가진 레코드 조회
        query = "SELECT * FROM Users WHERE id = %s AND pw = %s"
        cursor.execute(query, (id, password))
        

        rows = cursor.fetchall()

        if cursor.rowcount > 0:
            global user_id
            user_id = id
            return redirect(url_for('profile'))
        else:
            return redirect(url_for('index'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    global user_id
    user_id = None
    return redirect(url_for('index'))


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        user_name = request.form['user_name']
        user_email = request.form['user_email']
        user_id = request.form['user_id']
        user_pw = request.form['user_pw']
        user_pw_confirm = request.form['user_pw_confirm']
        try:
            cursor = db.cursor()

            # 데이터 삽입 쿼리
            insert_query = "INSERT INTO Users (id, pw, username, email, tce, level) VALUES (%s, %s, %s, %s, %s, %s)"
            data = (user_id, user_pw, user_name, user_email, 0, 1)
            cursor.execute(insert_query, data)
            print("test")
            db.commit()
            cursor.close()
            return redirect(url_for('login'))  
        
        except:
            db.rollback()  # 롤백 처리
            return redirect(url_for('index'))  

    # Render sign-up form for GET request
    return render_template('signup.html')



@app.route('/code_input')
def code_input():
    return render_template('code_input.html')

@app.route('/run_code', methods=['POST'])
def run_code():
    code = request.form.get('code')
    f = open('temp.java', 'w')
    f.write(code)
    f.close()
    
    output = calculate_carbon_emissions()
    # output = 0

    return jsonify({'output': output})



app.run(debug=True)
db.commit()
db.close()