from datetime import datetime
from playsound import playsound
alarm_time = input("Enter the time of alarm to be set:HH:MM:SS\n")
alarm_hour=alarm_time[0:2]
alarm_minute=alarm_time[3:5]
alarm_second=alarm_time[6:8]
alarm_period=alarm_time[9:11].upper()
print("Setting up alarm.....")
while True:
    now=datetime.now()
    current_hour=now.strftime("%I")
    current_minute=now.strftime("%M")
    current_second=now.strftime("%S")
    current_period=now.strftime("%p")
    if(alarm_period==current_period):
        print("1")
        if(alarm_hour==current_hour):
            print("2")
            if(alarm_minute==current_minute):
                print("3")
                if(alarm_second==current_second):
                    print("Wake UP!!!!")
                    playsound('audio.mp3')
                    break


