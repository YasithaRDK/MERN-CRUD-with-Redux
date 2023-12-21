import { Button, Card, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudentId } from "../slice/studentAction";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { students, isLoading } = useSelector((state) => state.students);

  const onDelete = async (id) => {
    await dispatch(deleteStudentId(id));
    toast.success("Record Deleted");
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <Container>
      <Card className="mt-5 p-2 p-md-3">
        <h1>Student Details</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.contact}</td>
                  <td>{student.email}</td>
                  <td>
                    <Link to={`edit/${student._id}`}>
                      <Button variant="warning" className="me-2">
                        Edit
                      </Button>
                    </Link>
                    <Link to={`/view/${student._id}`}>
                      <Button variant="info" className="me-2 mt-2 mt-md-0">
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="mt-2 mt-md-0"
                      onClick={() => onDelete(student._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default Home;
