#!/bin/bash

# Common path for all GPIO access
BASE_GPIO_PATH=/sys/class/gpio

#assign name to gpio pin 18
VALVE=18

#assign name to state
ON="1"
OFF="0"

# Utility function to export a pin if not already exported
exportPin()
{
  if [ ! -e $BASE_GPIO_PATH/gpio$1 ]; then
    echo "$1" > $BASE_GPIO_PATH/export
  fi
}

# Utility function to set a pin as an output
setOutput()
{
  echo "out" > $BASE_GPIO_PATH/gpio$1/direction
}
# Utility function to change state of a light
setValveState()
{
  echo $2 > $BASE_GPIO_PATH/gpio$1/value
}
exportPin $VALVE
setOutput $VALVE

setValveState $VALVE $ON
sleep 5
setValveState $VALVE $OFF


