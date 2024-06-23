from flask import Flask, render_template, redirect, url_for

import pandas as pd
import numpy as np

# 웹 애플리케이션 초기화
app = Flask(__name__)

# 데이터 준비 (간소화된 예시 데이터)
data = {
    'CPU': {
        'model1': {'TDP': 100, 'carbon_intensity': 500},  # TDP in Watts, carbon_intensity in gCO2e/kWh
        'model2': {'TDP': 150, 'carbon_intensity': 600},
    },
    'GPU': {
        'modelA': {'TDP': 200, 'carbon_intensity': 700},
        'modelB': {'TDP': 250, 'carbon_intensity': 800},
    },
    'memory_power': 10,  # Power consumption of memory in Watts
    'default_PUE': 1.2,  # Default PUE (Power Usage Effectiveness)
    'location_carbon_intensity': {
        'Europe': 300,  # gCO2e/kWh
        'North America': 400,
        'Asia': 500,
    }
}

# 탄소 배출량 계산 함수
def calculate_carbon_emissions(cpu_model, gpu_model, memory_gb, runtime_hours, location):
    # CPU 및 GPU의 TDP 및 탄소 배출 강도 가져오기
    cpu_tdp = data['CPU'][cpu_model]['TDP']  # in Watts
    cpu_carbon_intensity = data['CPU'][cpu_model]['carbon_intensity']  # in gCO2e/kWh
    gpu_tdp = data['GPU'][gpu_model]['TDP']  # in Watts
    gpu_carbon_intensity = data['GPU'][gpu_model]['carbon_intensity']  # in gCO2e/kWh
    
    # 메모리의 전력 소비
    memory_power = data['memory_power']  # in Watts
    
    # 기본 PUE (Power Usage Effectiveness)
    default_pue = data['default_PUE']
    
    # 위치에 따른 탄소 배출 강도
    location_carbon_intensity = data['location_carbon_intensity'][location]  # in gCO2e/kWh
    
    # 전력 소비량 계산
    cpu_power = cpu_tdp * runtime_hours  # CPU 전력 소비량 (Wh)
    gpu_power = gpu_tdp * runtime_hours  # GPU 전력 소비량 (Wh)
    memory_power = memory_power * runtime_hours  # 메모리 전력 소비량 (Wh)
    
    total_power = cpu_power + gpu_power + memory_power  # 총 전력 소비량 (Wh)
    
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
    # '/start' 경로로 접속하면 start.html 페이지로 리다이렉트
    return redirect(url_for('start_page'))

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
    # ranking.html을 렌더링하는 함수
    return render_template('ranking.html')

@app.route('/profile')
def profile():
    # 이 부분에서 로그인된 사용자의 프로필 정보를 가져오는 로직을 추가할 수 있습니다.
    # 예시로 고정된 데이터를 사용하겠습니다.
    if 'username' in session:
        user = users.get(session['username'], None)
        if user:
            return render_template('profile.html', user_id=session['username'], user_email=user['email'], user_level=user['level'], user_total_emission=user['total_emission'])
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['user_id']
        password = request.form['user_pw']
        if username in users and users[username]['password'] == password:
            session['username'] = username
            return redirect(url_for('profile'))
        else:
            # 로그인 실패 처리
            error = 'Invalid credentials. Please try again.'
            return render_template('login.html', error=error)
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        user_name = request.form['user_name']
        user_email = request.form['user_email']
        user_id = request.form['user_id']
        user_pw = request.form['user_pw']
        user_pw_confirm = request.form['user_pw_confirm']

        if user_id in users:
            error = 'Username already taken. Please choose another one.'
            return render_template('signup.html', error=error)

        if user_pw != user_pw_confirm:
            error = 'Passwords do not match. Please try again.'
            return render_template('signup.html', error=error)

        # Store user data (in a real app, this would be stored in a database)
        users[user_id] = {
            'name': user_name,
            'email': user_email,
            'password': user_pw
        }

        # Redirect to login page after successful sign-up
        return redirect(url_for('login'))

    # Render sign-up form for GET request
    return render_template('signup.html')


@app.route('/code_input')
def code_input():
    return render_template('code_input.html')

@app.route('/run_code', methods=['POST'])
def run_code():
    code = request.form.get('code')

    # Execute code (dummy example)
    output = execute_code(code)

    return jsonify({'output': output})

def execute_code(code):
    # Dummy function to execute code (replace with actual code execution logic)
    # In a real scenario, you would use subprocess or other secure methods to execute code
    if code.strip() == "print('Hello, World!')":
        return "Hello, World!"
    else:
        return "Code execution result"


# 애플리케이션 실행
if __name__ == '__main__':
    app.run(debug=True)
