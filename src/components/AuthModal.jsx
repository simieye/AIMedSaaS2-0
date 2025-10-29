// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, User, Lock, Mail, Smartphone, ScanLine, CheckCircle, Loader2 } from 'lucide-react';

export function AuthModal({
  onClose,
  onLoginSuccess
}) {
  const [activeTab, setActiveTab] = useState('phone');
  const [phoneForm, setPhoneForm] = useState({
    phone: '',
    code: ''
  });
  const [emailForm, setEmailForm] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const {
    toast
  } = useToast();
  const handlePhoneLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await $w.cloud.callFunction({
        name: 'auth-api',
        data: {
          action: 'phone_login',
          phone: phoneForm.phone,
          code: phoneForm.code
        }
      });
      if (response.success) {
        localStorage.setItem('medai_token', response.token);
        onLoginSuccess(response.user, response.token);
        toast({
          title: "登录成功",
          description: "欢迎回来！",
          variant: "default"
        });
      } else {
        setError(response.message || '登录失败');
      }
    } catch (error) {
      setError(error.message || '网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };
  const handleEmailLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await $w.cloud.callFunction({
        name: 'auth-api',
        data: {
          action: 'email_login',
          email: emailForm.email,
          password: emailForm.password
        }
      });
      if (response.success) {
        localStorage.setItem('medai_token', response.token);
        onLoginSuccess(response.user, response.token);
        toast({
          title: "登录成功",
          description: "欢迎回来！",
          variant: "default"
        });
      } else {
        setError(response.message || '邮箱或密码错误');
      }
    } catch (error) {
      setError(error.message || '网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };
  const handleWeChatLogin = async () => {
    try {
      setLoading(true);
      const response = await $w.cloud.callFunction({
        name: 'auth-api',
        data: {
          action: 'wechat_login'
        }
      });
      if (response.success) {
        localStorage.setItem('medai_token', response.token);
        onLoginSuccess(response.user, response.token);
        toast({
          title: "微信登录成功",
          description: "欢迎回来！",
          variant: "default"
        });
      } else {
        setError(response.message || '微信登录失败');
      }
    } catch (error) {
      setError(error.message || '网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };
  const sendVerificationCode = async () => {
    if (!phoneForm.phone) {
      setError('请输入手机号');
      return;
    }
    try {
      const response = await $w.cloud.callFunction({
        name: 'auth-api',
        data: {
          action: 'send_sms_code',
          phone: phoneForm.phone
        }
      });
      if (response.success) {
        setIsCodeSent(true);
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        toast({
          title: "验证码已发送",
          description: "请查收短信",
          variant: "default"
        });
      } else {
        setError(response.message || '发送失败');
      }
    } catch (error) {
      setError(error.message || '网络错误，请稍后重试');
    }
  };
  const handleRegister = async formData => {
    setLoading(true);
    setError('');
    try {
      const response = await $w.cloud.callFunction({
        name: 'auth-api',
        data: {
          action: 'register',
          ...formData
        }
      });
      if (response.success) {
        localStorage.setItem('medai_token', response.token);
        onLoginSuccess(response.user, response.token);
        toast({
          title: "注册成功",
          description: "欢迎加入医智云！",
          variant: "default"
        });
      } else {
        setError(response.message || '注册失败');
      }
    } catch (error) {
      setError(error.message || '网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };
  return <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>医智云登录</DialogTitle>
          <DialogDescription>
            选择您喜欢的登录方式
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="phone" className="flex items-center">
              <Smartphone className="h-4 w-4 mr-1" />
              手机号
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              邮箱
            </TabsTrigger>
            <TabsTrigger value="wechat" className="flex items-center">
              <ScanLine className="h-4 w-4 mr-1" />
              微信
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phone" className="space-y-4">
            <form onSubmit={handlePhoneLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">手机号</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" type="tel" placeholder="请输入手机号" value={phoneForm.phone} onChange={e => setPhoneForm({
                  ...phoneForm,
                  phone: e.target.value
                })} className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">验证码</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="code" type="text" placeholder="请输入验证码" value={phoneForm.code} onChange={e => setPhoneForm({
                    ...phoneForm,
                    code: e.target.value
                  })} className="pl-10" required />
                  </div>
                  <Button type="button" variant="outline" onClick={sendVerificationCode} disabled={countdown > 0 || loading}>
                    {countdown > 0 ? `${countdown}s` : '发送'}
                  </Button>
                </div>
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : '登录'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="请输入邮箱" value={emailForm.email} onChange={e => setEmailForm({
                  ...emailForm,
                  email: e.target.value
                })} className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="请输入密码" value={emailForm.password} onChange={e => setEmailForm({
                  ...emailForm,
                  password: e.target.value
                })} className="pl-10 pr-10" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </button>
                </div>
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : '登录'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="wechat" className="space-y-4">
            <div className="text-center space-y-4">
              <div className="mx-auto w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <ScanLine className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-sm text-muted-foreground">请使用微信扫描二维码登录</p>
              <Button onClick={handleWeChatLogin} className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : '微信登录'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground mt-4">
          登录即表示您同意我们的服务条款和隐私政策
        </div>
      </DialogContent>
    </Dialog>;
}