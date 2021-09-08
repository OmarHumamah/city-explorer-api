function Forecast(day) {
    (this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`),
      (this.date = day.datetime);
  }

  module.exports = Forecast