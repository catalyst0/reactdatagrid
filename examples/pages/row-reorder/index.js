/**
 * Copyright (c) INOVUA SOFTWARE TECHNOLOGIES.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { DataGridFactory } from '../../DataGrid';
import '../../../community-edition/style/base.scss';
import '../../../community-edition/style/theme/default-light/index.scss';
const DataGrid = DataGridFactory({
  plugins: [],
});
const gridStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};
const cols = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
const getColumns = defaultConfig => {
  const columns = cols.split(',').map(letter => {
    return {
      ...defaultConfig,
      header: letter.toUpperCase(),
      name: letter,
    };
  });
  return columns;
};
const dataSource = [...new Array(100)].map((_, index) => {
  const result = {
    id: index,
    type: 'string',
  };
  cols.split(',').map(letter => {
    result[letter] = letter.toUpperCase() + ' - ' + (index + 1);
  });
  return result;
});
const sportDataSource = () =>
  Promise.resolve([
    {
      country: 'USA',
      continent: 'North America',
      year: 2000,
      sport: 'footbal',
      gold: 2,
      silver: 3,
      bronze: 1,
      team: 'red',
    },
    {
      country: 'USA',
      continent: 'North America',
      year: 2000,
      sport: 'footbal',
      gold: 1,
      silver: 4,
      bronze: 2,
      team: 'blue',
    },
    {
      country: 'USA',
      continent: 'North America',
      year: 2000,
      sport: 'swim',
      gold: 6,
      silver: 4,
      bronze: 2,
      team: 'swim-blue',
    },
    {
      country: 'USA',
      continent: 'North America',
      year: 2002,
      sport: 'footbal',
      gold: 1,
      silver: 4,
      bronze: 2,
      team: 'star',
    },
    {
      country: 'USA',
      continent: 'North America',
      year: 2002,
      sport: 'swim',
      gold: 10,
      silver: 4,
      bronze: 2,
      team: 'swimmers',
    },
    {
      country: 'USA',
      continent: 'North America',
      year: 2003,
      sport: 'swim',
      gold: 10,
      silver: 4,
      bronze: 2,
      team: 'swimmers',
    },
    {
      country: 'France',
      continent: 'Europe',
      year: 2003,
      sport: 'footbal',
      gold: 1,
      silver: 4,
      bronze: 2,
      team: 'paris-team',
    },
    {
      country: 'France',
      continent: 'Europe',
      year: 2004,
      sport: 'swim',
      gold: 3,
      silver: 1,
      bronze: 1,
      team: 'paris-team',
    },
    {
      country: 'France',
      continent: 'Europe',
      year: 2005,
      sport: 'swim',
      gold: 3,
      silver: 1,
      bronze: 1,
      team: 'toulouse-team',
    },
  ]);
const sumReducer = {
  initialValue: 0,
  reducer: (a, b) => a + b,
};
const countReducer = {
  initialValue: 0,
  reducer: v => v + 1,
};
const columns = [
  {
    name: 'country',
    defaultWidth: 110,
    header: 'Country',
  },
  {
    name: 'continent',
    defaultWidth: 110,
    header: 'Continent',
  },
  {
    name: 'year',
    type: 'number',
    header: 'Year',
  },
  {
    name: 'gold',
    groupSummaryReducer: sumReducer,
    render: ({ value }) => (value || 0) + ' gold',
    renderSummary: ({ value, data }) => (value || 0) + ' gold medals',
    header: 'Gold medals',
  },
  {
    name: 'silver',
    groupSummaryReducer: sumReducer,
    header: 'Silver medals',
  },
  {
    name: 'bronze',
    groupSummaryReducer: sumReducer,
    header: 'Bronze medals',
  },
  {
    name: 'sport',
    header: 'Sport',
  },
];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.onRowReorderHandle = ({ data, dragRowIndex, insertRowIndex }) => {
      console.log('[onRowReorder]', data, dragRowIndex, insertRowIndex);
      let newData = [...this.state.dataSource];
      newData.splice(dragRowIndex, 1);
      newData.splice(insertRowIndex, 0, data);
      this.setState({ dataSource: newData });
    };
    this.isRowReorderValidHandle = ({
      dragRowIndex,
      dropRowIndex,
      dragRowData,
      dropRowData,
    }) => {
      if (dropRowIndex === 4 || dropRowIndex === 5) {
        return false;
      }
      return true;
    };
    this.renderRowProxyHandle = ({ data, dataSource, dragRowIndex }) => {
      return React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          },
        },
        data['c']
      );
    };
    this.onGroupByChange = groupBy => {
      this.setState({ groupBy });
    };
    this.render = () => {
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          'div',
          {
            style: {
              padding: 20,
              height: 'calc(100vh - 40px)',
              background: '#fff',
            },
          },
          React.createElement(
            'h2',
            { style: { color: '#525252' } },
            'DataGrid --- Row reorder example'
          ),
          React.createElement(
            'div',
            {
              style: {
                flex: 1,
                position: 'relative',
                height: 'calc(100% - 68px)',
              },
            },
            React.createElement(DataGrid, {
              key: `${this.state.rowHeight}-${this.state.defaultColumnWidth}`,
              idProperty: 'id',
              theme: 'default-light',
              rowIndexColumn: true,
              checkboxColumn: true,
              onRowReorder: true,
              showZebraRows: false,
              style: gridStyle,
              columns: this.state.columns,
              dataSource: this.state.dataSource,
              isRowReorderValid: this.isRowReorderValidHandle,
              rowHeight: this.state.rowHeight,

              renderRowReorderProxy: this.renderRowProxyHandle,
            })
          )
        ),
        React.createElement(
          'style',
          { global: true, jsx: true },
          `
          body {
            margin: 0;
            padding: 0;
          }
          #__next {
            min-height: 100vh;
            min-width: 100vw;
            top: 0px;
            position: absolute;
            left: 0px;
            display: flex;
            flex-flow: column;
          }
        `
        )
      );
    };
    this.state = {
      dataSource,
      columns: getColumns({
        defaultWidth: 110,
      }),
      defaultColumnWidth: 110,
      rowHeight: 60,
      filterValue: [
        {
          name: 'a',
          operator: 'startsWith',
          type: 'string',
          value: '',
        },
      ],
      pivot: ['sport'],
      groupBy: [],
    };
  }
}
export default App;
