# Data Visualization Dashboard

This project implements a **Data Visualization Dashboard** with a **React** frontend and a **Flask** backend. It allows users to interactively filter and visualize data from a provided `jsondata.json` file stored in MongoDB. The dashboard provides visual insights via charts, and users can apply filters such as **Year** and **Topic** to refine the data.

## Features

- **Interactive Filters**: Allows users to filter data by **Year**, **Topic**, and other criteria.
- **Multiple Visualizations**: Displays visualizations like bar charts and pie charts for various data metrics such as **Intensity by Year** and **Relevance by Country**.
- **Dynamic Data Loading**: The dashboard fetches data from the Flask backend based on user-selected filters and updates the visualizations.


---

## Requirements

### 1. **Backend (Flask) Setup**:

- **MongoDB**: Ensure MongoDB is installed and running. You can download it from [here](https://www.mongodb.com/try/download/community).
  
- **Python Packages**: Install the required Python packages by running:

  ```bash
  pip install -r backend/requirements.txt
