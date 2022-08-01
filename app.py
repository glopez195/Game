import os
import json

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


@app.route("/gameOn", methods=["GET", "POST"])
@login_required
def gameOn():
    """Game On!!"""
    return render_template("gameOn.html")

# ----------------------------------------------------------------"/"-------------------------------
@app.route("/")
@login_required
def index():
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
                return apology("must provide username", 400)

            # Ensure password was submitted
            elif not request.form.get("password"):
                return apology("must provide password", 400)

            username = request.form.get("username")
            password = request.form.get("password")
            # Query database for username
            rows = db.execute("SELECT * FROM users WHERE username = (?)", (username,),).fetchall()

            # Ensure username exists and password is correct
            if len(rows) != 1 or not check_password_hash(rows[0]["hash"], (password,),).fetchall():
                return apology("Invalid Username and/or Password", 400)

            # Remember which user has logged in
            session["user_id"] = rows[0]["id"]

            db.close()
            # Redirect user to the game
            return redirect("/gameOn")
        

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
                return apology("must provide username", 400)
            # Ensure user types in a password
            elif not password:
                return apology("must provide password", 400)
            # Ensure user types in a confirmation
            elif not confirmation:
                return apology("must provide confirmation", 400)
            # Ensuring password and confirmation match
            elif password != confirmation:
                return apology("confirmation must match password", 400)

            # Ensuring there is no usernames with that name already
            elif len(db.execute("SELECT * FROM users WHERE username = ?", (username,),).fetchall()) > 0:
                return apology("This username already exists", 400)

            # Inserting new user and password in the database
            query = "INSERT INTO users (username, hash) VALUES (?, ?)"
            db.execute(query, (username, generate_password_hash(password)))
            rows = db.execute("SELECT * FROM users WHERE username = ?", (username,),).fetchall()

            # Ensuring data was successfully saved and loggin the user in
            if len(rows) != 1 or not check_password_hash(rows[0]["hash"], password):
                return apology("something went wrong", 400)
            session["user_id"] = rows[0]["id"]

            db.close()
            # Redirect user to home page
            return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("register.html")
