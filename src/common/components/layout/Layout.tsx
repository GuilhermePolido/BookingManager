import { ReactNode } from "react";
import { Container, Navbar } from "react-bootstrap";
import LogoImage from "@assets/images/logo.svg";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Container fluid className="px-0">
      <Navbar bg="primary">
        <Container>
          <Link className="link-logo" to="/">
            <div className="d-flex align-items-center">
              <img
                alt="Booking Manager Logo"
                src={LogoImage}
                className="img-logo"
              />
              <div className="text-logo">Booking Manager</div>
            </div>
          </Link>
        </Container>
      </Navbar>
      <Container fluid="xl">{children}</Container>
    </Container>
  );
}
