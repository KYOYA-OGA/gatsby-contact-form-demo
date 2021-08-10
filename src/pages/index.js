import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const section = {
  display: 'grid',
  placeItems: 'center',
  minHeight: '100vh',
}

const formStyles = {
  maxWidth: 1200,
  margin: '0 auto',
}

const IndexPage = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('.netlify/functions/sendEmail', {
        email,
        message,
      })

      if (data === 'success') {
        setEmail('')
        setMessage('')
        setIsSent(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section style={section}>
      <div style={formStyles}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>お問い合わせ内容</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              name="message"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            送信する
          </Button>
          {isSent && (
            <p className="text-primary text-center mt-3">送信されました</p>
          )}
        </Form>
      </div>
    </section>
  )
}

export default IndexPage
