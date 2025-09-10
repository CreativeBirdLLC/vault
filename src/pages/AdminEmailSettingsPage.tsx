import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Mail, Settings, Send, TestTube, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface EmailSettings {
  id?: string;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPassword: string;
  fromName: string;
  fromEmail: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const AdminEmailSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState<EmailSettings>({
    smtpHost: '',
    smtpPort: 587,
    smtpSecure: false,
    smtpUser: '',
    smtpPassword: '',
    fromName: 'MyApp',
    fromEmail: ''
  });
  
  const [testEmail, setTestEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [testResult, setTestResult] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
      return;
    }
    loadEmailSettings();
  }, [user, navigate]);

  const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
    let token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    
    const makeRequest = async (authToken: string) => {
      return await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${authToken}`
        }
      });
    };

    let response = await makeRequest(token || '');

    // If token is expired, try to refresh
    if (response.status === 401) {
      try {
        const refreshResponse = await fetch('http://localhost:5000/api/auth/refresh', {
          method: 'POST',
          credentials: 'include'
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          if (refreshData.success && refreshData.data?.accessToken) {
            storage.set(STORAGE_KEYS.ACCESS_TOKEN, refreshData.data.accessToken);
            token = refreshData.data.accessToken;
            response = await makeRequest(token || '');
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        navigate('/admin/login');
        return response;
      }
    }

    return response;
  };

  const loadEmailSettings = async () => {
    try {
      const response = await makeAuthenticatedRequest('http://localhost:5000/api/email/settings');

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.settings) {
          const loadedSettings = data.data.settings;
          setSettings({
            ...loadedSettings,
            smtpPassword: '' // Don't populate password field for security
          });
        }
      } else if (response.status === 401) {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error loading email settings:', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await makeAuthenticatedRequest('http://localhost:5000/api/email/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: 'success', text: 'Email settings saved successfully!' });
        await loadEmailSettings(); // Reload settings
      } else if (response.status === 401) {
        navigate('/admin/login');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save email settings' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult({ type: '', text: '' });

    try {
      const response = await makeAuthenticatedRequest('http://localhost:5000/api/email/test-connection', {
        method: 'POST'
      });

      const data = await response.json();
      
      if (response.status === 401) {
        navigate('/admin/login');
        return;
      }
      
      setTestResult({
        type: data.success ? 'success' : 'error',
        text: data.message
      });
    } catch (error) {
      setTestResult({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail) return;

    setIsSendingTest(true);
    setTestResult({ type: '', text: '' });

    try {
      const response = await makeAuthenticatedRequest('http://localhost:5000/api/email/send-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: testEmail })
      });

      const data = await response.json();
      
      if (response.status === 401) {
        navigate('/admin/login');
        return;
      }
      
      setTestResult({
        type: data.success ? 'success' : 'error',
        text: data.message
      });
    } catch (error) {
      setTestResult({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSendingTest(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                ← Back to Dashboard
              </button>
              <div className="flex items-center space-x-2">
                <Mail className="h-6 w-6 text-red-600" />
                <h1 className="text-xl font-semibold text-gray-900">Email Settings</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <AlertCircle className="h-4 w-4 mr-2" />
              )}
              {message.text}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SMTP Settings Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="h-5 w-5 text-red-600" />
              <h2 className="text-lg font-semibold text-gray-900">SMTP Configuration</h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="smtpHost" className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Host
                  </label>
                  <Input
                    id="smtpHost"
                    type="text"
                    value={settings.smtpHost}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setSettings(prev => ({ ...prev, smtpHost: e.target.value }))
                    }
                    placeholder="smtp.gmail.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Port
                  </label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) || 587 }))
                    }
                    min="1"
                    max="65535"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.smtpSecure}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, smtpSecure: e.target.checked }))
                    }
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Use SSL/TLS</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Enable for port 465, disable for port 587 (STARTTLS)
                </p>
              </div>

              <div>
                <label htmlFor="smtpUser" className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Username
                </label>
                <Input
                  id="smtpUser"
                  type="text"
                  value={settings.smtpUser}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setSettings(prev => ({ ...prev, smtpUser: e.target.value }))
                  }
                  placeholder="your-email@gmail.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Password
                </label>
                <div className="relative">
                  <Input
                    id="smtpPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={settings.smtpPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setSettings(prev => ({ ...prev, smtpPassword: e.target.value }))
                    }
                    placeholder="App password or SMTP password"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fromName" className="block text-sm font-medium text-gray-700 mb-1">
                    From Name
                  </label>
                  <Input
                    id="fromName"
                    type="text"
                    value={settings.fromName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setSettings(prev => ({ ...prev, fromName: e.target.value }))
                    }
                    placeholder="MyApp"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fromEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    From Email
                  </label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={settings.fromEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setSettings(prev => ({ ...prev, fromEmail: e.target.value }))
                    }
                    placeholder="noreply@yourapp.com"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {isLoading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </form>
          </div>

          {/* Testing Panel */}
          <div className="space-y-6">
            {/* Connection Test */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TestTube className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Test Connection</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Test your SMTP configuration to ensure emails can be sent.
              </p>

              <Button
                onClick={handleTestConnection}
                disabled={isTesting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isTesting ? 'Testing...' : 'Test Connection'}
              </Button>
            </div>

            {/* Send Test Email */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Send className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Send Test Email</h3>
              </div>

              <form onSubmit={handleSendTestEmail} className="space-y-4">
                <div>
                  <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Test Email Address
                  </label>
                  <Input
                    id="testEmail"
                    type="email"
                    value={testEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSendingTest || !testEmail}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isSendingTest ? 'Sending...' : 'Send Test Email'}
                </Button>
              </form>
            </div>

            {/* Test Results */}
            {testResult.text && (
              <div className={`p-4 rounded-md ${
                testResult.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                <div className="flex items-center">
                  {testResult.type === 'success' ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <AlertCircle className="h-4 w-4 mr-2" />
                  )}
                  {testResult.text}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmailSettingsPage;
