import _ from 'lodash';
//
// google chart format:
// [
//  [   x axis    , line 1  , line 2  , line 3  ],
//  [ x axis data , data 1  , data 2  , data 3  ],
//  [ x axis data , data 1  , data 2  , data 3  ],
// ]
//
export const parse_chart = events => {
  const chart_header = _.concat('time', create_chart_header(events));
  const chart_data = create_chart_data(events);

  return _.concat([chart_header], chart_data);
};

// chart top row
const create_chart_header = events => {
  const { select } = events.start;

  if (!select) return;

  const header_values = select.map(s => get_uniq_groups(events).map(g => `${g} ${s}`));

  return _.flatten(header_values);
};

// chart data rows
const create_chart_data = events => {
  const { select } = events.start;
  const { begin } = events.span;
  const { data } = events;

  if (!select) return;

  const chart_data = get_rows(events).map(time => {
    let row = [];
    row = [...row, millis_to_seconds(time - begin)];
    select.forEach(s => {
      data.forEach(e => {
        if (e.timestamp === time) {
          row = [...row, e[s]];
        }
      });
    });
    return row;
  });

  return chart_data;
};

const get_uniq_groups = events => {
  const { group } = events.start;
  const { data } = events;

  if (!group) return;

  const group_values = data.map(e => {
    let groups = '';
    group.forEach(g => {
      groups = `${groups} ${e[g]}`;
    });
    return _.trim(groups);
  });

  return _.uniq(group_values);
};

// create chart rows based on data events timestamps
const get_rows = events => {
  const { data } = events;
  let rows = [];

  data.forEach(e => (rows = [...rows, e.timestamp]));

  return _.uniq(rows);
};

const millis_to_seconds = n => {
  return n / 1000 / 60;
};
