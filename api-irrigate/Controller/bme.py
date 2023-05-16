import sys
sys.path.insert(0, '/usr/local/lib/python3.9/dist-packages')
import smbus
import time
import bme280

bus = smbus.SMBus(1)
bme280_data = bme280.sample(bus, 0x76)
temperature = bme280_data.temperature
pressure = bme280_data.pressure
humidity = bme280_data.humidity

print("Temperature: {} C".format(temperature))
print("Pressure: {} hPa".format(pressure))
print("Humidity: {} %".format(humidity))
