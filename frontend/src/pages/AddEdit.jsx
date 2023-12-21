import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { createStudent, updateStudentById } from "../slice/studentAction";
import { toast } from "react-toastify";

const AddEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const { name, email, contact } = formData;
  const { id } = useParams();
  const { students } = useSelector((state) => state.students);
  const student = students.find((student) => student._id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addStudent = async (data) => {
    try {
      await dispatch(createStudent(data));
      toast.success("Record added successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateStudent = async (id, data) => {
    try {
      await dispatch(updateStudentById(id, data));
      toast.success("Record updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const savedFormData =
      JSON.parse(localStorage.getItem("studentFormData")) || {};
    setFormData(savedFormData);

    return () => {
      localStorage.removeItem("studentFormData");
    };
  }, []);

  useEffect(
    (id) => {
      if (!id) {
        localStorage.removeItem("studentFormData");
        setFormData({
          name: "",
          contact: "",
          email: "",
        });
      }
    },
    [id]
  );

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

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, contact };
    if (student) {
      updateStudent(student._id, data);
    } else {
      addStudent(data);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="card p-5">
          <div className="d-flex justify-content-between">
            <h1>{id ? "Update" : "Add"} Student</h1>
            <Link to="/">
              <Button variant="success" className="mt-3">
                Go Back
              </Button>
            </Link>
          </div>

          <Form onSubmit={onSubmit}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name || ""}
                onChange={onChange}
                placeholder="Enter Name"
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="contact">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={contact || ""}
                onChange={onChange}
                placeholder="Enter Contact Number"
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email || ""}
                onChange={onChange}
                placeholder="Enter Email"
              />
            </Form.Group>

            <Button
              type="submit"
              variant={id ? "success" : "primary"}
              className="mt-3"
            >
              {id ? "Update" : "Add"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEdit;
