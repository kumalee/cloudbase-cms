import {
  Form,
  Select,
} from 'antd'

import MainLayout from '@/layouts/main'
import { getCurrentUser, hasLoginState } from '@/services/user'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const FormItem = Form.Item
const Option = Select.Option

export default function Home() {
  const [nickName, setNickName] = useState();
  const router = useRouter();
  useEffect(() => {
    if (hasLoginState()) {
      const user = getCurrentUser();
      setNickName(user.customUserId);
    } else {
      router.push('/login');
    }
  },[hasLoginState]);
  return (
    <MainLayout>
      <h2>{nickName ? `Hello ${nickName}` : 'Please SignIn'}</h2>
    </MainLayout>
  )
}


