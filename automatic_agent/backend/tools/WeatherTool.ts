export interface WeatherData {
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  city: string;
  country: string;
}

export class WeatherTool {
  private apiKey: string;
  private weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
  private geocodingUrl = "https://api.openweathermap.org/geo/1.0/direct";

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || "";
    if (!this.apiKey) {
      console.warn(
        "[WeatherTool] Missing OPENWEATHER_API_KEY. Weather checks will fail."
      );
    }
  }

  /**
   * Gets coordinates for a city using Geocoding API
   * @param city - Name of the city
   * @param countryCode - Optional ISO 3166 country code
   * @returns Coordinates or error
   */
  private async getCoordinates(city: string): Promise<{
    success: boolean;
    lat?: number;
    lon?: number;
    error?: string;
  }> {
    try {
      const query = city;
      const url = new URL(this.geocodingUrl);
      url.searchParams.append("q", query);
      url.searchParams.append("limit", "1");
      url.searchParams.append("appid", this.apiKey);

      const response = await fetch(url.toString());

      if (!response.ok) {
        return {
          success: false,
          error: `Geocoding API error: ${response.status}`,
        };
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        return {
          success: false,
          error: `City "${city}" not found`,
        };
      }

      return {
        success: true,
        lat: data[0].lat,
        lon: data[0].lon,
      };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return {
        success: false,
        error: `Failed to fetch coordinates: ${error}`,
      };
    }
  }

  /**
   * Gets current weather for a specific city
   * @param city - Name of the city (e.g., "Warsaw", "London", "New York")
   * @param countryCode - Optional ISO 3166 country code (e.g., "pl", "gb", "us")
   * @returns Weather data or error
   */
  async getWeather(city: string): Promise<{
    success: boolean;
    data?: WeatherData;
    error?: string;
  }> {
    // Validation
    if (!city || city.trim().length === 0) {
      return {
        success: false,
        error: "City name is required",
      };
    }

    if (!this.apiKey) {
      return {
        success: false,
        error: "OPENWEATHER_API_KEY is not configured",
      };
    }

    try {
      // First, get coordinates for the city
      const coordsResult = await this.getCoordinates(city);

      if (!coordsResult.success || !coordsResult.lat || !coordsResult.lon) {
        return {
          success: false,
          error: coordsResult.error || "Failed to get city coordinates",
        };
      }

      // Then, fetch weather data using coordinates
      const url = new URL(this.weatherUrl);
      url.searchParams.append("lat", coordsResult.lat.toString());
      url.searchParams.append("lon", coordsResult.lon.toString());
      url.searchParams.append("appid", this.apiKey);
      url.searchParams.append("units", "metric"); // Celsius
      url.searchParams.append("lang", "pl"); // Polish descriptions

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || `HTTP error ${response.status}`,
        };
      }

      const data = await response.json();

      // Transform API response to our format
      const weatherData: WeatherData = {
        temperature: Math.round(data.main.temp * 10) / 10,
        feelsLike: Math.round(data.main.feels_like * 10) / 10,
        description: data.weather[0]?.description || "Unknown",
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 10) / 10,
        pressure: data.main.pressure,
        city: data.name,
        country: data.sys.country,
      };

      console.log(
        `✅ Weather fetched successfully for ${weatherData.city}, ${weatherData.country}`
      );

      return {
        success: true,
        data: weatherData,
      };
    } catch (error) {
      console.error("Error fetching weather:", error);
      return {
        success: false,
        error: `Failed to fetch weather: ${error}`,
      };
    }
  }

  /**
   * Formats weather data into a human-readable string
   * @param weatherData - Weather data to format
   * @returns Formatted string
   */
  formatWeather(weatherData: WeatherData): string {
    return `Pogoda w ${weatherData.city}, ${weatherData.country}:
🌡️ Temperatura: ${weatherData.temperature}°C (odczuwalna: ${weatherData.feelsLike}°C)
☁️ Opis: ${weatherData.description}
💧 Wilgotność: ${weatherData.humidity}%
💨 Wiatr: ${weatherData.windSpeed} m/s
🔽 Ciśnienie: ${weatherData.pressure} hPa`;
  }
}
