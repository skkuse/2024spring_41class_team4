import os

class Config:
    # 기본 구성
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:1234@localhost/BT'
    SQLALCHEMY_TRACK_MODIFICATIONS = False