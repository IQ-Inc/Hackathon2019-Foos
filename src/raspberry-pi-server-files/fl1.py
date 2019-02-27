from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import RPi.GPIO as GPIO 

 # GPIO Setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_UP)  

# Rest Setup
app = Flask(__name__)
CORS(app)

# Game states
count = 0

def callback_m(channel):
	global count  
	count += 1

@app.route('/score', methods=['GET'])
def index():
        return jsonify('hello from rpi!: ' + str(count))

if __name__ == '__main__':
	GPIO.add_event_detect(23, GPIO.FALLING, callback=callback_m, bouncetime=300)
	app.run(host= '0.0.0.0', debug=True)