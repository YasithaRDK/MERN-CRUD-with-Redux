import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const View = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const { name, email, contact } = formData;
  const { id } = useParams();
  const { students } = useSelector((state) => state.students);
  const student = students.find((student) => student._id === id);

  useEffect(() => {
    const savedFormData =
      JSON.parse(localStorage.getItem("studentFormData")) || {};
    setFormData(savedFormData);
  }, []);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        contact: student.contact || "",
        email: student.email || "",
      });
      localStorage.setItem(
        "studentFormData",
        JSON.stringify({
          name: student.name || "",
          contact: student.contact || "",
          email: student.email || "",
        })
      );
    }
  }, [student]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("studentFormData");
    };
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="card p-5">
          <div className="d-flex justify-content-between">
            <h1>Student Details</h1>
            <Link to="/">
              <Button variant="success" className="mt-3">
                Go Back
              </Button>
            </Link>
          </div>
          <Form>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={name} readOnly />
            </Form.Group>

            <Form.Group className="my-2" controlId="contact">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={contact}
                readOnly
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={email} readOnly />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default View;
