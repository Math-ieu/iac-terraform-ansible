import os

class Config:
    DB_HOST = os.getenv("DB_HOST", "terraform-20251016115204360400000001.cxky4ye6asg9.eu-west-3.rds.amazonaws.com")
    DB_PORT = int(os.getenv("DB_PORT", 3306))
    DB_NAME = os.getenv("DB_NAME", "flaskdb")
    DB_USER = os.getenv("DB_USER", "admin")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "johntheripper")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
