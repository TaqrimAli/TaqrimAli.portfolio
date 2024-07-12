# Project in python(A climate chart for weather in London)

import matplotlib.pyplot as plt
import numpy as np

# Monthly average temperature (°C) and rainfall (mm)
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
avg_temp = [4.8, 5.1, 6.7, 8.9, 12.0, 15.2, 17.8, 17.5, 15.0, 11.3, 7.5, 5.3]
rainfall = [55, 48, 58, 44, 52, 60, 45, 40, 50, 70, 65, 58]

# Create a larger figure(larger graph)
plt.figure(figsize=(12, 8))

# Bar plot for average temperature
plt.bar(months, avg_temp, color='skyblue', edgecolor='black', linewidth=1.5, label='Avg Temp')
plt.xlabel('Month', fontsize=14)
plt.ylabel('Temperature (°C)', fontsize=14)

# Line plot for rainfall
plt.plot(months, rainfall, marker='o', color='grey', label='Rainfall')
plt.ylabel('Rainfall (mm)', fontsize=14)

# Title and legend
plt.title('London Climate: Average Temp and Rainfall', fontsize=16)
plt.legend(fontsize=12)

# Annotate data points (temperature and rainfall)
for i, temp in enumerate(avg_temp):
    plt.text(i, temp + 0.3, f'{temp}°C', ha='center', va='bottom', fontsize=10) # 0.3 is in rem 
    plt.text(i, rainfall[i] - 2, f'{rainfall[i]} mm', ha='center', va='top', fontsize=10) # -2 is in rem

# Customize grid lines
plt.grid(axis='y', linestyle='--', alpha=0.7)

# Add a background color
plt.axhspan(0, 10, facecolor='lightgray', alpha=0.2) # Alpha same meaning as opacity in css where you can set the transparency of a color

# Show the plot
plt.tight_layout() # This is part of the matplotlib in-built function used to cover more space on the graph
plt.show()

