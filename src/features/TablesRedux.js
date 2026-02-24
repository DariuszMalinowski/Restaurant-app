const initialState = {
  tables: [],
  loading: false,
};

// REDUCER

export default function tablesReducer(state = initialState, action) {
  switch (action.type) {

    case 'tables/setTables':
      return { ...state, tables: action.payload };

    case 'tables/setLoading':
      return { ...state, loading: action.payload };

    case 'tables/updateTable':
      return {
        ...state,
        tables: state.tables.map(table =>
          table.id === action.payload.id
            ? action.payload
            : table
        ),
      };

    default:
      return state;
  }
}

//
// SELECTORS
//

export const getAllTables = state => state.tables.tables;

export const getTableById = (state, id) =>
  state.tables.tables.find(table => table.id === id);

export const getLoading = state => state.tables.loading;

//
// THUNKS
//

// FETCH TABLES
export const fetchTables = () => dispatch => {
  dispatch({ type: 'tables/setLoading', payload: true });

  fetch('http://localhost:3131/api/tables')
    .then(res => res.json())
    .then(data => {
      dispatch({ type: 'tables/setTables', payload: data });
      dispatch({ type: 'tables/setLoading', payload: false });
    });
};

// UPDATE TABLE
export const updateTableRequest = updatedTable => dispatch => {

  fetch(`http://localhost:3131/api/tables/${updatedTable.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTable),
  })
    .then(res => res.json())
    .then(data => {
      dispatch({ type: 'tables/updateTable', payload: data });
    });
};