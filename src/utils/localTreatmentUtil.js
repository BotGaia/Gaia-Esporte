const math = require('./coordsMathUtil');


function searchParameter(parameter, parameterCode, userInput) {
  if (parameter) {
    if (new RegExp((parameter).toLowerCase()).test(userInput)) {
      return 1;
    } if (parameterCode) {
      if (new RegExp(`\\b${(parameterCode).toLowerCase()}\\b`).test(userInput)) {
        return 1;
      }
      return 0;
    }
    return 0;
  }

  return -1;
}

function treatPostCode(name) {
  const formattedName = [];
  const body = name.split(',');

  body.forEach((item) => {
    formattedName.push(item.replace(/[., -]\d+/g, ''));
  });

  return formattedName;
}

function scoreParameter(parameters, resultsArray, index, userInput) {
  const results = resultsArray;

  parameters.forEach((parameter) => {
    switch (searchParameter(results[index].components[parameter[0]],
      results[index].components[parameter[1]], userInput)) {
      case 0:
        results[index].score -= 1;
        break;
      case 1:
        results[index].score += 1;
        break;
      default:
    }
  });
}

function treatResults(resultsArray, selector, input) {
  let highestIndex;
  let highestScore = -100;
  const results = resultsArray;
  const userInput = input.toLowerCase();
  const parameters = [['country', 'country_code'], ['state', 'state_code'], ['city', 'city_code'],
    ['road', undefined], ['suburb', undefined], ['village', undefined], ['neighbourhood', undefined],
    ['town', undefined]];

  if (selector.length === 1) {
    return selector[0];
  }

  selector.forEach((index) => {
    scoreParameter(parameters, results, index, userInput);

    if (results[index].score > highestScore) {
      highestScore = results[index].score;
      highestIndex = index;
    }
  });

  return highestIndex;
}

function cleanArray(array) {
  const resultsArray = array;

  resultsArray.forEach((value, index) => {
    delete resultsArray[index].annotations;
    delete resultsArray[index].bounds;
    delete resultsArray[index].components;
    delete resultsArray[index].confidence;
    delete resultsArray[index].isChecked;
    delete resultsArray[index].score;
    resultsArray[index].name = treatPostCode(resultsArray[index].formatted);
    resultsArray[index].lat = resultsArray[index].geometry.lat;
    resultsArray[index].lng = resultsArray[index].geometry.lng;
    delete resultsArray[index].geometry;
    resultsArray[index].name = resultsArray[index].name.toString().replace(/,,/g, ',').replace(/-,/g, ',');
    delete resultsArray[index].formatted;
  });

  return resultsArray;
}

function selectResults(allResults, resultsArray, userInput) {
  const results = allResults;
  const radius = 10;

  results.forEach((value, index) => {
    if (!results[index].isChecked) {
      const selector = [];

      results[index].isChecked = 1;
      selector.push(index);

      results.forEach((value2, index2) => {
        if ((index !== index2) && (!results[index2].isChecked)) {
          const lat = [math.toRadians(results[index].geometry.lat),
            math.toRadians(results[index2].geometry.lat)];
          const lng = [math.toRadians(results[index].geometry.lng),
            math.toRadians(results[index2].geometry.lng)];

          if ((math.haversine(lat, lng) <= radius)
            && ((results[index].components.city === results[index2].components.city)
              || !(results[index].components.city && results[index2].components.city))) {
            selector.push(index2);
            results[index2].isChecked = 1;
          }
        }
      });

      resultsArray.push(results[treatResults(results, selector, userInput)]);
    }
  });
}
module.exports = {

  bodyToLocal: (body, local) => {
    try {
      local.setName(treatPostCode(body.results[0].formatted));
      local.setLongitude(body.results[0].geometry.lng);
      local.setLatitude(body.results[0].geometry.lat);
    } catch (error) {
      local.setName('error');
      local.setLongitude('error');
      local.setLatitude('error');
    }
  },

  bodyToResultsArray: (body, userInput) => {
    try {
      const { results } = body;
      const resultsArray = [];

      results.forEach((value, index) => {
        results[index].isChecked = 0;
        results[index].score = 0;
      });

      selectResults(results, resultsArray, userInput);

      return cleanArray(resultsArray);
    } catch (err) {
      return JSON.parse('[{"name":"error","lat":"error","lng":"error"}]');
    }
  },
};
