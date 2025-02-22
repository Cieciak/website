from flask import Blueprint
from flask import render_template

import os

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/home')
def homepage():

    # Get all projects
    PROJ_ROOT = 'app/templates/projects/'
    projects = []
    for proj_path in os.listdir(PROJ_ROOT):
        if 'desc.txt' in os.listdir(os.path.join(PROJ_ROOT, proj_path)):

            with open(os.path.join(PROJ_ROOT, proj_path, 'desc.txt')) as file:
                title, description = file.readlines()
            
            projects.append(
                (title, description)
            )

    return render_template('homepage.html', projects=projects)