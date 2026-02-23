const initialState = {
  tables: [],
  loading: false,
};

export default function tablesReducer(state = initialState, action) {
  switch (action.type) {
    case 'tables/setTables':
      return { ...state, tables: action.payload };

    case 'tables/setLoading':
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export const getAllTables = state => state.tables.tables;
export const getTableById = (state, id) =>
  state.tables.tables.find(table => table.id === id);

export const getLoading = state => state.tables.loading;

export const fetchTables = () => dispatch => {
  dispatch({ type: 'tables/setLoading', payload: true });

  fetch('http://localhost:3131/api/tables')
    .then(res => res.json())
    .then(data => {
      dispatch({ type: 'tables/setTables', payload: data });
      dispatch({ type: 'tables/setLoading', payload: false });
    });
};