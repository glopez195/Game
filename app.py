# This Flask App serves as the backend part of a game made in JavaScript
# Functions like Login Register and normal user interactions are implemented
# But also all DB functionality to save the players data whenever he saves the game.


from email import message
import email
import os
import json
import smtplib
import sqlite3
from datetime import datetime
from flask import Flask, flash, redirect, render_template, request, session, jsonify
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# ----------------------------------------------------------------After Request---------------------------


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# This template contains the canvas where the game takes place
@app.route("/gameOn", methods=["GET", "POST"])
@login_required
def gameOn():
    """Game On!!"""
    return render_template("gameOn.html")

# ----------------------------------------------------------------"/"-------------------------------
@app.route("/", methods=["GET", "POST"])
def main():
    if request.method == "POST":
         session.clear()
    else:
        return render_template("index.html")


# ----------------------------------------------------------------LOGIN-------------------------------
@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        with sqlite3.connect('game.db') as game_db:
            db = game_db.cursor()

            # Ensure username was submitted
            if not request.form.get("username"):
                return apology("Must Provide Username", 401)

            # Ensure password was submitted
            elif not request.form.get("password"):
                return apology("Must Provide Password", 401)

            # Assign Values
            username = request.form.get("username")
            password = request.form.get("password")

            # Query database for username
            rows = db.execute("SELECT * FROM users WHERE username = (?)", (username,),).fetchall()
            # Ensure username exists and password is correct
            if len(rows) != 1 or not check_password_hash(rows[0][2], (password)):
                return apology("Invalid Username and/or Password", 401)

            # Remember which user has logged in
            session["user_id"] = rows[0][0]
            game_db.commit()
            # Redirect user to the game
            return redirect("/")
        

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")

# ----------------------------------------------------------------REGISTER-------------------------------
@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    # Making sure it was a POST request no get
    if request.method == "POST":
        with sqlite3.connect('game.db') as game_db:
            db = game_db.cursor()

            # Setting values to variables
            username = request.form.get("username")
            password = request.form.get("password")
            confirmation = request.form.get("confirmation")

            # Ensure user types in a username
            if not username:
                return apology("Must Provide Username", 401)
            # Ensure user types in a password
            elif not password:
                return apology("Must Provide Password", 401)
            # Ensure user types in a confirmation
            elif not confirmation:
                return apology("Must Provide Confirmation", 401)
            # Ensuring password and confirmation match
            elif password != confirmation:
                return apology("Confirmation Must Match Password", 401)

            # Ensuring there is no usernames with that name already
            elif len(db.execute("SELECT * FROM users WHERE username = ?", (username,),).fetchall()) > 0:
                return apology("This Username Already Exists", 401)

            # Inserting new user and password in the database
            query = "INSERT INTO users (username, hash) VALUES (?, ?)"
            db.execute(query, (username, generate_password_hash(password)))
            rows = db.execute("SELECT * FROM users WHERE username = ?", (username,),).fetchall()
            query = "INSERT INTO progress (progress_id, location_x, location_y, health, progress, hour) VALUES (?, ?, ?, ?, ?, ?)"
            session["user_id"] = rows[0][0]
            db.execute(query, (session['user_id'], -2900, -770, 100, 0, 8))
            query = "INSERT INTO inventory (inventory_id, apple,bones,dayPotion,nightPotion,healthPotion,flask,fountainFlask,chaliceFlask,slimeFlask,monsterEgg) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
            db.execute(query, (session['user_id'],0,0,0,0,0,0,0,0,0,0))
            game_db.commit()
            # Redirect user to home page
            return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("register.html")

# ----------------------------------------------------------------Play-------------------------------
@app.route("/play")
@login_required
def play():
    with sqlite3.connect('game.db') as game_db:
        db = game_db.cursor()
        row = db.execute("SELECT username FROM users WHERE id = ?", (session['user_id'],),).fetchall()
        user= row[0][0]
        return render_template("gameOn.html",user=user)

# ----------------------------------------------------------------Initialize Game-------------------------------
@app.route("/getStats")
@login_required

# getStats it's called at the beggining of each session to gather all the saved data from previous games
def getStats():

    # Query the players state and saving it
    with sqlite3.connect('game.db') as game_db:
        db = game_db.cursor()
        row = db.execute("SELECT * FROM progress WHERE progress_id = ?", (session['user_id'],),).fetchall()
        user_data = {
            'xLocation': row[0][3],
            'yLocation': row[0][2],
            'health': row[0][5],
            'progress':row[0][4],
            'hour': row[0][1]
        }

        # Then querying for the inventory
        row = db.execute("SELECT * FROM inventory WHERE inventory_id = ?", (session['user_id'],),).fetchall()
        inventory = [
            {'name':'apple', 'count': row[0][1]},
            {'name':'bones','count': row[0][2]},
            {'name':'dayPotion','count': row[0][3]},
             {'name':'nightPotion','count': row[0][4]},
            {'name':'healthPotion','count': row[0][5]},
            {'name':'flask','count': row[0][6]},
            {'name':'fountainFlask','count': row[0][7]},
            {'name':'chaliceFlask','count': row[0][8]},
            {'name':'slimeFlask','count': row[0][9]},
            {'name':'monsterEgg','count': row[0][10]},
        ]
        row = db.execute("SELECT * FROM inventory WHERE inventory_id = ?", (session['user_id'],),).fetchall()
        return jsonify(user_data,inventory)

# ----------------------------------------------------------------Logout-------------------------------
@app.route("/logout")
@login_required
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

# ----------------------------------------------------------------Updates-------------------------------
@app.route("/updates")
def updates():
    """Updates for the game"""
    return render_template("updates.html")

# ----------------------------------------------------------------About-------------------------------
@app.route("/about")
def about():
    """About the game"""
    return render_template("about.html")

# ----------------------------------------------------------------Credits-------------------------------
@app.route("/credits")
def credits():
    """About the game"""
    return render_template("credits.html")

# ----------------------------------------------------------------Save Progress-------------------------------
@app.route("/saveProgress", methods=["GET", "POST"])
@login_required
def saveProgress():

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        request_data = request.get_data()
        json_string = str(request_data)
        user_data = json.loads(json_string[2:-1])
        with sqlite3.connect('game.db') as game_db:
            db = game_db.cursor()

            # Save all the users data in the DB
            query = "UPDATE progress SET location_x = ?,location_y = ?, hour = ?, progress = ? WHERE progress_id = ?"
            db.execute(query, (user_data['xLocation'], user_data['yLocation'], user_data['hour'], user_data['progress'],session['user_id']))
            query = "UPDATE inventory SET apple=?,bones=?,dayPotion=?,nightPotion=?,healthPotion=?,flask=?,fountainFlask=?,chaliceFlask=?,slimeFlask=?,monsterEgg=? WHERE inventory_id = ?"
            db.execute(query, (0,0,0,0,0,0,0,0,0,0,session['user_id']))
            for item in user_data['inventory']:
                if item != None:
                    name = item['name']
                    # Making sure no special characters are inserted in the DB (for SQL injections)
                    if name.isalpha():
                        query = "UPDATE inventory SET " + name + " = ? WHERE inventory_id = ?"
                        db.execute(query, (item['count'], session['user_id']))
            game_db.commit()
            return ('',200)

    else:
        return ('',200)