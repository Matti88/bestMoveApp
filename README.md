# bestMove

Welcome to **bestMove**! This is an advanced React-based web application that helps users find their ideal home or apartment by leveraging isochrones and a variety of filters. With **bestMove**, you can search for properties within a specific travel time from a point of interest, apply price and area filters, and even upload your own datasets to work with.

## Features

- **Isochrones Search**: Filter properties based on travel time from any point of interest using MapBox and GeoApify APIs.
- **Property Filters**: Refine your search with price and area filters to find the perfect match.
- **Custom Datasets**: Upload your own dataset of houses or apartments with geo-locations and filter them using the app’s powerful tools.
- **Interactive Map**: Visualize properties and isochrones directly on the map.

## Demo

Check out a video tutorial demonstrating the usage of the app on YouTube: [bestMove Tutorial](https://www.youtube.com/watch?v=your-video-id).

## Installation

Follow these steps to set up **bestMove** on your local machine:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/bestMove.git
    cd bestMove
    ```

2. **Install dependencies**:
    ```bash
    yarn install
    ```

3. **Create a `.env` file** in the root directory of the project and add your MapBox and GeoApify API keys:
    ```plaintext
    VITE_MAPBOX_API_KEY=your_mapbox_api_key
    VITE_GEOAPIFY_API_KEY=your_geoapify_api_key
    ```

4. **Run the development server**:
    ```bash
    yarn dev
    ```

5. Open your browser and navigate to `http://localhost:3000` to start using **bestMove**.

## Usage

1. **Select a Point of Interest (POI)**: Choose a location on the map to center your search.
2. **Adjust Isochrones**: Define the travel time radius around your POI to filter properties.
3. **Apply Filters**: Use the price and area sliders to refine your search results.
4. **Upload a Dataset**: If you have your own list of properties, upload it in CSV format with geo-location data to work with your data.
5. **View Results**: Properties matching your criteria will be displayed on the map.

For a step-by-step guide on how to use **bestMove**, please refer to the [tutorial video](https://www.youtube.com/watch?v=a4YysSHueHs).

## Contributing

We welcome contributions to **bestMove**! If you have any ideas, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](https://www.mit.edu/~amini/LICENSE.md) file for more details.

---

We hope you find **bestMove** helpful in your search for the perfect home or apartment! If you have any questions or feedback, don't hesitate to reach out. Happy house hunting!