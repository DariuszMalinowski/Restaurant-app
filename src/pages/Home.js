import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllTables } from '../features/TablesRedux';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  const tables = useSelector(getAllTables);

  return (
    <Container>
      <h1 className="my-4">All tables</h1>

      {tables.map(table => (
        <Row key={table.id} className="align-items-center mb-3">
          <Col>
            <h5>Table {table.id}</h5>
            <p className="mb-0">Status: {table.status}</p>
          </Col>

          <Col xs="auto">
            <Link to={`/table/${table.id}`}>
              <Button variant="primary">Show more</Button>
            </Link>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Home;