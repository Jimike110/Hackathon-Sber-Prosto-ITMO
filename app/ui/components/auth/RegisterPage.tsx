import {Button, Card, Form, Input} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {useUsers} from '@/app/hooks/useUsers';
import styles from './styles.module.scss'

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser } = useUsers();

  const onFinish = async (values: RegisterForm) => {
    try {
      await registerUser.mutateAsync({
        email: values.email,
        password: values.password,
      });
      navigate("/")
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Register">
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
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