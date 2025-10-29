// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Label, Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

// @ts-ignore;
import { useTranslation } from '@/components/PartnerTranslationProvider';
export function PartnerLogin({
  onLoginSuccess
}) {
  const {
    t
  } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // 模拟登录验证
      if (email === 'partner@example.com' && password === 'password123') {
        const mockPartner = {
          id: 'partner-001',
          email: email,
          name: '示例合作伙伴',
          company: '示例公司',
          role: 'partner'
        };
        localStorage.setItem('partnerToken', 'mock-token-123');
        localStorage.setItem('partnerData', JSON.stringify(mockPartner));
        onLoginSuccess(mockPartner);
      } else {
        setError(t('invalidCredentials'));
      }
    } catch (err) {
      setError(t('loginFailed'));
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t('partnerPortal')}</CardTitle>
          <CardDescription className="text-center">
            {t('signInToYourAccount')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>}

            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="email" type="email" placeholder="partner@example.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded border-gray-300" />
                <Label htmlFor="remember" className="text-sm">{t('rememberMe')}</Label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                {t('forgotPassword')}
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('loading') : t('signIn')}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">或</span>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">{t('dontHaveAccount')}</span>
              <a href="#" className="ml-1 text-blue-600 hover:underline">
                {t('signUpHere')}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}