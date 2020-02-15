import React from "react"
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Container from '../components/container'
export default () => (
  <Layout>
    <Link to="/contact">Contact</Link>
    <Link to="/about">About</Link>
    <Container>
      <h1>Hello Gatsby!</h1>
      <p>こんにちは!</p>
    </Container>
  </Layout>
)
