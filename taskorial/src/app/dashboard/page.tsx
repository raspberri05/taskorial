import { Container, Row, Col } from "react-bootstrap"
import { currentUser}  from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'
import TaskCard from "@/app/components/task/taskcard";

export default async function Dashboard() {

  const user = await currentUser();
  if (!user) {
    redirect("/")
  }

  function createTask() {

  }

  return (
    <Container>
      <h2>Welcome back, {user?.firstName}!</h2>
      &nbsp;
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TaskCard userId={user?.id}/>
        </Col>
      </Row>
    </Container>
  )
}