import _ from 'lodash';
import JSON5 from 'json5';

// Parse raw input data and returns an array of JavaScript objects
export default input => {
  // [^{]+ Matches one or more character that is not a "{"
  // (?=\}) Matches a group of characeters without including "}" in the result
  const re = /[^{]+(?=\})/g;

  // Match string enclosed with curly braces
  // Assume that events doesn't contain curly braces or object values
  const results = _.trim(input).match(re);

  // Create valid JavaScript objects from JSON-like format with json5 lib
  if (results) return results.map(result => JSON5.parse(`{${result}}`));
};
