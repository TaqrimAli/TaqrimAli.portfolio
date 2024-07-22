#   Project in python(Python Waether App)



# Formatting Variables
format_output = "\033[47m\033[30m" # * Coloring the background-color of the command line text
format_reset = "\033[0m"


# Formatted Message - Signify Start of Output
print(f"{format_output}---START---{format_reset}")



# ! weather data using a nested dictionary
weather_data = {
    "London": {"temperature": "15°C", "conditions": "Cloudy", "wind_speed": "5 km/h", "humidity": "80%"},
    "Tokyo": {"temperature": "18°C", "conditions": "Sunny", "wind_speed": "7 km/h", "humidity": "90%"},
    "Paris": {"temperature": "17°C", "conditions": "rainy", "wind_speed": "3 km/h", "humidity": "85%"}
}

def get_weather(city): # * Use this function as a global scope
    """
    Retrieves weather data for a given city.
    """
    return weather_data.get(city) # .get()- returns the value of a specified key in a dictionary



def format_conditions(conditions): # ! Here I used ANSI python color codes and changed the color based on each condition
    # * Referenced from https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html#256-colors this link
    """
    Formats weather conditions with color-coding.
    """
    if conditions.lower() == "sunny":
        return f"\033[93m{conditions}\033[0m"  # yellow for sunny
    elif conditions.lower() == "cloudy":
        return f"\033[90m{conditions}\033[0m"  # Gray for cloudy
    elif conditions.lower() == "rainy":
        return f"\u001b[46m{conditions}\u001b[0m"  # Background-color of cyan for rainy
    elif conditions.lower() == "windy":
        return f"\033[92m{conditions}\033[0m" #  green for windy
    else:
        return format_conditions()

def main():
    print("Welcome to the Weather Forecast App!")
    while True:
        try:
            city = input("Enter a city name (e.g., London, Paris, Tokyo): ").capitalize()
            weather = get_weather(city)
            print(f"\nWeather forecast for {city}:")
            print(f"Temperature: {(weather['temperature'])}")
            print(f"Conditions: {format_conditions(weather['conditions'])}")
            print(f"Wind speed: {weather['wind_speed']}")
            print(f"Humidity: {weather['humidity']}")
            break
        except KeyError:
            print(f"Invalid city name. Please enter a valid city from the list.")
        except Exception as e:
            print(f"Error is here: {e}")
        finally:
            print("Operation has been successfully executed.")

    print("\nThank you for using the Weather Forecast App!")

main()
# Formatted Message - Signify End of Output
print(f"{format_output}---END---{format_reset}")
