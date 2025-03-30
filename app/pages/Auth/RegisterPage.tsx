// app/pages/Auth/RegisterPage.tsx

import {Button, Card, Form, Input} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {useUsers} from '@/app/hooks/useUsers';
// import './styles.modules.scss'

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser } = useUsers();

  const onFinish = async (values: RegisterForm) => {
    try {
      await registerUser.mutateAsync({
        username: values.username,
        password: values.password,
      });
      navigate("/")
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <Card title="Register">
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { type: 'username', message: 'Please enter a valid username!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <p>Already have an account? <Link to={"/login"}>Log in</Link></p>
      </Card>
    </div>
  );
}; 