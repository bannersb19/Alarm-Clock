#Importing all the necessary libraries to form the alarm clock:

from tkinter import *
import datetime
import time
import winsound
import os 
from playsound import playsound
import turtle

def alarm(set_alarm_timer):
    while True:
        time.sleep(1)
        current_time = datetime.datetime.now()
        now = current_time.strftime("%H:%M:%S")
        date = current_time.strftime("%d/%m/%Y")
        print("The Set Date is:",date)
        print(now)
        if now == set_alarm_timer:
            print("HAPPY BIRTHDAY!!!!!")
            playsound('audio.mp3') 
            break

def actual_time():
    set_alarm_timer = f"{hour.get()}:{min.get()}:{sec.get()}"
    alarm(set_alarm_timer)

clock = Tk()

clock.title("Banner's Timer")
clock.geometry("400x200")
time_format=Label(clock, text= "Enter time in 24 hour format!", fg="white",bg="black",font=("Helvetica",10,"bold")).place(x=6,y=30)
addTime = Label(clock,text = "Hour  Min   Sec",font=("Helevetica",10,"bold")).place(x = 120,y=90)
setYourAlarm = Label(clock,text = "Enter the time: ",fg="white",bg="black",relief = "solid",font=("Helevetica",10,"bold")).place(x=6, y=70)

# The Variables we require to set the alarm(initialization):
hour = StringVar()
min = StringVar()
sec = StringVar()

#Time required to set the alarm clock:
hourTime= Entry(clock,textvariable = hour,bg = "white",width = 15).place(x=110,y=70)
minTime= Entry(clock,textvariable = min,bg = "white",width = 15).place(x=150,y=70)
secTime = Entry(clock,textvariable = sec,bg = "white",width = 15).place(x=200,y=70)

#To take the time input by user:
submit = Button(clock,text = "Set Alarm",fg="white",bg="black",width = 10,command = actual_time).place(x =110,y=120)

clock.mainloop()
#Execution of the window.    