import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { getTableById, updateTableRequest } from '../features/TablesRedux';

const Table = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const table = useSelector(state => getTableById(state, id));

  // 🔁 jeśli nie ma takiego stolika → redirect
  useEffect(() => {
    if (!table) navigate('/');
  }, [table, navigate]);

  const [status, setStatus] = useState(table?.status || 'Free');
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount || 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table?.maxPeopleAmount || 0);
  const [bill, setBill] = useState(table?.bill || 0);

  if (!table) return null;

  // 🔒 WALIDACJE

  const handleStatusChange = value => {
    setStatus(value);

    if (value === 'Free' || value === 'Cleaning') {
      setPeopleAmount(0);
      setBill(0);
    }

    if (value !== 'Busy') {
      setBill(0);
    }
  };

  const handlePeopleChange = value => {
    let newValue = Math.max(0, Math.min(10, Number(value)));

    if (newValue > maxPeopleAmount) {
      newValue = maxPeopleAmount;
    }

    setPeopleAmount(newValue);
  };

  const handleMaxPeopleChange = value => {
    let newValue = Math.max(0, Math.min(10, Number(value)));

    setMaxPeopleAmount(newValue);

    if (peopleAmount > newValue) {
      setPeopleAmount(newValue);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(updateTableRequest({
      id: table.id, // ID niezmienne
      status,
      peopleAmount,
      maxPeopleAmount,
      bill: status === 'Busy' ? bill : 0,
    }));

    navigate('/');
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Table {table.id}</h1>

      <Form onSubmit={handleSubmit}>

        {/* STATUS */}
        <Form.Group className="mb-3">
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Label><strong>Status:</strong></Form.Label>
            </Col>
            <Col xs={4}>
              <Form.Select
                value={status}
                onChange={e => handleStatusChange(e.target.value)}
              >
                <option>Free</option>
                <option>Reserved</option>
                <option>Busy</option>
                <option>Cleaning</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

        {/* PEOPLE */}
        <Form.Group className="mb-3">
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Label><strong>People:</strong></Form.Label>
            </Col>

            <Col xs="auto">
              <Form.Control
                type="number"
                value={peopleAmount}
                onChange={e => handlePeopleChange(e.target.value)}
                min="0"
                max="10"
                style={{ width: '70px' }}
              />
            </Col>

            <Col xs="auto">/</Col>

            <Col xs="auto">
              <Form.Control
                type="number"
                value={maxPeopleAmount}
                onChange={e => handleMaxPeopleChange(e.target.value)}
                min="0"
                max="10"
                style={{ width: '70px' }}
              />
            </Col>
          </Row>
        </Form.Group>

        {/* BILL – tylko Busy */}
        {status === 'Busy' && (
          <Form.Group className="mb-3">
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Label><strong>Bill:</strong></Form.Label>
              </Col>

              <Col xs="auto">$</Col>

              <Col xs="auto">
                <Form.Control
                  type="number"
                  value={bill}
                  min="0"
                  onChange={e => setBill(Number(e.target.value))}
                  style={{ width: '100px' }}
                />
              </Col>
            </Row>
          </Form.Group>
        )}

        <Button type="submit" variant="primary">
          Update
        </Button>

      </Form>
    </Container>
  );
};

export default Table;