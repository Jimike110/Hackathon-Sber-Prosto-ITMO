import {Button, Card, Form, Input} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {useUsers} from '@/app/hooks/useUsers';
// import './styles.module.scss'

interface LoginForm {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useUsers();

  const onFinish = async (values: LoginForm) => {
    try {
      await loginUser.mutateAsync(values);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Login">
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{required: true, message: 'Please input your email!'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
      </Card>
    </div>
  );
}; 