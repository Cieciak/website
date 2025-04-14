from flask import Blueprint
from flask import render_template

import os

main = Blueprint('main', __name__)

def get_projects(path: str) -> list[tuple[str, str]]:
    projects: list = []
    for proj_dir in os.listdir(path):
        if 'desc.txt' in os.listdir(os.path.join(path, proj_dir)):
            with open(os.path.join(path, proj_dir, 'desc.txt')) as file:
                title, description = file.readlines()

            projects.append(
                (title, description)
            )
    return projects

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

@main.route('/project')
def project():
    # Get all projects
    PROJ_ROOT = 'app/templates/projects/'
    projects = get_projects(PROJ_ROOT)

    return render_template('project-list.html', projects=projects)

@main.route('/project/<string:name>')
def project_page(name: str):

    return 'Hello there'

@main.route('/time')
def time():

    return render_template('time.html')